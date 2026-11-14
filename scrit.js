// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

// Filtres de projets
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.f;
    document.querySelectorAll('.sae').forEach(card => {
      card.classList.toggle('hide', f !== 'all' && card.dataset.c !== f);
    });
  });
});

// Zoom plein écran : sur tous les graphiques et sur le bouton du poster
const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
function openZoom(src, alt) {
  boxImg.src = src;
  boxImg.alt = alt || '';
  box.hidden = false;
}
// Si une image est introuvable, essaie l'autre nom de fichier (avec ou sans "github")
function otherName(src) {
  return /github\.\w+$/i.test(src)
    ? src.replace(/github(\.\w+)$/i, '$1')
    : src.replace(/(\.\w+)$/, 'github$1');
}
document.querySelectorAll('.sae figure img').forEach(img => {
  img.addEventListener('error', () => {
    if (img.dataset.retry) return;
    img.dataset.retry = '1';
    img.removeAttribute('loading');
    img.src = otherName(img.getAttribute('src'));
  });
  if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
});

document.querySelectorAll('.sae figure img').forEach(img => {
  img.tabIndex = 0;
  img.addEventListener('click', () => openZoom(img.src, img.alt));
  img.addEventListener('keydown', e => { if (e.key === 'Enter') openZoom(img.src, img.alt); });
});
document.querySelectorAll('[data-zoom]').forEach(b =>
  b.addEventListener('click', () => {
    const poster = document.getElementById('img-poster');
    openZoom(poster ? poster.src : b.dataset.zoom, 'Poster de la SAÉ 2.04');
  }));
box.addEventListener('click', () => (box.hidden = true));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();
