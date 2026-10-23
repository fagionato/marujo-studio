# marujo.studio

Site estático do estúdio e dos produtos Achei! e Solê, hospedado no GitHub Pages. O HTML fica na raiz; CSS, JavaScript e arquivos de mídia ficam em `css/`, `js/` e `assets/`. O footer compartilhado tem uma única fonte em `_includes/footer.html`; páginas HTML usam Liquid include e front matter para o Jekyll do GitHub Pages.

`python3 -m http.server` serve HTML estático, mas não expande includes Liquid; confira páginas com footer em um build Jekyll. Consulte `../MarujoContent/processos/manter-site.md` (ou `~/Dev.local/MarujoContent/processos/manter-site.md` fora das pastas irmãs) para mapa das páginas, contexto editorial, worktrees e publicação. O gerador de referências usa `MARUJO_SITE` ou o padrão `~/Dev.local/marujo-studio` para localizar o checkout canônico do site.

## Continuidade visual

A identidade canônica permanece em MarujoContent/01-marca/identidade-visual.md. Os tokens no :root e o bloco “Identidade compartilhada” de css/styles.css concentram os tratamentos reutilizáveis: fundo creme, títulos azul-marinho, cartões com acentos azul (Achei!) e mel (Solê), e o token --social-gradient para o Instagram. Preserve a estrutura das páginas nos refinamentos. As páginas de leitura mantêm largura limitada, fundo claro e links sublinhados.

O header usa `assets/img/elias-header.png`, retrato transparente do Elias em 224 × 224 px, exibido a 56 px no desktop e 48 px no celular ao lado do nome da marca. O barquinho continua no rodapé. O favicon tem seção própria abaixo.

## Favicon

O conjunto mora na raiz do repositório: são exatamente os caminhos que navegadores, iOS e buscadores pedem sozinhos, mesmo quando o HTML não declara nada. A declaração fica num único lugar, `_includes/favicons.html`, incluída com `{% include favicons.html %}` nas seis páginas estáticas e no template do gerador de referências (`ferramentas/gerar-referencias.py` em MarujoContent). Não repita o bloco de links dentro de uma página.

| Arquivo | Tamanho | Formato | Onde é usado |
|---|---|---|---|
| `favicon.ico` | 16, 32 e 48 no mesmo arquivo | ICO | pedido automático de todo navegador, Safari, favoritos, buscadores e agregadores |
| `favicon-16x16.png` | 16 × 16 | PNG | aba em tela sem densidade dupla |
| `favicon-32x32.png` | 32 × 32 | PNG | aba e barra de favoritos, em tela comum e HiDPI |
| `favicon-48x48.png` | 48 × 48 | PNG | Google Search (mínimo, que exige múltiplo de 48) |
| `favicon-96x96.png` | 96 × 96 | PNG | Google Search em HiDPI, atalhos e leitores de feed |
| `favicon-144x144.png` | 144 × 144 | PNG | tiles e atalhos do Windows, leitores de feed |
| `favicon-192x192.png` | 192 × 192 | PNG | Google Search, Android e Chrome |
| `favicon-512x512.png` | 512 × 512 | PNG | `site.webmanifest`, tela inicial do Android |
| `apple-touch-icon.png` | 180 × 180 | PNG | iOS e iPadOS, que também sondam `/apple-touch-icon.png` |
| `site.webmanifest` | — | JSON | Android e Chrome: ícones, `theme_color` e `background_color` |

Fonte única: `assets/img/elias-favicon-master.png` (quadrado; hoje 180 × 180). Para trocar o favicon, substitua esse arquivo e rode `scripts/gerar-favicons.sh` — o script recusa master não quadrado e regenera todos os tamanhos, o `.ico` e o `apple-touch-icon.png`. Não edite os arquivos da tabela à mão. Um master de 512 px ou mais daria um `favicon-512x512.png` nativo; com 180 px, esse tamanho é ampliado.

Não existe `favicon.svg` nem `mask-icon.svg` (aba fixada do Safari) porque não há vetor da arte no repositório, e um SVG com PNG embutido não traria nitidez. `mstile-*` e `browserconfig.xml` ficaram de fora por serem legado de Windows e IE.

Cuidado com cache: o navegador guarda favicon por URL, em cache próprio, e recarregar a página não limpa. Se a imagem mudar mantendo os mesmos nomes, acrescente `?v=2` (subindo o número a cada troca) nos links de `_includes/favicons.html`.

Conferência depois de publicar: `curl -I https://marujo.studio/favicon.ico` deve responder `200 image/x-icon`, e não 404; os PNGs e o `site.webmanifest` também precisam responder 200. O Google Search só aceita o ícone se a página declarar um tamanho múltiplo de 48. Use janela privada para ver o resultado sem cache.

Ao mudar o CSS, sincronize a versão nas seis páginas e no template de ferramentas/gerar-referencias.py em MarujoContent. Regenere referências sem publicar para verificar a sétima página; não edite o HTML gerado à mão. Para mudar o footer, edite `_includes/footer.html` e ajuste o include no gerador de referências; não mantenha cópias de footer nas páginas.
