<template>
  <div class="background"></div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps } from 'vue';

// Define the prop for the target selector
const props = defineProps({
  targetSelector: {
    type: String,
    default: '.navbar-animated'
  }
});

onMounted(() => {
  setTimeout(() => {
    const targetElement = document.querySelector(props.targetSelector) as HTMLElement | null;
    if (targetElement) {
      const canvas = document.createElement("canvas");
      canvas.width = targetElement.offsetWidth;
      canvas.height = targetElement.offsetHeight;
      targetElement.insertBefore(canvas, targetElement.firstChild);

      const ctx = canvas.getContext("2d")!;
      if (!ctx) return; // Ensure the context is available

      interface Particle {
        x: number;
        y: number;
        speedX: number;
        speedY: number;
        size: number;
      }

      const particles: Particle[] = [];
      const particleCount = 100;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          size: 1 + Math.random() * 3
        });
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height) p.y = 0;
          if (p.y < 0) p.y = canvas.height;
        }

        requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }
  }, 0);
});
</script>
  
  
  <style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400,600');
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #edf3f8;
  background: -moz-radial-gradient(center, ellipse cover, #edf3f8 1%, #dee3e8 100%);
  background: -webkit-radial-gradient(center, ellipse cover, #edf3f8 1%,#dee3e8 100%);
  background: radial-gradient(ellipse at center, #edf3f8 1%,#dee3e8 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#edf3f8', endColorstr='#dee3e8',GradientType=1 );
}
.pentahedron {
  position: absolute;
  width: 100%;
  height: 100%;
  fill: #3E82F7;
}

.point {
  fill: #8491A3;
}

.rhombus {
  fill: #2DA94F;
  stroke: #2DA94F;
}

.x {
  fill: #FDBD00;
}

.circle {
  fill: #ED412D;
}

svg {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  transform: translateZ(0px);
}

  </style>
  