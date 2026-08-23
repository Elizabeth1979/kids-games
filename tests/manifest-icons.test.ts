import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface ManifestIcon { src: string; sizes: string; type?: string }

describe('web app manifest icons', () => {
  const manifest = JSON.parse(
    readFileSync(resolve(process.cwd(), 'public/manifest.json'), 'utf8')
  ) as { icons: ManifestIcon[] };

  it.each(manifest.icons)('$src exists as a valid PNG with the declared dimensions', (icon) => {
    const png = readFileSync(resolve(process.cwd(), 'public', icon.src.replace(/^\//, '')));
    const [width, height] = icon.sizes.split('x').map(Number);

    expect(icon.type).toBe('image/png');
    expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(png.readUInt32BE(16)).toBe(width);
    expect(png.readUInt32BE(20)).toBe(height);
  });
});