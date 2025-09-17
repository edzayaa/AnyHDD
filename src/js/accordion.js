const accordionItems = document.querySelectorAll('.js-accordion');
console.log(accordionItems)
if (accordionItems) {
  accordionItems.forEach((accordion) => {
    accordion.addEventListener('click', (e) => toggleAccordion(e));
  });
}

const toggleAccordion = (e) => {
    console.log(e)
  let target = e.currentTarget;

  if (!target.classList.contains('accordion--expand')) {
    accordionItems.forEach((item) => {
      item.classList.remove('accordion--expand');
    });
    target.classList.add('accordion--expand');
  } else {
    target.classList.remove('accordion--expand');
  }
};