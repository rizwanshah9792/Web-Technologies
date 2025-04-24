// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Reveal animation with ScrollReveal
  ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 1000,
    delay: 200
  });
  
  ScrollReveal().reveal('.hero-text, .hero-img, .service-item, .project-item, .about-content, .contact', {
    origin: 'bottom'
  });
  