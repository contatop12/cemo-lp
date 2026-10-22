"""Mede o logo PNG original e gera os insumos do SVG reconstruído.

Uso (na raiz do repo): python -P scripts/logo/measure.py
Saídas em scripts/logo/build/ (ignorado pelo git):
  geometry.json  mira, ponto central, arcos curtos e letras CEMO (contornos da fonte real, posicionados sobre o original)
  mask-green.png pálpebras + arcos da íris (sem mira/ponto/arcos curtos), para traço suavizado
  mask-cyan.png  subtítulo, para traço suavizado
Tudo no sistema de coordenadas do SVG final: logo recortado + margem de 8 px (igual ao traço anterior).
"""
import json
import os
from collections import deque

import numpy as np
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, '_materiais', 'marca', 'Logo CEMO - Transparente.png')
FONT = os.environ.get('CEMO_WORDMARK_FONT', r'C:\Windows\Fonts\ARLRDBD.TTF')  # Arial Rounded MT Bold
OUT = os.path.join(ROOT, 'scripts', 'logo', 'build')
PAD = 8
os.makedirs(OUT, exist_ok=True)

im = np.asarray(Image.open(SRC).convert('RGBA')).astype(np.float32)
ys, xs = np.nonzero(im[..., 3] > 8)
im = im[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
im = np.pad(im, ((PAD, PAD), (PAD, PAD), (0, 0)))
H, W = im.shape[:2]
rgb, a = im[..., :3], im[..., 3] / 255.0

BRAND = [('blue', (0x00, 0x66, 0xB1)), ('green', (0x9E, 0xC2, 0x27)), ('cyan', (0x27, 0xA1, 0xCF))]
dists = np.stack([np.sqrt(((rgb - np.array(c, np.float32)) ** 2).sum(-1)) for _, c in BRAND])
nearest = np.argmin(dists, 0)
cover = {name: np.where(nearest == i, a, 0.0) for i, (name, _) in enumerate(BRAND)}
G = cover['green']
green = G > 0.5
yy, xx = np.mgrid[0:H, 0:W]


def longest_run(v):
    best, start = (0, 0, 0), None
    for i, on in enumerate(list(v) + [False]):
        if on and start is None:
            start = i
        if not on and start is not None:
            if i - start > best[0]:
                best = (i - start, start, i - 1)
            start = None
    return best


# Mira: a coluna e a linha com as maiores sequências contínuas de verde.
vcol = max(range(W), key=lambda x: longest_run(green[:, x])[0])
_, vtop, vbot = longest_run(green[:, vcol])
mid = (vtop + vbot) / 2
hrow = max(range(H), key=lambda y: longest_run(green[y, :])[0] if abs(y - mid) < 40 else 0)
_, hleft, hright = longest_run(green[hrow, :])

win = np.arange(-6, 7)
tv = float(np.median([G[y, vcol + win].sum() for y in range(vtop + 5, vtop + 40)]))
th = float(np.median([G[hrow + win, x].sum() for x in range(hleft + 5, hleft + 40)]))
cx = float(np.median([(G[y, vcol + win] * (vcol + win)).sum() / G[y, vcol + win].sum() for y in range(vtop + 5, vtop + 40)]))
cy = float(np.median([(G[hrow + win, x] * (hrow + win)).sum() / G[hrow + win, x].sum() for x in range(hleft + 5, hleft + 40)]))
# Pontas com subpixel pela cobertura do último pixel.
v_top = vtop + (1 - G[vtop, vcol])
v_bottom = vbot + 1 - (1 - G[vbot, vcol])
h_left = hleft + (1 - G[hrow, hleft])
h_right = hright + 1 - (1 - G[hrow, hright])

rr = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
off_lines = (np.abs(xx - cx) > tv + 1) & (np.abs(yy - cy) > th + 1)
# Ponto central: área coberta dentro de r=16 (fora das linhas) → raio equivalente.
r_dot = 0.0
for r in np.arange(4, 30, 0.1):
    ring = (rr >= r) & (rr < r + 0.1) & off_lines
    if ring.sum() and G[ring].mean() < 0.5:
        r_dot = float(r)
        break

# Arcos curtos em volta do ponto.
ann = (rr > r_dot + 2) & (rr < 45) & off_lines
wts = G * ann
solid = wts > 0.5
inner = float(np.percentile(rr[solid], 2))
outer = float(np.percentile(rr[solid], 98))
ang = (np.degrees(np.arctan2(yy - cy, xx - cx)) + 360) % 360
segments = []
for q0 in (0, 90, 180, 270):
    m = solid & (ang >= q0) & (ang < q0 + 90)
    if m.sum():
        segments.append([float(np.percentile(ang[m], 0.5)), float(np.percentile(ang[m], 99.5))])

# Letras CEMO: componentes conexos azuis, da esquerda para a direita.
blue = cover['blue'] > 0.5
lab = np.zeros((H, W), np.int32)
comps = []
for y0 in range(H):
    for x0 in range(W):
        if blue[y0, x0] and not lab[y0, x0]:
            n = len(comps) + 1
            q = deque([(y0, x0)])
            lab[y0, x0] = n
            pts = []
            while q:
                y, x = q.popleft()
                pts.append((y, x))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < H and 0 <= nx < W and blue[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n
                        q.append((ny, nx))
            p = np.array(pts)
            comps.append((n, p[:, 1].min(), p[:, 0].min(), p[:, 1].max(), p[:, 0].max(), len(pts)))
comps = sorted([c for c in comps if c[5] > 200], key=lambda c: c[1])
assert len(comps) == 4, comps


def subpixel_bbox(n, x0, y0, x1, y1):
    # Cobertura só do componente (a vizinhança pode ter outra letra).
    region = (lab[y0 - 2:y1 + 3, x0 - 2:x1 + 3] == n) | (cover['blue'][y0 - 2:y1 + 3, x0 - 2:x1 + 3] < 0.5)
    sub = cover['blue'][y0 - 2:y1 + 3, x0 - 2:x1 + 3] * region
    col, row = sub.sum(0), sub.sum(1)

    def edges(v):
        nz = np.nonzero(v > 0.01)[0]
        lo, hi = nz[0], nz[-1]
        return lo + (1 - min(v[lo] / max(v[lo + 2], 1e-6), 1)), hi + 1 - (1 - min(v[hi] / max(v[hi - 2], 1e-6), 1))

    l, r = edges(col)
    t, b = edges(row)
    return x0 - 2 + l, y0 - 2 + t, x0 - 2 + r, y0 - 2 + b


font = TTFont(FONT)
gs = font.getGlyphSet()
cmap = font.getBestCmap()
letters = []
for ch, c in zip('CEMO', comps):
    gname = cmap[ord(ch)]
    bp = BoundsPen(gs)
    gs[gname].draw(bp)
    gx0, gy0, gx1, gy1 = bp.bounds
    bx0, by0, bx1, by1 = subpixel_bbox(*c[:5])
    sx = (bx1 - bx0) / (gx1 - gx0)
    sy = (by1 - by0) / (gy1 - gy0)
    # Escala uniforme (a fonte não é distorcida); centraliza no bbox medido.
    s = (sx + sy) / 2
    tx = (bx0 + bx1) / 2 - (gx0 + gx1) / 2 * s
    ty = (by0 + by1) / 2 + (gy0 + gy1) / 2 * s
    pen = SVGPathPen(gs, lambda v: f'{v:.2f}'.rstrip('0').rstrip('.'))
    gs[gname].draw(TransformPen(pen, (s, 0, 0, -s, tx, ty)))
    letters.append({'char': ch, 'd': pen.getCommands(), 'scaleX': sx, 'scaleY': sy})

geometry = {
    'width': W,
    'height': H,
    'crosshair': {'cx': cx, 'cy': cy, 'vTop': float(v_top), 'vBottom': float(v_bottom), 'hLeft': float(h_left),
                  'hRight': float(h_right), 'vWidth': tv, 'hWidth': th},
    'dot': {'r': r_dot},
    'shortArcs': {'r': (inner + outer) / 2, 'width': outer - inner, 'segments': segments},
    'letters': letters,
}
with open(os.path.join(OUT, 'geometry.json'), 'w', encoding='utf-8') as fh:
    json.dump(geometry, fh, indent=1)

# Máscaras (preto = forma) para o traço suavizado.
g = G.copy()
g[(np.abs(xx - cx) < tv + 3) & (yy > v_top - 3) & (yy < v_bottom + 3)] = 0
g[(np.abs(yy - cy) < th + 3) & (xx > h_left - 3) & (xx < h_right + 3)] = 0
g[rr < r_dot + 2.5] = 0  # o ponto é geométrico; os arcos curtos (afilados) vão no traço
Image.fromarray((255 - g * 255).astype(np.uint8)).save(os.path.join(OUT, 'mask-green.png'))
Image.fromarray((255 - cover['cyan'] * 255).astype(np.uint8)).save(os.path.join(OUT, 'mask-cyan.png'))
Image.fromarray((255 - cover['blue'] * 255).astype(np.uint8)).save(os.path.join(OUT, 'mask-blue.png'))

print(json.dumps({k: v for k, v in geometry.items() if k != 'letters'}, indent=1))
print([(l['char'], round(l['scaleX'], 4), round(l['scaleY'], 4)) for l in letters])
