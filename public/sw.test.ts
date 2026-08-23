import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

type WorkerListener = (event: Record<string, unknown>) => void;

function loadWorker(options?: {
  cacheNames?: string[];
  response?: { ok: boolean };
  matchError?: Error;
}) {
  const listeners = new Map<string, WorkerListener>();
  const deleteCache = vi.fn(() => Promise.resolve(true));
  const put = vi.fn(() => Promise.resolve());
  const response = {
    ok: options?.response?.ok ?? true,
    clone: vi.fn(() => ({ ok: options?.response?.ok ?? true })),
  };
  const context = {
    URL,
    Promise,
    fetch: vi.fn(() => Promise.resolve(response)),
    caches: {
      keys: vi.fn(() => Promise.resolve(options?.cacheNames ?? [])),
      delete: deleteCache,
      open: vi.fn(() => Promise.resolve({ addAll: vi.fn(), put })),
      match: vi.fn(() => options?.matchError
        ? Promise.reject(options.matchError)
        : Promise.resolve(undefined)),
    },
    self: {
      location: { origin: 'https://kids.example' },
      clients: { claim: vi.fn(() => Promise.resolve()) },
      skipWaiting: vi.fn(() => Promise.resolve()),
      addEventListener: (type: string, listener: WorkerListener) => listeners.set(type, listener),
    },
  };

  vm.runInNewContext(readFileSync(resolve(process.cwd(), 'public/sw.js'), 'utf8'), context);
  return { listeners, deleteCache, put, response };
}

describe('service worker cache ownership', () => {
  it('migrates from v1 by deleting stale app caches and preserving unrelated caches', async () => {
    const worker = loadWorker({
      cacheNames: ['kids-games-v0', 'kids-games-v1', 'kids-games-v2', 'another-app-cache'],
    });
    let activation: Promise<unknown> | undefined;

    worker.listeners.get('activate')!({
      waitUntil: (promise: Promise<unknown>) => { activation = promise; },
    });
    await activation;

    expect(worker.deleteCache).toHaveBeenCalledTimes(2);
    expect(worker.deleteCache).toHaveBeenCalledWith('kids-games-v0');
    expect(worker.deleteCache).toHaveBeenCalledWith('kids-games-v1');
    expect(worker.deleteCache).not.toHaveBeenCalledWith('kids-games-v2');
    expect(worker.deleteCache).not.toHaveBeenCalledWith('another-app-cache');
  });

  it('does not cache unsuccessful navigation responses', async () => {
    const worker = loadWorker({ response: { ok: false } });
    let responsePromise: Promise<unknown> | undefined;

    worker.listeners.get('fetch')!({
      request: { method: 'GET', mode: 'navigate', url: 'https://kids.example/he/missing' },
      respondWith: (promise: Promise<unknown>) => { responsePromise = promise; },
      waitUntil: vi.fn(),
    });
    await responsePromise;

    expect(worker.put).not.toHaveBeenCalled();
  });

  it('settles both the response and fetch lifetime when cache lookup rejects', async () => {
    const matchError = new Error('cache lookup failed');
    const worker = loadWorker({ matchError });
    let responsePromise: Promise<unknown> | undefined;
    let lifetimePromise: Promise<unknown> | undefined;

    worker.listeners.get('fetch')!({
      request: { method: 'GET', mode: 'cors', url: 'https://kids.example/icon.svg' },
      respondWith: (promise: Promise<unknown>) => { responsePromise = promise; },
      waitUntil: (promise: Promise<unknown>) => { lifetimePromise = promise; },
    });

    const settled = await Promise.race([
      Promise.allSettled([responsePromise!, lifetimePromise!]),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('fetch promises did not settle')), 50);
      }),
    ]);

    expect(settled).toEqual([
      { status: 'rejected', reason: matchError },
      { status: 'fulfilled', value: undefined },
    ]);
  });

  it('extends fetch lifetime while caching a successful navigation', async () => {
    const worker = loadWorker();
    const waitUntil = vi.fn();
    let responsePromise: Promise<unknown> | undefined;

    worker.listeners.get('fetch')!({
      request: { method: 'GET', mode: 'navigate', url: 'https://kids.example/he' },
      respondWith: (promise: Promise<unknown>) => { responsePromise = promise; },
      waitUntil,
    });
    await responsePromise;
    await waitUntil.mock.calls[0]?.[0];

    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(worker.put).toHaveBeenCalledTimes(1);
  });
});