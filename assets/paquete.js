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
      const position = index * 65; // Altura aproximada de cada elemento

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
/***********************Dentro de paquetes**********************/
// Variables globales
let currentSwiper = null;

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeModals();
  setupModalScrollEffects();

  // Agregar event listeners para los botones de reserva
  document.querySelectorAll(".pqt-reserve-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Aquí puedes agregar la lógica para reservar
      alert("Función de reserva pronto disponible");
    });
  });
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
            const items = section.querySelectorAll(".pqt-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate");
              }, index * 300);
            });
          }, 300);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const section = document.getElementById("pqt-section");
  if (section) {
    observer.observe(section);
  }
}

// Inicializar modales
function initializeModals() {
  // Agregar event listeners para abrir modales
  document.querySelectorAll(".pqt-detail-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modalType = this.getAttribute("data-modal");
      openModal(`pqt-modal-${modalType}`);
    });
  });

  // Agregar event listeners para cerrar modales
  document.querySelectorAll(".pqt-modal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".pqt-modal-overlay");
      closeModal(modal);
    });
  });

  // Cerrar modal al hacer clic en el overlay
  document.querySelectorAll(".pqt-modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".pqt-modal-overlay.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

// Configurar efectos de scroll en modales
function setupModalScrollEffects() {
  document.querySelectorAll(".pqt-modal-content").forEach((content) => {
    content.addEventListener("scroll", function () {
      const modal = this.closest(".pqt-modal");
      if (this.scrollTop > 20) {
        modal.classList.add("scrolled");
      } else {
        modal.classList.remove("scrolled");
      }
    });
  });
}

// Funciones de modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Inicializar swiper para este modal
    const roomType = modalId.replace("pqt-modal-", "");
    const swiperEl = modal.querySelector(".swiper");

    // Destruir swiper existente si hay uno
    if (currentSwiper) {
      currentSwiper.destroy(true, true);
    }

    currentSwiper = new Swiper(swiperEl, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });

    // Resetear estado de scroll
    const modalContent = modal.querySelector(".pqt-modal");
    modalContent.classList.remove("scrolled");
  }
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";

  // Destruir swiper al cerrar el modal
  if (currentSwiper) {
    currentSwiper.destroy(true, true);
    currentSwiper = null;
  }
}
