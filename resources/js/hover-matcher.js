// Script para matchear imágenes, títulos e items por data-atributos y manejar hover

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los elementos relevantes
  const selectors = [
    '[data-title]',
    '[data-sub-title]',
    '[data-icon]',
    '[data-img]',
    '[data-name]'
  ];
  const allItems = document.querySelectorAll(selectors.join(','));

  // Función para limpiar todos los active
  function clearAllActive() {
    allItems.forEach(el => el.classList.remove('active'));
  }

  // Función para activar todos los elementos con el mismo valor
  function activateGroup(value) {
    clearAllActive();
    selectors.forEach(sel => {
      // sel es como '[data-title]', quitamos los corchetes para obtener el nombre del atributo
      const attr = sel.replace(/\[|\]/g, '');
      document.querySelectorAll(`[${attr}="${value}"]`).forEach(el => {
        el.classList.add('active');
      });
    });
  }

  // Escuchar hover y click en los triggers
  const triggers = document.querySelectorAll('[data-title], [data-sub-title], [data-icon]');
  triggers.forEach(trigger => {
    const getValue = () =>
      trigger.getAttribute('data-title') ||
      trigger.getAttribute('data-sub-title') ||
      trigger.getAttribute('data-icon');

    trigger.addEventListener('mouseenter', () => {
      const value = getValue();
      if (value) activateGroup(value);
    });
    trigger.addEventListener('click', () => {
      const value = getValue();
      if (value) activateGroup(value);
    });
  });

  // Mantener funcionalidad anterior para data-content
  const items = document.querySelectorAll('[data-content]');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const id = item.getAttribute('data-content');
      clearAllActive();
      item.classList.add('active');
      const img = document.querySelector(`[data-img="${id}"]`);
      if (img) img.classList.add('active');
      const title = document.querySelector(`[data-title="${id}"]`);
      if (title) title.classList.add('active');
    });
  });
});
