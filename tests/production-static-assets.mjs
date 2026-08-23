import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : null;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

async function waitForServer(url, processLogs) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status > 0) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production server did not become ready:\n${processLogs.join('')}`);
}

const port = await availablePort();
assert.ok(port, 'Expected an available TCP port');
const origin = `http://127.0.0.1:${port}`;
const logs = [];
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);
server.stdout.on('data', (chunk) => logs.push(chunk.toString()));
server.stderr.on('data', (chunk) => logs.push(chunk.toString()));

try {
  await waitForServer(`${origin}/sw.js`, logs);

  const serviceWorker = await fetch(`${origin}/sw.js`, { redirect: 'manual' });
  assert.equal(serviceWorker.status, 200, '/sw.js must return 200 without a locale redirect');
  assert.match(serviceWorker.headers.get('content-type') ?? '', /javascript/);
  assert.match(await serviceWorker.text(), /addEventListener\(['"]fetch['"]/);

  const offline = await fetch(`${origin}/offline.html`, { redirect: 'manual' });
  assert.equal(offline.status, 200, '/offline.html must return 200 without a locale redirect');
  assert.match(offline.headers.get('content-type') ?? '', /text\/html/);
  assert.match(await offline.text(), /<!doctype html>/i);

  const manifestResponse = await fetch(`${origin}/manifest.json`, { redirect: 'manual' });
  assert.equal(manifestResponse.status, 200, '/manifest.json must return 200');
  const manifest = await manifestResponse.json();
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  for (const icon of manifest.icons) {
    const response = await fetch(new URL(icon.src, origin), { redirect: 'manual' });
    assert.equal(response.status, 200, `${icon.src} must return 200`);
    assert.match(response.headers.get('content-type') ?? '', /image\/png/);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`, icon.sizes);
  }

  console.log(`Production static assets verified at ${origin}: /sw.js, /offline.html, manifest icons`);
} finally {
  server.kill('SIGTERM');
  await new Promise((resolve) => {
    if (server.exitCode !== null) resolve();
    else server.once('exit', resolve);
  });
}
