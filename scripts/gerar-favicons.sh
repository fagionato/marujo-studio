#!/usr/bin/env bash
# Gera o conjunto completo de favicons do site a partir de um master quadrado.
#
# Uso:
#   scripts/gerar-favicons.sh                      # usa assets/img/elias-favicon-master.png
#   scripts/gerar-favicons.sh caminho/do/master.png
#
# Trocar o favicon = substituir o master (quadrado, >= 512x512 de preferência)
# e rodar este script. A lista de arquivos gerados e onde cada um é usado está
# no README, seção "Favicon".
#
# Requer ImageMagick (`brew install imagemagick`).
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MASTER="${1:-$RAIZ/assets/img/elias-favicon-master.png}"
PNG="favicon-%dx%d.png"
TAMANHOS=(16 32 48 96 144 192 512)

command -v magick >/dev/null || {
  echo "erro: ImageMagick (magick) não encontrado. Instale com: brew install imagemagick" >&2
  exit 1
}
[ -f "$MASTER" ] || {
  echo "erro: master não encontrado: $MASTER" >&2
  exit 1
}

# O master precisa ser quadrado, senão os ícones herdam distorção.
LARGURA="$(magick identify -format '%w' "$MASTER")"
ALTURA="$(magick identify -format '%h' "$MASTER")"
[ "$LARGURA" = "$ALTURA" ] || {
  echo "erro: master deve ser quadrado (tem ${LARGURA}x${ALTURA})" >&2
  exit 1
}

cd "$RAIZ"
for t in "${TAMANHOS[@]}"; do
  magick "$MASTER" -filter Lanczos -resize "${t}x${t}" -alpha off -strip "$(printf "$PNG" "$t" "$t")"
done

# apple-touch-icon precisa ter 180x180 e ficar na raiz: o iOS sonha esse caminho.
magick "$MASTER" -filter Lanczos -resize 180x180 -alpha off -strip apple-touch-icon.png

# .ico não aceita tamanho único: carrega 16, 32 e 48 no mesmo arquivo.
magick "$MASTER" -filter Lanczos -alpha off -strip -define icon:auto-resize=48,32,16 favicon.ico

echo "Favicons gerados em $RAIZ a partir de ${MASTER#"$RAIZ"/} (${LARGURA}x${ALTURA}):"
printf '  %s\n' "${TAMANHOS[@]/#/favicon-}" | sed -E 's#favicon-([0-9]+)$#favicon-\1x\1.png#'
echo "  apple-touch-icon.png"
echo "  favicon.ico (16, 32, 48)"
