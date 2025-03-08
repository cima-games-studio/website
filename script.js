document.addEventListener("DOMContentLoaded", () => {
  // Add animation to game cards
  const gameCards = document.querySelectorAll(".game-card")

  gameCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add("animate-in")
  })

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add responsive navigation toggle if needed in the future
  // This is a placeholder for future navigation functionality
  const addResponsiveNav = () => {
    // Code for responsive navigation would go here
    console.log("Responsive navigation ready to be implemented")
  }

  // Initialize responsive features
  addResponsiveNav()

  initCarousels();
  window.addEventListener('resize', handleResize);
  handleResize(); // Inicializar con el tamaño actual
})

function handleResize() {
  // No necesitamos cambiar estilos programáticamente,
  // porque ahora usamos CSS con clases específicas
  // (mobile-tablet-only y desktop-only)
}

function initCarousels() {
  // Solo inicializar carruseles en dispositivos móviles y tablets
  if (window.innerWidth >= 992) return;
  
  // Inicializa todos los carruseles en la página
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const items = carousel.querySelector('.carousel-items');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (!items) return;
    
    // Determinar el ancho de deslizamiento según el dispositivo
    const getScrollAmount = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // En móvil, desplazar por el ancho de un elemento (100%)
        return items.offsetWidth;
      } else {
        // En tablet, desplazar por el ancho de un elemento (50%)
        return items.offsetWidth / 2;
      }
    };
    
    // Controladores de eventos para los botones
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        items.scrollBy({
          left: -getScrollAmount(),
          behavior: 'smooth'
        });
        
        // Actualizar visibilidad de las flechas después del desplazamiento
        setTimeout(() => {
          updateArrowVisibility(items, prevBtn, nextBtn);
        }, 300);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        items.scrollBy({
          left: getScrollAmount(),
          behavior: 'smooth'
        });
        
        // Actualizar visibilidad de las flechas después del desplazamiento
        setTimeout(() => {
          updateArrowVisibility(items, prevBtn, nextBtn);
        }, 300);
      });
    }
    
    // Variables para el manejo táctil
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Eventos para swipe en dispositivos táctiles y ratón
    items.addEventListener('mousedown', (e) => {
      isDown = true;
      items.classList.add('active');
      startX = e.pageX - items.offsetLeft;
      scrollLeft = items.scrollLeft;
    });
    
    items.addEventListener('mouseleave', () => {
      isDown = false;
      items.classList.remove('active');
    });
    
    items.addEventListener('mouseup', () => {
      isDown = false;
      items.classList.remove('active');
    });
    
    items.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - items.offsetLeft;
      const walk = (x - startX) * 2; // Ajustar velocidad de arrastre
      items.scrollLeft = scrollLeft - walk;
    });
    
    // Eventos táctiles para dispositivos móviles
    items.addEventListener('touchstart', (e) => {
      isDown = true;
      items.classList.add('active');
      startX = e.touches[0].pageX - items.offsetLeft;
      scrollLeft = items.scrollLeft;
    }, { passive: true });
    
    items.addEventListener('touchend', () => {
      isDown = false;
      items.classList.remove('active');
    });
    
    items.addEventListener('touchcancel', () => {
      isDown = false;
      items.classList.remove('active');
    });
    
    items.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - items.offsetLeft;
      const walk = (x - startX) * 2;
      items.scrollLeft = scrollLeft - walk;
    }, { passive: true });
    
    // Mostrar/ocultar flechas según la posición de desplazamiento
    items.addEventListener('scroll', () => {
      updateArrowVisibility(items, prevBtn, nextBtn);
    });
    
    // Inicializar visibilidad de flechas
    updateArrowVisibility(items, prevBtn, nextBtn);
  });
}

function updateArrowVisibility(items, prevBtn, nextBtn) {
  if (!prevBtn || !nextBtn) return;
  
  // Muestra/oculta la flecha anterior según la posición de desplazamiento
  if (items.scrollLeft <= 10) {
    prevBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
  }
  
  // Muestra/oculta la flecha siguiente si estamos cerca del final
  const scrollEnd = items.scrollWidth - items.clientWidth - 10;
  if (items.scrollLeft >= scrollEnd) {
    nextBtn.classList.add('hidden');
  } else {
    nextBtn.classList.remove('hidden');
  }
}

// Función para ajustar el diseño en dispositivos móviles
function adjustForMobile() {
  const width = window.innerWidth;
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const items = carousel.querySelector('.carousel-items');
    
    // En dispositivos muy pequeños, ajustar el diseño
    if (width < 576) {
      // Ajustar ancho de los elementos según sea necesario
    }
  });
}

// Ejecutar al redimensionar la ventana
window.addEventListener('resize', adjustForMobile);

// Ejecutar una vez al cargar
adjustForMobile();

