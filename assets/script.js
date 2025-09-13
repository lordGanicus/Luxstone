class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".hero-slide");
    this.totalSlides = this.slides.length;
    this.progressFill = document.querySelector(".hero-progress-fill");
    this.diamonds = document.querySelectorAll(".hero-diamond");
    this.isTransitioning = false;

    // Progress circle calculation
    this.circumference = 2 * Math.PI * 280; // radius = 280
    this.segmentLength = this.circumference / this.totalSlides;

    this.init();
  }

  init() {
    // Initialize progress circle
    this.progressFill.style.strokeDasharray = this.circumference;
    this.progressFill.style.strokeDashoffset = this.circumference;

    // Event listeners
    document
      .querySelector(".hero-nav-next")
      .addEventListener("click", () => this.nextSlide());
    document
      .querySelector(".hero-nav-prev")
      .addEventListener("click", () => this.prevSlide());

    // Auto-advance slider
    this.startAutoSlide();

    // Initial progress update
    setTimeout(() => {
      this.updateProgress();
    }, 100);
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const currentSlideEl = this.slides[this.currentSlide];
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    const nextSlideEl = this.slides[this.currentSlide];

    // Slide transition
    currentSlideEl.classList.remove("active");
    nextSlideEl.classList.add("next");

    setTimeout(() => {
      nextSlideEl.classList.remove("next");
      nextSlideEl.classList.add("active");
      this.isTransitioning = false;
    }, 800);

    this.updateProgress();
    this.resetAutoSlide();
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const currentSlideEl = this.slides[this.currentSlide];
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    const prevSlideEl = this.slides[this.currentSlide];

    // Slide transition
    currentSlideEl.classList.remove("active");
    prevSlideEl.classList.add("active");

    setTimeout(() => {
      this.isTransitioning = false;
    }, 800);

    this.updateProgress();
    this.resetAutoSlide();
  }

  updateProgress() {
    // Calculate progress offset
    const progress = (this.currentSlide + 1) / this.totalSlides;
    const offset = this.circumference - progress * this.circumference;

    this.progressFill.style.strokeDashoffset = offset;

    // Update diamonds
    this.diamonds.forEach((diamond, index) => {
      if (index <= this.currentSlide) {
        diamond.classList.add("active");
      } else {
        diamond.classList.remove("active");
      }
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}

// Header scroll functionality
function initHeader() {
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100 && scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("visible");
    } else if (scrollTop < lastScrollTop && scrollTop < 50) {
      // Scrolling up at the top
      header.classList.remove("visible");
    }

    lastScrollTop = scrollTop;
  });
}

// Hamburger modal functionality - CORREGIDO
function initHamburgerModal() {
  const menuButtons = document.querySelectorAll(".hero-menu"); // AHORA selecciona TODOS los botones
  const closeButton = document.querySelector(".hamburger-close");
  const modal = document.querySelector(".hamburger-modal");
  const navItems = document.querySelectorAll(".hamburger-nav-item");
  const navLinks = document.querySelectorAll(".hamburger-nav-link");
  const lineMarker = document.querySelector(".hamburger-line-marker");

  // Abrir modal con cualquiera de los botones
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.classList.add("visible");
      document.body.style.overflow = "hidden";
    });
  });

  // Cerrar modal con el botón de cerrar
  closeButton.addEventListener("click", function () {
    modal.classList.remove("visible");
    document.body.style.overflow = "auto";
  });

  // Hover effect para los items del menú
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const parentItem = this.parentElement;
      const index = Array.from(navItems).indexOf(parentItem);
      const position = index * 65; // Altura aproximada de cada elemento

      lineMarker.style.top = `${position}px`;
    });
  });

  // Cerrar modal al hacer click fuera del contenido
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("visible");
      document.body.style.overflow = "auto";
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider();
  initHeader();
  initHamburgerModal();

  // Reserva button functionality
  document.querySelector(".hero-reserva-btn").addEventListener("click", () => {
    alert("Redirigiendo a reservas...");
  });

  // Header reserva button functionality
  document
    .querySelector(".header-reserva-btn")
    .addEventListener("click", () => {
      alert("Redirigiendo a reservas...");
    });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
