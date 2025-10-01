import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let isFlipped = false; // Estado para saber si la carta está girada

    card.addEventListener('click', () => {
      const faces = card.querySelector('.faces');

      if (!faces) return;

      // Alternar entre el frente y la parte trasera
      if (!isFlipped) {
        gsap.to(faces, { rotationY: 180, duration: 0.8, ease: "power1.inOut" });
      } else {
        gsap.to(faces, { rotationY: 0, duration: 0.8, ease: "power1.inOut" });
      }

      isFlipped = !isFlipped; // Cambiar el estado
    });
  });
});