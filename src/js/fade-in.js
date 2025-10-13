 import gsap from "gsap";
 
 document.addEventListener('DOMContentLoaded', (event) => {
      
    //Animacion para elementos que van a aparecer al cargar la pagina. Sin scrolltrigger

    // 2. Crea la animación de fundido de entrada
    gsap.from(".fade-in-element", {
      duration: 1.5,        // Duración de la animación en segundos
      autoAlpha: 0,         // El estado inicial (opacidad: 0, visibilidad: hidden)
      y: -50,                // Opcional: añade un pequeño desplazamiento hacia arriba
      ease: "power2.out" ,
      delay:0.25,
      stagger:0.25
      // Otros parámetros: delay: 0.5 (si quieres un retraso)
    });

    gsap.from(".fade-in-reverse", {
      duration: 1.5,        // Duración de la animación en segundos
      autoAlpha: 0,         // El estado inicial (opacidad: 0, visibilidad: hidden)
      y: 50,                // Opcional: añade un pequeño desplazamiento hacia arriba
      ease: "power2.out" ,
      delay:0.25,
      stagger:0.25
      // Otros parámetros: delay: 0.5 (si quieres un retraso)
    });

    gsap.from(".show-in-left", {
      duration: 1.5,        // Duración de la animación en segundos
      autoAlpha: 0,         // El estado inicial (opacidad: 0, visibilidad: hidden)
      x: -50,                // Opcional: añade un pequeño desplazamiento hacia arriba
      ease: "power2.out" ,
      delay:0.25,
      stagger:0.25
      // Otros parámetros: delay: 0.5 (si quieres un retraso)
    });

    gsap.from(".show-in-right", {
      duration: 1.5,        // Duración de la animación en segundos
      autoAlpha: 0,         // El estado inicial (opacidad: 0, visibilidad: hidden)
      x: 50,                // Opcional: añade un pequeño desplazamiento hacia arriba
      ease: "power2.out" ,
      delay:0.25,
      stagger:0.25
      // Otros parámetros: delay: 0.5 (si quieres un retraso)
    });
  });