import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
   smoothWheel: true,
   duration: 1.15,
   wheelMultiplier: 0.85,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const cards = gsap.utils.toArray('.card');
const images = gsap.utils.toArray('.services_img');

if (cards.length && images.length) {
   gsap.set(images, {
      clipPath: 'inset(100% 0 0 0)',
   });

   gsap.set(images[0], {
      clipPath: 'inset(0% 0 0 0)',
   });

   ScrollTrigger.create({
      trigger: '.services',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.service_image',
      pinSpacing: false,
      scrub: true,
      markers: true,
   });

   cards.forEach((card, index) => {
      const nextImage = images[index + 1];

      if (!nextImage) return;

      gsap.to(nextImage, {
         clipPath: 'inset(0% 0 0 0)',
         ease: 'none',
         scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: true
         },
      });
   });
}
