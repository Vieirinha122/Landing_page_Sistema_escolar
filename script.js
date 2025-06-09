const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const backgroundSlides = document.querySelectorAll(".background-slide");
let current = 0;

function goToSlide(i) {
  // Remove active class from all slides, dots, and background slides
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  backgroundSlides.forEach((bg) => bg.classList.remove("active"));

  // Add active class to current slide, dot, and background slide
  slides[i].classList.add("active");
  dots[i].classList.add("active");
  backgroundSlides[i].classList.add("active");

  current = i;
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goToSlide(i));
});

setInterval(() => {
  const next = (current + 1) % slides.length;
  goToSlide(next);
}, 4000);

// Initialize first slide
goToSlide(0);

// Contador regressivo (Escassez)
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  // Simula um countdown de 48 horas
  const now = new Date().getTime();
  const endTime = now + 48 * 60 * 60 * 1000; // 48 horas a partir de agora

  function updateTimer() {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;

    if (timeLeft > 0) {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      countdownElement.textContent = "00:00:00";
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Animação de números (Prova Social)
function animateNumbers() {
  const numbers = document.querySelectorAll(".proof-item .number");

  numbers.forEach((numberElement) => {
    const finalNumber = numberElement.textContent;
    const isPercentage = finalNumber.includes("%");
    const hasPlus = finalNumber.includes("+");
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ""));

    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 50);

    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= numericValue) {
        currentNumber = numericValue;
        clearInterval(timer);
      }

      let displayValue = currentNumber.toString();
      if (isPercentage) displayValue += "%";
      if (hasPlus && currentNumber >= numericValue) displayValue += "+";
      if (numericValue >= 1000) {
        displayValue = (currentNumber / 1000).toFixed(0) + "k";
        if (hasPlus && currentNumber >= numericValue) displayValue += "+";
      }

      numberElement.textContent = displayValue;
    }, 50);
  });
}

// Efeito de scroll suave para os números
function handleScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("social-proof-numbers")) {
            animateNumbers();
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  const socialProofSection = document.querySelector(".social-proof-numbers");
  if (socialProofSection) {
    observer.observe(socialProofSection);
  }
}

// Formulário de contato com validação
function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validação básica
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#dc2626";
        isValid = false;
      } else {
        field.style.borderColor = "#10b981";
      }
    });

    if (isValid) {
      // Simula envio do formulário
      const submitBtn = form.querySelector(".contact-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = "<span>Enviando...</span>";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML =
          '<span>✅ Enviado com sucesso!</span><span class="btn-subtext">Verifique seu e-mail</span>';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }, 2000);
    }
  });
}

// Efeitos de hover nos cards de preços
function setupPricingCards() {
  const pricingCards = document.querySelectorAll(".pricing-card");

  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("recommended-plan")) {
        card.style.transform = "scale(1.05)";
      } else {
        card.style.transform = "translateY(0) scale(1)";
      }
    });
  });
}

// Scroll suave para âncoras
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight + 60; // Inclui a barra de urgência
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  handleScrollAnimations();
  setupContactForm();
  setupPricingCards();
  setupSmoothScroll();

  // Adiciona classe para animações CSS quando elementos entram na viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observa elementos para animação de entrada
  document
    .querySelectorAll(".card, .testimonial-card, .pricing-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
});
