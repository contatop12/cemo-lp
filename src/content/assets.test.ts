// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import type { ImageAsset } from './types';
import { assets } from './assets';
import { content } from './index';

const publicPath = (src: string) => join(process.cwd(), 'public', src);
const ORIGINAL_DAVID = join(process.cwd(), '_materiais/fotos/dr-david.jpeg');

const all: Array<[string, ImageAsset]> = [
  ['drDavid', assets.drDavid],
  ['drDavidMobile', assets.drDavidMobile],
  ['ogHome', assets.ogHome],
  ['logoPng', assets.logoPng],
  ...assets.equipment.map((a, i): [string, ImageAsset] => [`equipment[${i}]`, a]),
];

describe('assets', () => {
  it.each(all)('%s existe em public/ com as dimensões declaradas', async (_name, asset) => {
    const file = publicPath(asset.src);
    expect(existsSync(file)).toBe(true);
    const meta = await sharp(file).metadata();
    expect([meta.width, meta.height]).toEqual([asset.width, asset.height]);
  });

  it('foto do Dr. David mantém o arquivo original (853×1280)', () => {
    expect([assets.drDavid.width, assets.drDavid.height]).toEqual([853, 1280]);
  });

  it.skipIf(!existsSync(ORIGINAL_DAVID))('foto do Dr. David é cópia byte a byte do original', () => {
    expect(readFileSync(publicPath(assets.drDavid.src)).equals(readFileSync(ORIGINAL_DAVID))).toBe(true);
  });

  it('recorte mobile do Dr. David tem proporção 4:5', () => {
    const { width, height } = assets.drDavidMobile;
    expect(Math.abs(width * 5 - height * 4)).toBeLessThanOrEqual(5);
  });

  it('há fotos de equipamento, todas com alt', () => {
    expect(assets.equipment.length).toBeGreaterThanOrEqual(1);
    for (const a of assets.equipment) expect(a.alt.trim().length).toBeGreaterThan(10);
  });

  it.each(assets.equipment.map((a) => [a.src]))('%s não carrega EXIF/GPS', async (src) => {
    const meta = await sharp(publicPath(src)).metadata();
    expect(meta.exif).toBeUndefined();
  });

  it('repositório expõe os equipamentos e a foto do Dr. David', async () => {
    const equipment = await content.listEquipment();
    expect(equipment.map((e) => e.photo.src)).toEqual(assets.equipment.map((a) => a.src));
    const david = await content.getDoctorBySlug('david-ribeiro-de-mendonca-filho');
    expect(david?.photo?.src).toBe(assets.drDavid.src);
    expect(david?.photoMobile?.src).toBe(assets.drDavidMobile.src);
  });
});
