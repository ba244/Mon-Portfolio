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
document.querySelectorAll('.sae figure img').forEach(img => {
  img.tabIndex = 0;
  img.addEventListener('click', () => openZoom(img.src, img.alt));
  img.addEventListener('keydown', e => { if (e.key === 'Enter') openZoom(img.src, img.alt); });
});
document.querySelectorAll('[data-zoom]').forEach(b =>
  b.addEventListener('click', () => openZoom(b.dataset.zoom, 'Poster de la SAÉ 2.04')));
box.addEventListener('click', () => (box.hidden = true));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();