/*********************************Info ******************************/
// JavaScript para manejar el efecto hover en los elementos de servicio
document.querySelectorAll(".info-service-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    // Remover la clase active de todos los elementos
    document.querySelectorAll(".info-service-item").forEach((el) => {
      el.classList.remove("active");
    });

    // Agregar la clase active al elemento actual
    this.classList.add("active");
  });

  item.addEventListener("mouseleave", function () {
    // Remover la clase active después de un breve retraso
    setTimeout(() => {
      if (!this.matches(":hover")) {
        this.classList.remove("active");
      }
    }, 100);
  });
});
/*********************************Hab-info********************************/
class HabitacionesSlider {
  constructor() {
    this.currentSlide = "suite";
    this.autoSlideInterval = null;
    this.isScrolling = false;

    this.images = {
      suite:
        "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877467/hab-matrimonial-01_3_xavs84.webp",
      business:
        "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877494/suite-matrimonial-_1_jjlthr.webp",
    };

    this.init();
  }

  init() {
    this.setupElements();
    this.setupScrollEffect();
    this.setupSlider();
    this.setInitialImage();
    this.startAutoSlide();
  }

  setupElements() {
    this.section = document.getElementById("hab-section");
    this.background = document.getElementById("hab-bg");
    this.tabs = document.querySelectorAll(".hab-tab");
  }

  setupScrollEffect() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.section.classList.add("loaded");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section);

    window.addEventListener("scroll", () => {
      if (this.isScrolling) return;
      this.isScrolling = true;

      requestAnimationFrame(() => {
        this.handleScrollResize();
        this.isScrolling = false;
      });
    });
  }

  handleScrollResize() {
    const rect = this.section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcular el progreso del scroll cuando la sección está visible
    let progress = 0;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // La sección está en viewport
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const sectionHeight = rect.height;
      progress = Math.min(visibleHeight / sectionHeight, 1);
    }

    // Interpolar entre 70% y 100% basado en el progreso
    const startWidth = 70;
    const endWidth = 100;
    const currentWidth = startWidth + (endWidth - startWidth) * progress;

    this.background.style.width = `${Math.min(currentWidth, 100)}%`;
  }

  setupSlider() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const slideType = tab.dataset.type;
        if (slideType !== this.currentSlide) {
          this.changeSlide(slideType);
          this.resetAutoSlide();
        }
      });
    });
  }

  setInitialImage() {
    this.background.style.backgroundImage = `url(${
      this.images[this.currentSlide]
    })`;
  }

  changeSlide(slideType) {
    // Actualizar estado actual
    this.currentSlide = slideType;

    // Actualizar tabs activos
    this.tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.type === slideType);
    });

    // Cambiar imagen de fondo con transición suave
    this.background.style.backgroundImage = `url(${this.images[slideType]})`;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      const nextSlide = this.currentSlide === "suite" ? "business" : "suite";
      this.changeSlide(nextSlide);
    }, 4000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new HabitacionesSlider();
});

// Manejar redimensionamiento de ventana
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-calcular el efecto de scroll en resize
    const event = new Event("scroll");
    window.dispatchEvent(event);
  }, 100);
});
/***************************Servicios**************************/
// Mejora para dispositivos táctiles
document.addEventListener("DOMContentLoaded", function () {
  const serviciosItems = document.querySelectorAll(".servicios-item");
  let activeItem = null;

  // Para dispositivos táctiles
  serviciosItems.forEach((item) => {
    item.addEventListener("touchstart", function () {
      if (activeItem) {
        activeItem.classList.remove("hover");
      }
      this.classList.add("hover");
      activeItem = this;
    });
  });

  document.addEventListener("touchstart", function (e) {
    if (!e.target.closest(".servicios-item") && activeItem) {
      activeItem.classList.remove("hover");
      activeItem = null;
    }
  });

  // Para mouse
  serviciosItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("hover");
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });
});
/********************************Seccion paquetes*******************************/
document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".paquetes-card");

  // Función para verificar si el elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }

  // Función para manejar el efecto de scroll
  function handleScroll() {
    if (isInViewport(card)) {
      card.classList.add("visible");
    } else {
      // Opcional: remover la clase si quieres que la animación se repita al hacer scroll
      // card.classList.remove('visible');
    }
  }

  // Verificar al cargar la página
  handleScroll();

  // Verificar al hacer scroll
  window.addEventListener("scroll", handleScroll);
});
/****************************Seccion de turismo de la pagina web*************************/
// Variables para los sliders
const turismoSliders = {
  turismo: { currentSlide: 0, totalSlides: 3 },
  restaurantes: { currentSlide: 0, totalSlides: 3 },
};

// Intersection Observer para animaciones de entrada
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observar elementos para animación
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".turismo-header");
  const cards = document.querySelectorAll(".turismo-card");

  if (header) observer.observe(header);
  cards.forEach((card) => observer.observe(card));
});

