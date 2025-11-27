document.addEventListener("DOMContentLoaded", () => {
   const items = document.querySelectorAll(".item");
   const container = document.querySelector(".container");
   const numberOfItems = items.length;
   const angleIncrement = (2 * Math.PI) / numberOfItems;
   const radius = 300;
   let isGalleryOpen = false;

   const centerX = container.offsetWidth / 2;
   const centerY = container.offsetHeight / 2;

   const tl = gsap.timeline();

   items.forEach(function (item, index) {
      const img = document.createElement('img');
      img.src = './assets/img' + (index + 1) + '.jpg';
      item.appendChild(img);

      const angle = index * angleIncrement;
      const initialRotation = (angle * 180 / Math.PI) - 90;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      gsap.set(item, { scale: 0 });

      tl.to(item, {
         // left: x + 'px',
         // top: y + 'px',
         x: x - centerX,
         y: y - centerY,
         rotation: initialRotation,
         scale: 1,
         duration: 0.5,
         ease: "power2.out",
         delay: 0.5
      }, index * 0.1);
   })
})
