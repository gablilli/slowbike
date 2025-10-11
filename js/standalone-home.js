/**
 * SlowBike Gubbio - Standalone Home Page JavaScript
 */

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active state to navigation based on current page
const currentPath = window.location.pathname;
document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPath || 
      (currentPath === '/' && link.getAttribute('href') === '/')) {
    link.style.color = '#1E9E3A';
    link.style.fontWeight = '700';
  }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  
  if (window.innerWidth <= 768) {
    // Mobile menu functionality could be added here
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log('SlowBike Gubbio - Standalone version loaded');
  createMobileMenu();
});

// Re-initialize on resize
window.addEventListener('resize', () => {
  createMobileMenu();
});

// Add fade-in animation to route cards on scroll
const observeCards = () => {
  const cards = document.querySelectorAll('.route-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    cardObserver.observe(card);
  });
};

// Initialize card animations
if ('IntersectionObserver' in window) {
  observeCards();
}
