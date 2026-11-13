// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

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

// Lightbox (poster SAÉ 2.04)
const box = document.getElementById('lightbox');
document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => {
  box.querySelector('img').src = b.dataset.zoom;
  box.hidden = false;
}));
box.addEventListener('click', () => (box.hidden = true));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();