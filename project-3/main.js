import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.3.15/+esm'

// Variáveis globais equivalentes às do componente React
let xPercent = 0;
let direction = -1;

window.addEventListener("load", () => {
   const slider = document.querySelector(".slider");
   const firstText = document.querySelector(".text-1");
   const secondText = document.querySelector(".text-2");

   // Registra o plugin ScrollTrigger
   gsap.registerPlugin(ScrollTrigger);

   const lenis = new Lenis();
   lenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
   });

   gsap.ticker.lagSmoothing(0);

   // Mesmo efeito de scroll do useEffect
   gsap.to(slider, {
      scrollTrigger: {
         trigger: document.documentElement,
         scrub: 0.25,
         start: 0,
         end: window.innerHeight,
         onUpdate: (self) => {
            // Direção inversa ao scroll, igual ao e.direction * -1
            direction = self.direction * -1;
         },
      },
      x: -500,
   });

   // Função de animação contínua (requestAnimationFrame)
   function animate() {
      if (xPercent < -100) {
         xPercent = 0;
      } else if (xPercent > 0) {
         xPercent = -100;
      }

      gsap.set(firstText, { xPercent: xPercent });
      gsap.set(secondText, { xPercent: xPercent });

      xPercent += 0.1 * direction;

      requestAnimationFrame(animate);
   }

   animate();
});
