// Script para matchear imágenes, títulos e items por data-atributos y manejar hover

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los items que tengan un data (ajusta el nombre si usas otro)
  const items = document.querySelectorAll('[data-content]');
  const images = document.querySelectorAll('[data-img]');
  const titles = document.querySelectorAll('[data-title]');

  function clearActive() {
    items.forEach(item => item.classList.remove('active'));
    images.forEach(img => img.classList.remove('active'));
    titles.forEach(title => title.classList.remove('active'));
  }
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const id = item.getAttribute('data-content');
      clearActive();
      item.classList.add('active');
      const img = document.querySelector(`[data-img="${id}"]`);
      if (img) img.classList.add('active');
      const title = document.querySelector(`[data-title="${id}"]`);
      if (title) title.classList.add('active');
    });
  });
});
