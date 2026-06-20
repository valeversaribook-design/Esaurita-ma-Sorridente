/* =====================================================
   IL QUADERNO GENTILE — logica
   - Auto-salvataggio in localStorage durante la scrittura
   - Stampa / Salvataggio come PDF tramite window.print()
   - Reset con conferma
   ===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'quaderno-gentile-v1';
  const SAVE_DEBOUNCE = 600; // ms

  /* -----------------------------------------------------
     UTIL
     ----------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function getFields() {
    return $$('[data-save-key]');
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearStorage() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  /* -----------------------------------------------------
     RESTORE — al caricamento, ripristina i valori salvati
     ----------------------------------------------------- */
  function restoreValues() {
    const data = loadFromStorage();
    getFields().forEach((el) => {
      const key = el.getAttribute('data-save-key');
      if (key && data[key] !== undefined) {
        el.value = data[key];
        autoGrow(el);
      }
    });
  }

  /* -----------------------------------------------------
     AGGIORNA INTESTAZIONE STAMPA in tempo reale
     ----------------------------------------------------- */
  function updatePrintHeader() {
    const owner = ($('#ownerName').value || '').trim();
    $$('.js-name-print').forEach((el) => {
      el.textContent = owner || '____________';
    });

    const d = new Date();
    const months = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
    const dateStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    $$('.js-date-print').forEach((el) => {
      el.textContent = dateStr;
    });
  }

  /* -----------------------------------------------------
     AUTO-SAVE — debounce su input
     ----------------------------------------------------- */
  let saveTimer = null;
  const status = $('#saveStatus');
  const dot = $('.quaderno-actions__dot');

  function flashSaving() {
    if (status) status.textContent = 'Salvataggio in corso…';
    if (dot) dot.classList.add('is-saving');
  }
  function flashSaved() {
    if (status) status.textContent = 'Salvato automaticamente';
    if (dot) dot.classList.remove('is-saving');
  }

  function persistAll() {
    const data = {};
    getFields().forEach((el) => {
      const key = el.getAttribute('data-save-key');
      if (key) data[key] = el.value;
    });
    saveToStorage(data);
    updatePrintHeader();
    flashSaved();
  }

  function scheduleSave() {
    flashSaving();
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(persistAll, SAVE_DEBOUNCE);
  }

  /* -----------------------------------------------------
     AUTO-GROW per textarea
     ----------------------------------------------------- */
  function autoGrow(el) {
    if (el.tagName !== 'TEXTAREA') return;
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 2) + 'px';
  }

  /* -----------------------------------------------------
     INIT campi
     ----------------------------------------------------- */
  function attachFieldEvents() {
    getFields().forEach((el) => {
      el.addEventListener('input', () => {
        scheduleSave();
        autoGrow(el);
      });
      // primo grow al caricamento
      autoGrow(el);
    });
  }

  /* -----------------------------------------------------
     STAMPA — prepara metadati e apre il dialog
     ----------------------------------------------------- */
  function prepareForPrint() {
    updatePrintHeader();
    persistAll();
  }

  $('#printQuadernoBtn').addEventListener('click', () => {
    prepareForPrint();
    // piccolo delay per assicurare aggiornamento DOM
    setTimeout(() => window.print(), 100);
  });

  /* -----------------------------------------------------
     RESET — pulisci tutto con conferma
     ----------------------------------------------------- */
  $('#resetQuadernoBtn').addEventListener('click', () => {
    const ok = confirm(
      'Vuoi davvero pulire tutto il quaderno?\n\n' +
      'Perderai tutto quello che hai scritto qui dentro. Questa azione non si può annullare.'
    );
    if (!ok) return;

    getFields().forEach((el) => {
      el.value = '';
      autoGrow(el);
    });
    clearStorage();
    flashSaved();
    if (status) status.textContent = 'Quaderno pulito';

    // scroll in cima
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      if (status) status.textContent = 'Salvato automaticamente';
    }, 2500);
  });

  /* -----------------------------------------------------
     STICKY ACTIONS — appare scrollando
     ----------------------------------------------------- */
  const actionsEl = $('#quadernoActions');
  function onScroll() {
    if (window.scrollY > 200) {
      actionsEl.classList.add('is-sticky');
    } else {
      actionsEl.classList.remove('is-sticky');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* -----------------------------------------------------
     INIT
     ----------------------------------------------------- */
  function init() {
    restoreValues();
    attachFieldEvents();
    updatePrintHeader();
    onScroll();

    // Per Safari iOS: forza ricalcolo autoGrow dopo render
    requestAnimationFrame(() => {
      getFields().forEach(autoGrow);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
