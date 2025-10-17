import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const faces = card.querySelector('.faces');
    if (!faces) return;

    // Evento para cuando el cursor entra en la tarjeta
    card.addEventListener('mouseenter', () => {
      // Detiene cualquier animación en curso sobre 'faces'
      gsap.killTweensOf(faces);
      // Gira la tarjeta para mostrar la parte trasera
      gsap.to(faces, { rotationY: 180, duration: 0.8, ease: "power1.inOut" });
    });

    // Evento para cuando el cursor sale de la tarjeta
    card.addEventListener('mouseleave', () => {
      // Detiene cualquier animación en curso sobre 'faces'
      gsap.killTweensOf(faces);
      // Devuelve la tarjeta a su posición original
      gsap.to(faces, { rotationY: 0, duration: 0.8, ease: "power1.inOut" });
    });
  });
});