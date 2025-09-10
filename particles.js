// Creează particule X și O animate în fundal
function createBackgroundParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'background-particles';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;

  // Creează mai multe particule pentru efect mai dens
  for (let i = 0; i < 35; i++) {
    const particle = document.createElement('div');
    const isX = Math.random() > 0.4; // Mai multe X-uri
    
    particle.textContent = isX ? 'X' : 'O';
    particle.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 60 + 15}px;
      font-weight: bold;
      color: ${isX ? 'rgba(74, 144, 226, 0.08)' : 'rgba(255, 107, 53, 0.06)'};
      left: ${Math.random() * 120 - 10}%;
      top: ${Math.random() * 120 - 10}%;
      animation: floatParticle ${Math.random() * 25 + 15}s linear infinite;
      transform: rotate(${Math.random() * 360}deg);
      font-family: 'Segoe UI', sans-serif;
    `;
    
    particlesContainer.appendChild(particle);
  }

  // Adaugă și câteva elemente statice mai mari
  for (let i = 0; i < 8; i++) {
    const staticElement = document.createElement('div');
    const isX = Math.random() > 0.5;
    
    staticElement.textContent = isX ? 'X' : 'O';
    staticElement.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 100 + 80}px;
      font-weight: 300;
      color: ${isX ? 'rgba(74, 144, 226, 0.03)' : 'rgba(255, 107, 53, 0.03)'};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      transform: rotate(${Math.random() * 45 - 22.5}deg);
      font-family: 'Segoe UI', sans-serif;
      animation: breathe ${Math.random() * 8 + 6}s ease-in-out infinite;
    `;
    
    particlesContainer.appendChild(staticElement);
  }

  document.body.appendChild(particlesContainer);
}

// Animații CSS pentru particule
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0% { 
      transform: translateY(10px) translateX(0px) rotate(0deg) scale(1);
      opacity: 0.08;
    }
    25% { 
      opacity: 0.12;
      transform: translateY(-20px) translateX(15px) rotate(90deg) scale(0.9);
    }
    50% { 
      opacity: 0.06;
      transform: translateY(-60px) translateX(-10px) rotate(180deg) scale(0.7);
    }
    75% { 
      opacity: 0.03;
      transform: translateY(-90px) translateX(20px) rotate(270deg) scale(0.5);
    }
    100% { 
      transform: translateY(-120px) translateX(0px) rotate(360deg) scale(0.3);
      opacity: 0;
    }
  }
  
  @keyframes breathe {
    0%, 100% { 
      opacity: 0.03;
      transform: scale(1) rotate(var(--initial-rotation, 0deg));
    }
    50% { 
      opacity: 0.06;
      transform: scale(1.1) rotate(calc(var(--initial-rotation, 0deg) + 5deg));
    }
  }
  
  .background-particles div {
    text-shadow: 0 0 30px currentColor;
    will-change: transform, opacity;
  }
`;
document.head.appendChild(style);

// Inițializează particulele când se încarcă pagina
document.addEventListener('DOMContentLoaded', createBackgroundParticles);
