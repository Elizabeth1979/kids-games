import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('proxy matcher', () => {
  const source = readFileSync(resolve(process.cwd(), 'proxy.ts'), 'utf8');
  const matcherSource = source.match(/matcher:\s*\['([^']+)'\]/)?.[1];
  if (!matcherSource) throw new Error('Could not read proxy matcher');
  const matcher = JSON.parse(`"${matcherSource}"`) as string;
  const matches = (pathname: string) => new RegExp(`^${matcher}$`).test(pathname);

  it.each(['/sw.js', '/offline.html', '/robots.txt', '/assets/app.css'])(
    'does not intercept the public static path %s',
    (pathname) => expect(matches(pathname)).toBe(false)
  );

  it.each(['/', '/he', '/en/game/math', '/ar/game/memory'])(
    'preserves locale routing for %s',
    (pathname) => expect(matches(pathname)).toBe(true)
  );
});