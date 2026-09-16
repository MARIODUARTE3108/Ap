// Inicialização dos ícones Lucide
    lucide.createIcons();

    // 1. SISTEMA DE COPIAR TEXTOS (Wi-Fi, Portaria, etc.)
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent.trim();
        
        navigator.clipboard.writeText(text).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i data-lucide="check" style="width: 13px; height: 13px;"></i> Copiado!';
          btn.classList.add('copied');
          lucide.createIcons();
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
            lucide.createIcons();
          }, 1800);
        });
      });
    });

    // 2. SISTEMA DE ABAS DOS MANUAIS (TV, Ventilador, Máquina de Lavar)
    const tabButtons = document.querySelectorAll('.manual-tab-btn');
    const tabPanels = document.querySelectorAll('.manual-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById('tab-' + tabKey);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });

    // 3. SISTEMA DE CARROSSEL DE FOTOS POR AMBIENTE
    const carouselsState = {};

    function getCarouselState(carouselId) {
      if (!carouselsState[carouselId]) {
        carouselsState[carouselId] = 0;
      }
      return carouselsState[carouselId];
    }

    function updateCarouselUI(carouselId) {
      const carousel = document.getElementById(carouselId);
      if (!carousel) return;

      const track = carousel.querySelector('.carousel-track');
      const dots = carousel.querySelectorAll('.dot');
      const currentIndex = carouselsState[carouselId];

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function moveSlide(carouselId, step) {
      const carousel = document.getElementById(carouselId);
      const totalSlides = carousel.querySelectorAll('.carousel-slide').length;
      let current = getCarouselState(carouselId) + step;

      if (current < 0) current = totalSlides - 1;
      if (current >= totalSlides) current = 0;

      carouselsState[carouselId] = current;
      updateCarouselUI(carouselId);
    }

    function setSlide(carouselId, index) {
      carouselsState[carouselId] = index;
      updateCarouselUI(carouselId);
    }

    // Suporte a swipe de toque nos carrosséis
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
      let touchStartX = 0;
      let touchEndX = 0;

      wrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});

      wrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          moveSlide(wrapper.id, 1);
        } else if (touchEndX - touchStartX > 50) {
          moveSlide(wrapper.id, -1);
        }
      }, {passive: true});
    });

    // 4. ACCORDIONS EXPANSÍVEIS
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = item.querySelector('.accordion-body');
        const isActive = item.classList.contains('active');

        if (isActive) {
          body.style.maxHeight = '0px';
          item.classList.remove('active');
        } else {
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
          item.classList.add('active');
        }
      });
    });