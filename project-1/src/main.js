import './style.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () =>{
   gsap.registerPlugin(ScrollTrigger);

   const lenis = new Lenis();
   lenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
   });

   gsap.ticker.lagSmoothing(0);

   // posicao final das imagens x e y
   const spotlightImgFinalPos = [
      [-140, -140],
      [40, -130],
      [-160, 40],
      [40, 30]
   ];

   const spotlightImages = document.querySelectorAll(".spotlight-img");

   ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+${window.innerHeight * 6}px`,
      pin:  true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
         const progress = self.progress; // valor do progresso do scroll trigger valor entre 0 e 1 0 inicio 1 final

         const initialRotations = [5, -3, 3.5, -1]; // valor de rotacao inicial para cada imagem
         const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3]; // faz com qie as imagesn entre uma apos a outra

         spotlightImages.forEach((img, index) => {
            const initialRotation = initialRotations[index]; // cada imagem recebe um valor de rotacao
            const phase1Starte = phaseOneStartOffsets[index]; // cada imagem recebe um valor inicial de saida
            const phase1End = Math.min( // calculo para saber quando a primeira fase termina
               phase1Starte + (0.45 - phase1Starte) * 0.9,
               0.45
            );

            let x = -50; // valor pradrao 
            let y, rotation; // valor que iremmos atualizar

            if(progress < phase1Starte) { // verifica se nao atigiu o inicio da animacao
               y = 200;
               rotation = initialRotation;
            } else if(progress <= 0.45) {
               let phase1Progress;

               if(progress >= phase1End) {
                  phase1Progress = 1;
               } else {
                  const linearProgress = (progress - phase1Starte) / (phase1End - phase1Starte);
                  phase1Progress = 1 - Math.pow(1 - linearProgress, 3);
               }

               y = 200 - phase1Progress * 250;
               rotation = initialRotation;
            } else {
               y = -50;
               rotation = initialRotation
            }

            // define a phase 2 da animacao 
            const phaseTowStartOffSets = [0.5, 0.55, 0.6, 0.65];
            const phase2Start = phaseTowStartOffSets[index];
            const phase2End = Math.min(
               phase2Start + (0.95 - phase2Start) * 0.9,
               0.95
            );

            const finalX = spotlightImgFinalPos[index][0]; // 0 = x [-x -140]
            const finalY = spotlightImgFinalPos[index][1]; // 1 = y [-140 -y]

            if(progress >= phase2Start && progress <= 0.95) {
               let phase2Progress;

               if(progress >= phase2End) {
                  phase2Progress = 1;
               } else {
                  const linearProgress = (progress - phase2Start) / (phase2End - phase2Start);
                  phase2Progress =  1 - Math.pow(1 - linearProgress, 3);
               }

               x = -50 + (finalX + 50) * phase2Progress;
               y = -50 + (finalY + 50) * phase2Progress;
               rotation = initialRotation * (1 - phase2Progress);
            } else if(progress > 0.95) {
               x = finalX;
               y = finalY;
               rotation = 0
            }
 
            gsap.set(img, {
               transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`
            })
         })
      }
   })
})