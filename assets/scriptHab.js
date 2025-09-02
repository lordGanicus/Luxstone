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
  const menuButton = document.querySelector(".hero-menu");
  const closeButton = document.querySelector(".hamburger-close");
  const modal = document.querySelector(".hamburger-modal");
  const navItems = document.querySelectorAll(".hamburger-nav-item");
  const navLinks = document.querySelectorAll(".hamburger-nav-link");
  const lineMarker = document.querySelector(".hamburger-line-marker");

  menuButton.addEventListener("click", function () {
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    modal.classList.remove("visible");
    document.body.style.overflow = "auto";
  });

  // Hover effect for menu items - CORREGIDO
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const parentItem = this.parentElement;
      const index = Array.from(navItems).indexOf(parentItem);
      const position = index * 50; // Altura aproximada de cada elemento

      lineMarker.style.top = `${position}px`;
    });
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("visible");
      document.body.style.overflow = "auto";
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHamburgerModal();

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
/*******************************************Habitacioens/ Todas las habitacioens ******************************************/
// Variables globales
let currentSlide = {};
let swipers = {};

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeModals();
  initializeSwiperSliders();
  setupModalScrollEffects();
});

// Animaciones de entrada
function initializeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          section.classList.add("animate");

          // Animar elementos individualmente
          setTimeout(() => {
            const rooms = section.querySelectorAll(".habInfo-room");
            rooms.forEach((room, index) => {
              setTimeout(() => {
                room.classList.add("animate");
              }, index * 200);
            });
          }, 300);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const section = document.getElementById("habInfo-section");
  if (section) {
    observer.observe(section);
  }
}

// Inicializar modales
function initializeModals() {
  // Agregar event listeners para abrir modales
  document.querySelectorAll(".habInfo-room").forEach((room) => {
    room.addEventListener("click", function () {
      const roomType = this.getAttribute("data-room");
      const modal = document.getElementById(`habModal-${roomType}`);
      if (modal) {
        openModal(modal);
      }
    });
  });

  // Agregar event listeners para cerrar modales
  document.querySelectorAll(".habModal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".habModal-overlay");
      closeModal(modal);
    });
  });

  // Cerrar modal al hacer clic en el overlay
  document.querySelectorAll(".habModal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".habModal-overlay.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

// Inicializar sliders Swiper
function initializeSwiperSliders() {
  document.querySelectorAll(".habModal-overlay").forEach((modal) => {
    const roomType = modal.id.replace("habModal-", "");
    const swiperEl = modal.querySelector(".swiper");

    swipers[roomType] = new Swiper(swiperEl, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}

// Configurar efectos de scroll en modales
function setupModalScrollEffects() {
  document.querySelectorAll(".habModal-body").forEach((body) => {
    body.addEventListener("scroll", function () {
      const modalContent = this.closest(".habModal-content");
      if (this.scrollTop > 20) {
        modalContent.classList.add("scrolled");
      } else {
        modalContent.classList.remove("scrolled");
      }
    });
  });
}

// Funciones de modal
function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Inicializar swiper para este modal si no está inicializado
  const roomType = modal.id.replace("habModal-", "");
  if (!swipers[roomType]) {
    const swiperEl = modal.querySelector(".swiper");
    swipers[roomType] = new Swiper(swiperEl, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // Resetear estado de scroll
  const modalContent = modal.querySelector(".habModal-content");
  modalContent.classList.remove("scrolled");

  // Efecto de entrada suave
  setTimeout(() => {
    modal.style.backdropFilter = "blur(5px)";
  }, 100);
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  modal.style.backdropFilter = "none";
}

// Preload de imágenes del modal para mejor performance
function preloadModalImages() {
  const modalImages = [
    "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877469/suite-junior-04_fva2hx.webp",
    "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877463/suite-junior-03_itphi8.webp",
    "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877452/hab-matrimonial-02_1_nbupt8.webp",
    "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755877455/hab-matrimonial-03_vyqzbe.webp",
  ];

  modalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Inicializar efectos adicionales
document.addEventListener("DOMContentLoaded", function () {
  preloadModalImages();
});

// Smooth scroll para mejor UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
