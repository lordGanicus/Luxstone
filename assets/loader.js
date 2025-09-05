(function () {
  // Partículas muy sutiles
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 8;
    particle.style.animation = `floatSubtle ${duration}s infinite ease-in-out`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }

  // Carga rápida y natural
  let percentage = 0;
  const percentageElement = document.getElementById("percentage");
  const progressBar = document.getElementById("progressBar");
  const loadingMessages = [
    "Cargando...",
    "Preparando contenido...",
    "Organizando información...",
    "Casi listo...",
  ];
  const loadingText = document.querySelector(".loading-text");

  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[messageIndex];
  }, 1500);

  const percentageInterval = setInterval(() => {
    percentage += Math.random() * 4 + 2;
    if (percentage > 100) percentage = 100;

    percentageElement.textContent = `${Math.floor(percentage)}%`;
    progressBar.style.width = `${percentage}%`;

    if (percentage >= 100) {
      clearInterval(percentageInterval);
      clearInterval(messageInterval);

      setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        const welcomeScreen = document.getElementById("welcomeScreen");
        welcomeScreen.style.display = "flex";

        const welcomeText = document.querySelector(".welcome-text");
        const welcomeSubtext = document.querySelector(".welcome-subtext");

        welcomeText.style.animation = "fadeInUp 0.8s forwards 0.2s";
        welcomeSubtext.style.animation = "fadeInUp 0.8s forwards 0.5s";

        setTimeout(() => {
          welcomeScreen.style.transition = "opacity 0.8s ease";
          welcomeScreen.style.opacity = "0";

          setTimeout(() => {
            welcomeScreen.style.display = "none";
            document.body.style.overflow = "auto";
          }, 800);
        }, 2000);
      }, 200);
    }
  }, 25);
})();