// Función para abrir modal
function openModal(modalType) {
  const modal = document.getElementById(`turismo-modal-${modalType}`);
  if (!modal) return;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Función para cerrar modal
function closeModal() {
  const modals = document.querySelectorAll(".turismo-modal");
  modals.forEach((modal) => {
    modal.classList.remove("show");
  });
  document.body.style.overflow = "auto";
}

// Función para mover slider (con guards y totalSlides dinámico)
function moveSlider(sliderType, direction) {
  const sliderState = turismoSliders[sliderType];
  const sliderElement = document.getElementById(`turismo-slider-${sliderType}`);
  if (!sliderState || !sliderElement) return;

  // actualizar totalSlides dinámicamente
  const slidesCount = sliderElement.querySelectorAll(".turismo-slide").length;
  if (slidesCount > 0) sliderState.totalSlides = slidesCount;

  if (direction === "next") {
    sliderState.currentSlide =
      (sliderState.currentSlide + 1) % sliderState.totalSlides;
  } else {
    sliderState.currentSlide =
      sliderState.currentSlide === 0
        ? sliderState.totalSlides - 1
        : sliderState.currentSlide - 1;
  }

  const perSlide = 100 / sliderState.totalSlides; // porcentaje por slide
  const translateX = -sliderState.currentSlide * perSlide;
  sliderElement.style.transform = `translateX(${translateX}%)`;

  // Actualizar dots
  const dots = document.querySelectorAll(
    `[data-slider="${sliderType}"] .turismo-dot`
  );
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === sliderState.currentSlide);
  });
}

// Función para ir a slide específico
function goToSlide(sliderType, slideIndex) {
  const sliderState = turismoSliders[sliderType];
  const sliderElement = document.getElementById(`turismo-slider-${sliderType}`);
  if (!sliderState || !sliderElement) return;

  const slidesCount = sliderElement.querySelectorAll(".turismo-slide").length;
  if (slidesCount > 0) sliderState.totalSlides = slidesCount;

  sliderState.currentSlide = Math.max(
    0,
    Math.min(slideIndex, sliderState.totalSlides - 1)
  );
  const perSlide = 100 / sliderState.totalSlides;
  const translateX = -sliderState.currentSlide * perSlide;
  sliderElement.style.transform = `translateX(${translateX}%)`;

  const dots = document.querySelectorAll(
    `[data-slider="${sliderType}"] .turismo-dot`
  );
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === sliderState.currentSlide);
  });
}

// Agregar soporte táctil y pointer (swipe)
// sliderElement: el elemento .turismo-slider
function addSwipeSupport(sliderElement) {
  let startX = 0;
  let isPointerDown = false;

  const getSliderType = () =>
    sliderElement.getAttribute("data-slider") ||
    (sliderElement.id ? sliderElement.id.replace("turismo-slider-", "") : null);

  function handleSwipe(start, end) {
    const diff = end - start;
    const abs = Math.abs(diff);
    const threshold = 40; // px mínimo para considerar swipe

    if (abs > threshold) {
      const sliderType = getSliderType();
      if (!sliderType || !turismoSliders[sliderType]) return;
      if (diff > 0) moveSlider(sliderType, "prev");
      else moveSlider(sliderType, "next");
    }
  }

  // Touch events
  sliderElement.addEventListener(
    "touchstart",
    (e) => {
      if (!e.touches || e.touches.length === 0) return;
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  sliderElement.addEventListener(
    "touchend",
    (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const endX = e.changedTouches[0].clientX;
      handleSwipe(startX, endX);
    },
    { passive: true }
  );

  // Pointer events (soporta mouse drag/trackpad)
  sliderElement.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    startX = e.clientX;
    try {
      sliderElement.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  sliderElement.addEventListener("pointerup", (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const endX = e.clientX;
    try {
      sliderElement.releasePointerCapture(e.pointerId);
    } catch (err) {}
    handleSwipe(startX, endX);
  });

  // Limpieza por si el pointer se cancela
  sliderElement.addEventListener("pointercancel", () => {
    isPointerDown = false;
  });
}

// Event listeners (DOMContentLoaded principal)
document.addEventListener("DOMContentLoaded", function () {
  // Click en cards para abrir modal
  document.querySelectorAll(".turismo-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      const modalType = this.getAttribute("data-modal");
      openModal(modalType);
    });
  });

  // Click en botones de cerrar
  document.querySelectorAll(".turismo-close").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // Click en overlay para cerrar
  document.querySelectorAll(".turismo-modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });
  });

  // Botones de navegación del slider
  document.querySelectorAll(".turismo-prev").forEach((btn) => {
    btn.addEventListener("click", function () {
      const sliderType = this.getAttribute("data-slider");
      moveSlider(sliderType, "prev");
    });
  });

  document.querySelectorAll(".turismo-next").forEach((btn) => {
    btn.addEventListener("click", function () {
      const sliderType = this.getAttribute("data-slider");
      moveSlider(sliderType, "next");
    });
  });

  // Dots de navegación
  document.querySelectorAll(".turismo-dot").forEach((dot) => {
    dot.addEventListener("click", function () {
      const sliderType = this.getAttribute("data-slider");
      const slideIndex = parseInt(this.getAttribute("data-slide"), 10);
      goToSlide(sliderType, slideIndex);
    });
  });

  // Cerrar modal con ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Navegación con teclado en sliders
  document.addEventListener("keydown", function (e) {
    const activeModal = document.querySelector(".turismo-modal.show");
    if (activeModal) {
      const modalId = activeModal.id;
      const sliderType = modalId.replace("turismo-modal-", "");

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveSlider(sliderType, "prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveSlider(sliderType, "next");
      }
    }
  });

  // Añadir soporte swipe a todos los sliders (y fallback para data-slider desde el id)
  document.querySelectorAll(".turismo-slider").forEach((sliderEl) => {
    if (!sliderEl.getAttribute("data-slider") && sliderEl.id) {
      sliderEl.setAttribute(
        "data-slider",
        sliderEl.id.replace("turismo-slider-", "")
      );
    }
    addSwipeSupport(sliderEl);
  });
});

