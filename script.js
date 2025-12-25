/* script.js - hamburger, carousel, and reveal-on-scroll */
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger && hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    // animate hamburger lines
    hamburger.classList.toggle("open");
  });

  // Simple Carousel (supports prev/next + auto-play)
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let idx = 0;
  const total = items.length;
  let carouselWidth = carouselInner ? carouselInner.clientWidth : 0;

  function goTo(i) {
    idx = (i + total) % total;
    if (carouselInner) {
      carouselInner.style.transform = `translateX(-${idx * 100}%)`;
    }
  }
  // controls
  prevBtn && prevBtn.addEventListener("click", () => goTo(idx - 1));
  nextBtn && nextBtn.addEventListener("click", () => goTo(idx + 1));

  // autoplay
  let autoplay = setInterval(() => goTo(idx + 1), 5000);
  // pause on hover
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
    carousel.addEventListener("mouseleave", () => autoplay = setInterval(() => goTo(idx + 1), 5000));
  }

  // Resize handler to keep correct transform (if layout changes)
  window.addEventListener("resize", () => {
    // force reapply transform
    goTo(idx);
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll(".reveal, .card, .company-into, footer");
  const obsOptions = { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("active");
      }
    });
  }, obsOptions);
  reveals.forEach(el => {
    observer.observe(el);
  });

  // Close mobile menu when clicking a nav link (helpful UX)
  document.querySelectorAll("#nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) navLinks.classList.remove("show");
    });
  });

  // Accessibility: keyboard support for carousel arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(idx - 1);
    if (e.key === 'ArrowRight') goTo(idx + 1);
  });

});
