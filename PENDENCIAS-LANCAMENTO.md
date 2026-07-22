# Pendências para o lançamento (Solê e Achei!)

Lista das coisas que ainda faltam fazer **fora do código** ou **só no dia do lançamento**.
O site em si (Política de Privacidade + Suporte) já está pronto e no ar em `marujo.studio`.

Marque com `[x]` conforme for concluindo.

---

## 1. App Store Connect — colar os URLs na ficha do app

> Isso NÃO é no site, é no painel da Apple. O site só hospeda as páginas; a Apple exige que
> você informe os endereços delas na ficha de cada app.

- [ ] **Solê — Privacy Policy URL:** `https://marujo.studio/sole-privacidade.html`
- [ ] **Solê — Support URL:** `https://marujo.studio/suporte.html`
- [ ] **Achei! — Privacy Policy URL:** `https://marujo.studio/privacidade.html`
- [ ] **Achei! — Support URL:** `https://marujo.studio/suporte.html`

**Onde:** [App Store Connect](https://appstoreconnect.apple.com) → **Meus Apps** → (escolha o app) →
aba **Informações do App** (App Information). O *Privacy Policy URL* fica na seção **General
Information**; o *Support URL* fica em **App Information** / dados da versão. É só colar o endereço
e salvar.

---

## 2. Ficha de Privacidade da Apple ("nutrition label")

> Além do link da política, a Apple pede que você preencha um formulário dizendo quais dados o
> app coleta. Como os nossos apps não coletam nada, a resposta é simples.

- [ ] **Solê:** marcar **"Data Not Collected" / "Nenhum dado coletado"**.
- [ ] **Achei!:** marcar **"Data Not Collected" / "Nenhum dado coletado"**.

**Onde:** App Store Connect → app → aba **App Privacy** → botão **Get Started / Editar** →
responder **"No, we do not collect data from this app"**.

---

## 3. Trocar o selo "Em breve" pelo badge oficial da Apple (só no dia do lançamento)

> Enquanto o app não saiu, o site mostra um selo caseiro "Em breve na App Store".
> Quando o app for aprovado e publicado, troque pelo badge oficial "Baixar na App Store"
> com o link para a página do app na loja.

- [ ] **Solê:** editar [`sole.html`](sole.html) (procure o comentário `<!-- No lançamento: trocar por selo oficial... -->`, por volta da linha 65).
- [ ] **Achei!:** fazer o mesmo em [`achei.html`](achei.html) quando ele for lançado.

**Como:** substituir o bloco `<span class="appstore">…</span>` por um link `<a href="LINK-DA-APP-STORE">`
com a imagem oficial do badge da Apple. O badge oficial e as regras de uso ficam em
[Apple Marketing Resources](https://developer.apple.com/app-store/marketing/guidelines/#downloadOnAppStore).

---

## 4. Atualizar a data da Política de Privacidade (se mexer nela)

> A política do Solê traz "Última atualização: 21 de julho de 2026". Se um dia você alterar o
> texto da política, lembre de atualizar essa data em dois lugares.

- [ ] Em [`sole-privacidade.html`](sole-privacidade.html): o `<p>` do topo e o bloco `.status`.

---

## O que JÁ está pronto (não precisa fazer nada)

- ✅ Página de Política de Privacidade do Solê (`sole-privacidade.html`) — completa, conforme
  categoria Kids da Apple (COPPA/LGPD/GDPR-K, portão parental, contato).
- ✅ Página de Suporte (`suporte.html`) — atende Solê e Achei!, com e-mail de contato.
- ✅ Página do app Solê (`sole.html`), sitemap e todos os links/imagens funcionando.
- ✅ Tudo publicado em `marujo.studio` (branch `main`, GitHub Pages).