// Auto-slide (opcional)
setInterval(() => {
  const activeModal = document.querySelector(".turismo-modal.show");
  if (activeModal) {
    const modalId = activeModal.id;
    const sliderType = modalId.replace("turismo-modal-", "");
    moveSlider(sliderType, "next");
  }
}, 5000);

/*********************Ubicacion********************/
// Función para detectar cuando los elementos entran en viewport
function ubi_observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observar todos los elementos animados
  document
    .querySelectorAll(
      ".ubi-title, .ubi-description, .ubi-feature, .ubi-map-section, .ubi-map-overlay"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Efectos adicionales de interactividad
function ubi_addInteractivity() {
  const features = document.querySelectorAll(".ubi-feature");

  features.forEach((feature) => {
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    // Efecto de click con onda
    feature.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ubi-ripple 0.6s ease-out;
                        pointer-events: none;
                    `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Animación de ripple
const style = document.createElement("style");
style.textContent = `
            @keyframes ubi-ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  ubi_observeElements();
  ubi_addInteractivity();
});

/*// Efecto de parallax sutil en el scroll
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".ubi-hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});*/
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".ubi-features");
  if (!slider) return;

  const items = Array.from(slider.querySelectorAll(".ubi-feature"));
  if (items.length === 0) return;

  // calcular posiciones centradas
  let centers = [];
  const calcCenters = () => {
    centers = items.map((item) => {
      return item.offsetLeft + item.offsetWidth / 2 - slider.clientWidth / 2;
    });
  };

  // centrar en el medio al inicio
  const middleIndex = Math.floor(items.length / 2);
  const centerInitial = () => {
    if (!centers.length) calcCenters();
    slider.scrollLeft = centers[middleIndex] || 0;
  };

  window.addEventListener("load", () => {
    calcCenters();
    centerInitial();
  });
  window.addEventListener("resize", () => {
    calcCenters();
  });
  setTimeout(() => {
    calcCenters();
    centerInitial();
  }, 100);

  let prevScrollLeft = slider.scrollLeft;
  let lastDirection = null;
  let scrollEndTimer = null;
  let isTeleporting = false;

  slider.addEventListener("scroll", () => {
    if (isTeleporting) return;
    const cur = slider.scrollLeft;
    const delta = cur - prevScrollLeft;
    lastDirection = delta > 0 ? "right" : delta < 0 ? "left" : lastDirection;
    prevScrollLeft = cur;

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(onScrollEnd, 120);
  });

  function onScrollEnd() {
    if (!centers.length) calcCenters();

    // buscar el índice más cercano
    let nearestIdx = 0;
    let bestDiff = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(slider.scrollLeft - c);
      if (d < bestDiff) {
        bestDiff = d;
        nearestIdx = i;
      }
    });

    // caso: empujo más allá del último
    if (nearestIdx === items.length - 1 && lastDirection === "right") {
      teleportToIndex(0);
      return;
    }

    // caso: empujo más allá del primero
    if (nearestIdx === 0 && lastDirection === "left") {
      teleportToIndex(items.length - 1);
      return;
    }

    // snap normal
    slider.scrollTo({ left: centers[nearestIdx], behavior: "smooth" });
  }

  function teleportToIndex(index) {
    isTeleporting = true;
    slider.scrollLeft = centers[index];
    setTimeout(() => {
      isTeleporting = false;
      prevScrollLeft = slider.scrollLeft;
    }, 60);
  }
});
