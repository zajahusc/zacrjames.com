const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Leave descriptions inline if native dialogs are unavailable.
if (typeof HTMLDialogElement !== 'undefined' && 'showModal' in HTMLDialogElement.prototype) {
  const dialogs = new Map();
  let activeDialog = null;
  let returnFocus = null;
  let openedFromCard = false;

  function syncDialog() {
    const slug = window.location.hash.slice(1);
    const next = dialogs.get(slug);
    if (activeDialog && activeDialog !== next) {
      activeDialog.close();
      activeDialog = null;
    }
    if (next && !next.open) {
      activeDialog = next;
      next.showModal();
      next.scrollTop = 0;
    }
    document.body.classList.toggle('modal-open', Boolean(activeDialog));
  }

  function closeBook() {
    if (openedFromCard) {
      openedFromCard = false;
      window.history.back();
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      syncDialog();
    }
    if (returnFocus) returnFocus.focus({ preventScroll: true });
  }

  document.querySelectorAll('.book-detail').forEach((section) => {
    const slug = section.id;
    const dialog = document.createElement('dialog');
    dialog.className = 'book-dialog';
    dialog.setAttribute('aria-labelledby', `${slug}-title`);
    const close = document.createElement('button');
    close.className = 'dialog-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close book details');
    close.setAttribute('autofocus', '');
    close.textContent = '×';
    close.addEventListener('click', closeBook);
    section.before(dialog);
    dialog.append(close, section);
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeBook();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeBook();
    });
    dialogs.set(slug, dialog);
  });

  document.querySelectorAll('[data-book]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      returnFocus = card;
      openedFromCard = true;
      window.history.pushState(null, '', `#${card.dataset.book}`);
      syncDialog();
    });
  });
  window.addEventListener('popstate', syncDialog);
  window.addEventListener('hashchange', syncDialog);
  syncDialog();
}
