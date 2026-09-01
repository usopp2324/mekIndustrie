/**
 * Reveal Animations - Intersection Observer
 * Adds 'is-visible' class to elements when they come into view
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration for Intersection Observer
  const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add is-visible class to trigger animation
        entry.target.classList.add('is-visible');
        // Optional: Stop observing this element after it's visible
        // observer.unobserve(entry.target);
      }
    });
  }, observerConfig);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-contact');
  revealElements.forEach(element => {
    observer.observe(element);
  });
});

/**
 * Hero Slider - Auto-advance slides
 */
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('[data-direction="prev"]');
  const nextBtn = document.querySelector('[data-direction="next"]');
  const slides = document.querySelectorAll('.slide');
  const heroTitle = document.querySelector('.hero-content h1');
  const heroCopy = document.querySelector('.hero-content .hero-copy');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  const showSlide = (index) => {
    const activeSlide = slides[index];
    if (!activeSlide) return;

    // Update slides
    slides.forEach(slide => slide.classList.remove('active'));
    activeSlide.classList.add('active');

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');

    // Update hero text with smooth motion
    if (heroTitle && heroCopy) {
      const title = activeSlide.dataset.title || heroTitle.textContent;
      const description = activeSlide.dataset.description || heroCopy.textContent;

      heroTitle.classList.remove('animate-in');
      heroCopy.classList.remove('animate-in');
      void heroTitle.offsetWidth;
      void heroCopy.offsetWidth;

      heroTitle.textContent = title;
      heroCopy.textContent = description;
      heroTitle.classList.add('animate-in');
      heroCopy.classList.add('animate-in');
    }

    currentIndex = index;
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  };

  // Start autoplay
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });

  // Start autoplay on load
  startAutoplay();
});

/**
 * Header scroll effect
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  if (navToggle && mainNav) {
    const closeMenu = () => {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });
  }
});

/**
 * Form submission handler
 */
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.contact-form-large, .contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        // Send to server (you'll need a backend endpoint)
        const response = await fetch('/contact/submit/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value || ''
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          // Show success message
          alert('Merci! Nous avons bien reçu votre message. Nous vous recontacterons sous 48h.');
          form.reset();
        } else {
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  });
});
