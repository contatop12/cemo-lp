"""Remove o fundo dos retratos do corpo clínico (só o fundo: os pixels da pessoa ficam intactos).

Uso (na raiz do repo, uma vez por foto nova): python -P scripts/portraits/cutout.py
Requer `pip install --user "rembg[cpu]"` (modelo BiRefNet-portrait, baixado no primeiro uso).
Entrada: _materiais/fotos/dr-david.jpeg e _materiais/fotos/medicos/*.jpg|jpeg
Saída:   _materiais/fotos/recortes/<nome>.png (RGBA, enquadramento original). O recorte final e a otimização
         ficam em scripts/portraits/frame.mjs.
"""
import os

from PIL import Image
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, '_materiais', 'fotos')
OUT = os.path.join(SRC, 'recortes')
os.makedirs(OUT, exist_ok=True)

inputs = [os.path.join(SRC, 'dr-david.jpeg')]
inputs += [os.path.join(SRC, 'medicos', f) for f in sorted(os.listdir(os.path.join(SRC, 'medicos')))
           if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

session = new_session('birefnet-portrait')
for path in inputs:
    name = os.path.splitext(os.path.basename(path))[0]
    out = os.path.join(OUT, name + '.png')
    if os.path.exists(out):
        print('skip', name)
        continue
    remove(Image.open(path).convert('RGB'), session=session).save(out)
    print('ok', name)
