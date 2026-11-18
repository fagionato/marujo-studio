/* Marujo Studio · JS mínimo (menu mobile, botão voltar ao topo e a página de referências:
   busca no navegador, vistas por assunto/publicação e âncoras #post-… / #ref-…).
   FAQ usa <details>/<summary> nativo — sem JS necessário. */
(function () {
  'use strict';

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Fecha ao clicar num link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    // Fecha com Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ---- Botão "voltar ao topo" (páginas longas) ---- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Página de referências: busca, vistas e âncoras ----
     Só opera quando a página traz os elementos (#ref-busca, as duas vistas e os
     botões); nas outras páginas do site, este bloco não faz nada. */
  var busca = document.getElementById('ref-busca');
  var contador = document.getElementById('ref-count');
  var vazioAviso = document.getElementById('ref-vazio');
  var limparBusca = document.querySelector('.ref-search-clear');
  var vistaAssunto = document.getElementById('ref-vista-assunto');
  var vistaPublicacao = document.getElementById('ref-vista-publicacao');
  var botoesVista = document.querySelectorAll('.ref-switch-btn');

  if (busca && contador && vistaAssunto && vistaPublicacao && botoesVista.length) {
    var grupos = [].slice.call(vistaAssunto.querySelectorAll('details.ref-group'));
    var entradas = [].slice.call(vistaAssunto.querySelectorAll('.ref-entry'));
    var posts = [].slice.call(vistaPublicacao.querySelectorAll('.ref-post'));
    var secaoUltimas = document.querySelector('.ref-latest');
    var cardsUltimas = secaoUltimas
      ? [].slice.call(secaoUltimas.querySelectorAll('.ref-post'))
      : [];
    var contagemInicial = contador.textContent;
    var visiveis = { assunto: entradas.length, publicacao: posts.length };
    var plural = {
      assunto: ['referência', 'referências'],
      publicacao: ['publicação', 'publicações']
    };
    var selos = [];
    for (var g = 0; g < grupos.length; g++) {
      var selo = grupos[g].querySelector('.ref-group-count');
      selos.push(
        selo
          ? { elemento: selo, texto: selo.textContent, total: parseInt(selo.textContent, 10) || 0 }
          : null
      );
    }

    /* Minúsculas e sem acento; navegador sem `normalize` segue comparando com acento. */
    var normalizar = function (texto) {
      texto = (texto || '').toLowerCase();
      try {
        texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      } catch (erro) {
        /* segue com o texto original */
      }
      return texto;
    };

    var mostrar = function (elemento, visivel) {
      if (visivel) elemento.classList.remove('hidden');
      else elemento.classList.add('hidden');
    };

    var termoAtual = function () {
      return normalizar(busca.value.replace(/^\s+|\s+$/g, ''));
    };

    /* Cada palavra digitada precisa aparecer no texto, em qualquer ordem. */
    var termos = function () {
      var texto = termoAtual();
      return texto ? texto.split(/\s+/) : [];
    };

    var casar = function (texto, lista) {
      var alvo = normalizar(texto);
      for (var t = 0; t < lista.length; t++) {
        if (alvo.indexOf(lista[t]) === -1) return false;
      }
      return true;
    };

    var vistaAtual = function () {
      return vistaPublicacao.hidden ? 'assunto' : 'publicacao';
    };

    var escreverContagem = function () {
      var termo = termoAtual();
      if (vazioAviso) vazioAviso.hidden = !(termo && visiveis[vistaAtual()] === 0);
      if (!termo) {
        contador.textContent = contagemInicial;
        return;
      }
      var vista = vistaAtual();
      var total = vista === 'assunto' ? entradas.length : posts.length;
      contador.textContent =
        'Mostrando ' + visiveis[vista] + ' de ' + total + ' ' +
        plural[vista][total === 1 ? 0 : 1];
    };

    var filtrar = function () {
      var lista = termos();
      var vazio = lista.length === 0;
      var i, casa;

      for (i = 0; i < entradas.length; i++) {
        casa = vazio || casar(entradas[i].textContent, lista);
        mostrar(entradas[i], casa);
      }
      for (i = 0; i < grupos.length; i++) {
        casa = grupos[i].querySelectorAll('.ref-entry:not(.hidden)').length;
        mostrar(grupos[i], vazio || casa > 0);
        grupos[i].open = vazio ? i === 0 : casa > 0;
        if (selos[i]) {
          selos[i].elemento.textContent = vazio
            ? selos[i].texto
            : casa + ' de ' + selos[i].total;
        }
      }
      visiveis.assunto = vistaAssunto.querySelectorAll('.ref-entry:not(.hidden)').length;

      for (i = 0; i < posts.length; i++) {
        casa = vazio || casar(posts[i].textContent, lista);
        mostrar(posts[i], casa);
      }
      visiveis.publicacao = vistaPublicacao.querySelectorAll('.ref-post:not(.hidden)').length;

      /* O bloco das últimas é o mesmo card da vista por publicação; some quando nada
         casa, para não deixar no topo uma lista alheia à busca. */
      var ultimasVisiveis = 0;
      for (i = 0; i < cardsUltimas.length; i++) {
        casa = vazio || casar(cardsUltimas[i].textContent, lista);
        mostrar(cardsUltimas[i], casa);
        if (casa) ultimasVisiveis++;
      }
      if (secaoUltimas) mostrar(secaoUltimas, vazio || ultimasVisiveis > 0);

      if (limparBusca) limparBusca.hidden = vazio;
      escreverContagem();
    };

    var mostrarVista = function (nome) {
      var publicacao = nome === 'publicacao';
      vistaAssunto.hidden = publicacao;
      vistaPublicacao.hidden = !publicacao;
      for (var i = 0; i < botoesVista.length; i++) {
        var ativo = botoesVista[i].getAttribute('data-view') === nome;
        botoesVista[i].setAttribute('aria-pressed', ativo ? 'true' : 'false');
      }
      escreverContagem();
    };

    for (var b = 0; b < botoesVista.length; b++) {
      botoesVista[b].addEventListener('click', function () {
        mostrarVista(this.getAttribute('data-view'));
      });
    }

    busca.addEventListener('input', filtrar);
    busca.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && busca.value) {
        busca.value = '';
        filtrar();
      }
    });

    if (limparBusca) {
      limparBusca.addEventListener('click', function () {
        busca.value = '';
        filtrar();
        busca.focus();
      });
    }

    /* Deep link: o link sticker de um Stories pode apontar para #post-… (o card na vista
       por publicação) ou #ref-… (a fonte no acervo). */
    var irParaAncora = function (hash) {
      if (!hash || hash.length < 2) return;
      var alvo = document.getElementById(hash.replace(/^#/, ''));
      if (!alvo) return;
      /* Uma busca ativa poderia esconder justamente a âncora: o link manda mais. Limpe
         antes de abrir a vista e o grupo, senão o reset da busca fecha o grupo de novo. */
      if (busca.value) {
        busca.value = '';
        filtrar();
      }
      if (hash.indexOf('#post-') === 0) {
        mostrarVista('publicacao');
      } else if (hash.indexOf('#ref-') === 0) {
        mostrarVista('assunto');
        var grupo = alvo.parentNode;
        while (grupo && grupo.nodeName !== 'DETAILS') grupo = grupo.parentNode;
        if (grupo) grupo.open = true;
      } else {
        return;
      }
      /* Um pulo direto, não suave: o link vem de um sticker e a pessoa quer chegar lá. */
      var raiz = document.documentElement;
      var suave = raiz.style.scrollBehavior;
      raiz.style.scrollBehavior = 'auto';
      if (alvo.scrollIntoView) alvo.scrollIntoView({ block: 'start' });
      raiz.style.scrollBehavior = suave;
    };

    window.addEventListener('hashchange', function () {
      irParaAncora(window.location.hash);
    });
    irParaAncora(window.location.hash);
  }
})();
