# marujo.studio

Site estático do estúdio e dos produtos Achei! e Solê, hospedado no GitHub Pages. O HTML fica na raiz; CSS, JavaScript e arquivos de mídia ficam em `css/`, `js/` e `assets/`.

Para prévia local, execute `python3 -m http.server 8000` na raiz do checkout e abra http://localhost:8000. Encerre com Ctrl-C. Consulte `../MarujoContent/processos/manter-site.md` (ou `~/Dev.local/MarujoContent/processos/manter-site.md` fora das pastas irmãs) para mapa das páginas, contexto editorial, worktrees e publicação. O gerador de referências usa `MARUJO_SITE` ou o padrão `~/Dev.local/marujo-studio` para localizar o checkout canônico do site.

## Continuidade visual

A identidade canônica permanece em MarujoContent/01-marca/identidade-visual.md. Os tokens no :root e o bloco “Identidade compartilhada” de css/styles.css concentram os tratamentos reutilizáveis: fundo creme, títulos azul-marinho, cartões com acentos azul (Achei!) e mel (Solê), e o token --social-gradient para o Instagram. Preserve a estrutura das páginas nos refinamentos. As páginas de leitura mantêm largura limitada, fundo claro e links sublinhados.

O asset assets/img/marujo-barquinho.png tem transparência e 224 × 224 px, exibido a 56 px no desktop e 48 px no celular, junto ao nome em texto acessível. Criado pela ferramenta integrada ImageGen; prompt: ilustração compacta de livro infantil de um barquinho de madeira, vela creme, bandeira coral, sol mel e ondas azuis, contorno azul-marinho, formas arredondadas, sem texto, sem rosto, fundo transparente, legível a 56 px, paleta canônica #173A5E, #3E9BD6, #E4572E, #F6C453 e #FDF6EC.

Ao mudar o CSS, sincronize a versão nas seis páginas e no template de ferramentas/gerar-referencias.py em MarujoContent. Regenere referências sem publicar para verificar a sétima página; não edite o HTML gerado à mão.
