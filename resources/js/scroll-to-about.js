import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
  const scrollToBtn = document.getElementById("scrollToBtn");
  if (!scrollToBtn) return;

  // Creamos el contexto de matchMedia
  let mm = gsap.matchMedia();

  scrollToBtn.addEventListener("click", () => {
    // Definimos una variable para el offset por defecto (escritorio)
    let dynamicOffset = 400;

    // Aplicamos lógica según el breakpoint
    mm.add({
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isDesktop: "(min-width: 1025px)"
    }, (context) => {
      let { isMobile, isTablet } = context.conditions;

      if (isMobile) dynamicOffset = -100;      // Offset para móviles
      else if (isTablet) dynamicOffset = -50; // Offset para tablets
      else dynamicOffset = -450;               // Offset para desktop
    });

    gsap.to(window, {
      duration: 1.25,
      scrollTo: {
        y: "#stablished_in_section",
        offsetY: dynamicOffset
      },
      ease: "power2.inOut" // Opcional: suaviza el movimiento
    });
  });
});
