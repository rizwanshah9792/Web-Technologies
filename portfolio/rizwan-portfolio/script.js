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

ScrollReveal().reveal('.hero-text, .hero-img, .service-item, .project-item, .about-content, .contact, .newsletter', {
  origin: 'bottom'
});

// Typed.js for typing effect
if (document.querySelector("#typed-text")) {
  const typed = new Typed("#typed-text", {
    strings: ["Rizwan Shah", "A Web Developer", "A Problem Solver", "Python Enthusiast", "Tech Lover", "Tech Innovator"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    loop: true,
    cursorChar: '|',
    showCursor: true,
    autoInsertCss: true
  });
}
