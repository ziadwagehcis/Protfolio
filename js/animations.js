/**
 * ============================================================
 *  PORTFOLIO INTERACTIVE BEHAVIORS & ANIMATIONS
 * ============================================================
 *  
 *  - Scroll-triggered reveal animations (IntersectionObserver)
 *  - Animated typing effect for hero professional titles
 *  - Stat counter count-up animations
 *  - Navbar scroll effects (blur, shrink, active section spy)
 *  - Reading progress bar indicator
 *  - Dark / Light theme toggle with persistence
 *  - Smooth scrolling for anchor links with offset
 *  - Mobile slide-out navigation with focus management
 *  - Project category filtering with transition
 *  - Skill category filtering
 *  - Interactive Project Detail Modal with rich metadata
 *  - Fullscreen Image Lightbox with gallery navigation
 *  - Testimonials slider with touch swipe & autoplay
 *  - Contact form validation, loading state, mailto fallback
 *  - Copy email to clipboard with visual feedback
 *  - Toast notification system
 *  - Lightweight page loading transition
 *  
 * ============================================================
 */

/* ──────────────────────────────────────────────
 *  GLOBAL STATE & UTILITIES
 * ────────────────────────────────────────────── */

const AppState = {
  activeLightboxIndex: 0,
  lightboxImages: [],
  testimonialIndex: 0,
  testimonialTimer: null,
  isTestimonialPaused: false,
  previousActiveElement: null
};

/**
 * Checks if user prefers reduced motion
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Global Toast Notification function
 * @param {string} message - Text to display
 * @param {'success'|'error'|'info'} type - Toast variant
 * @param {number} duration - Milliseconds before auto dismiss
 */
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  } else {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) closeBtn.addEventListener('click', dismiss);

  setTimeout(dismiss, duration);
}

// Make showToast accessible globally
window.showToast = showToast;


/* ──────────────────────────────────────────────
 *  HERO PARTICLE BACKGROUND
 * ────────────────────────────────────────────── */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas || prefersReducedMotion()) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  let particles = [];
  let animationFrame = null;
  let isVisible = true;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const density = rect.width < 768 ? 22 : 38;
    particles = Array.from({ length: density }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      radius: Math.random() * 1.4 + 0.6,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22
    }));
  }

  function draw() {
    if (!isVisible) {
      animationFrame = null;
      return;
    }

    const rect = canvas.parentElement.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#B6F36B';

    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = accent;
      context.globalAlpha = 0.38;
      context.fill();
    });

    context.globalAlpha = 1;
    animationFrame = requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  const resizeObserver = 'ResizeObserver' in window
    ? new ResizeObserver(resizeCanvas)
    : null;
  if (resizeObserver) resizeObserver.observe(canvas.parentElement);
  else window.addEventListener('resize', resizeCanvas);

  const visibilityObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !animationFrame) draw();
      }, { threshold: 0 })
    : null;
  if (visibilityObserver) visibilityObserver.observe(canvas);

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationFrame) draw();
  });
}


/* ──────────────────────────────────────────────
 *  1. SCROLL-TRIGGERED REVEAL ANIMATIONS
 * ────────────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll, [data-animation]');

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    elements.forEach(el => {
      el.classList.add('animated');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => {
    // If element only has data-animation, ensure animate-on-scroll is also present
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    observer.observe(el);
  });
}


/* ──────────────────────────────────────────────
 *  2. TYPING ANIMATION (HERO)
 * ────────────────────────────────────────────── */
function initTypingAnimation() {
  const typingEl = document.getElementById('typing-container');
  if (!typingEl) return;

  const titles = (portfolioData.personal && portfolioData.personal.typedTitles) || [
    'Full Stack Developer'
  ];

  if (!titles || titles.length === 0) return;

  if (prefersReducedMotion()) {
    typingEl.textContent = titles[0];
    return;
  }

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeStep() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Finished typing current title — pause before deleting
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — switch to next title
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(typeStep, typingSpeed);
  }

  // Initial delay before start
  setTimeout(typeStep, 600);
}


/* ──────────────────────────────────────────────
 *  3. ANIMATED COUNTERS (ABOUT / STATS)
 * ────────────────────────────────────────────── */
function initCounters() {
  const counterEls = document.querySelectorAll('.counter[data-target]');
  if (counterEls.length === 0) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    counterEls.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target') || '0';
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-target')) || 0;
        animateCounter(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterEls.forEach(counter => observer.observe(counter));

  function animateCounter(el, target) {
    const duration = 1800;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = eased * target;

      el.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }
}


/* ──────────────────────────────────────────────
 *  4. NAVBAR SCROLL & ACTIVE SECTION SPY
 * ────────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('reading-progress');
  const backToTop = document.getElementById('back-to-top');

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Sticky scrolled state
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Reading progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 450) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once initially

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-section') || (link.getAttribute('href') || '').replace('#', '');
            if (linkTarget === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(s => sectionObserver.observe(s));
  }
}


/* ──────────────────────────────────────────────
 *  5. SMOOTH SCROLLING (OFFSET AWARE)
 * ────────────────────────────────────────────── */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    const targetEl = document.querySelector(href);
    if (!targetEl) return;

    e.preventDefault();

    // Close mobile menu if open
    closeMobileMenu();

    const navbar = document.getElementById('navbar');
    const navOffset = navbar ? navbar.offsetHeight + 16 : 80;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });

    // Update URL hash safely without jump
    if (history.pushState) {
      history.pushState(null, null, href);
    }
  });
}


/* ──────────────────────────────────────────────
 *  6. THEME SWITCHER (DARK / LIGHT)
 * ────────────────────────────────────────────── */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle');

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggles.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0C1110' : '#F7F9F5');
    }
  }

  // Determine initial theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  updateThemeUI(currentTheme);

  // Toggle handler
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = active === 'dark' ? 'light' : 'dark';

      // Temporarily enable smooth theme transition
      document.documentElement.classList.add('theme-transition');
      updateThemeUI(nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 550);
    });
  });

  // Listen to OS theme changes if user has not explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('portfolio-theme')) {
        updateThemeUI(e.matches ? 'dark' : 'light');
      }
    });
  }
}


/* ──────────────────────────────────────────────
 *  7. MOBILE NAVIGATION & BACKDROP
 * ────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  let mobileMenu = document.getElementById('mobile-menu');
  let overlay = document.getElementById('mobile-menu-overlay');

  if (!hamburger) return;

  // Ensure overlay exists in DOM
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
  }

  function toggleMenu() {
    // If mobile menu was rendered inside navbar, relocate or keep in sync
    mobileMenu = document.getElementById('mobile-menu');
    const isOpen = hamburger.classList.contains('active');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMobileMenu);

  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Close with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeModal();
      closeLightbox();
    }
  });
}

function openMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (hamburger) {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  if (mobileMenu) {
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }
  if (overlay) {
    overlay.classList.add('active');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}


/* ──────────────────────────────────────────────
 *  8. BACK TO TOP BUTTON
 * ────────────────────────────────────────────── */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}


/* ──────────────────────────────────────────────
 *  9. PROJECT CATEGORY FILTERING
 * ────────────────────────────────────────────── */
function initProjectFilter() {
  const container = document.getElementById('projects-content');
  if (!container) return;

  container.addEventListener('click', e => {
    const btn = e.target.closest('.project-filters .filter-btn');
    if (!btn) return;

    const filterVal = btn.getAttribute('data-filter');
    const filterButtons = container.querySelectorAll('.project-filters .filter-btn');
    const cards = container.querySelectorAll('.project-card');

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const matches = (filterVal === 'all' || filterVal === 'All Projects' || cardCategory === filterVal);

      if (matches) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.92)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
}


/* ──────────────────────────────────────────────
 *  10. SKILL CATEGORY FILTERING
 * ────────────────────────────────────────────── */
function initSkillFilter() {
  const container = document.getElementById('skills-content');
  if (!container) return;

  container.addEventListener('click', e => {
    const btn = e.target.closest('.skill-filters .filter-btn');
    if (!btn) return;

    const filterVal = btn.getAttribute('data-filter');
    const filterButtons = container.querySelectorAll('.skill-filters .filter-btn');
    const categoryContainers = container.querySelectorAll('.skill-category');

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    categoryContainers.forEach(group => {
      const groupId = group.getAttribute('data-category') || '';
      const matches = (filterVal === 'all' || groupId === filterVal);

      if (matches) {
        group.style.display = '';
        setTimeout(() => {
          group.style.opacity = '1';
          group.style.transform = 'translateY(0)';
        }, 10);
      } else {
        group.style.opacity = '0';
        group.style.transform = 'translateY(15px)';
        setTimeout(() => {
          group.style.display = 'none';
        }, 300);
      }
    });
  });
}


/* ──────────────────────────────────────────────
 *  11. PROJECT DETAIL MODAL
 * ────────────────────────────────────────────── */
function initProjectModal() {
  const projectsContainer = document.getElementById('projects-content');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');

  if (!projectsContainer || !modal || !modalBody) return;

  // Open modal on "View Details" or thumbnail click
  projectsContainer.addEventListener('click', e => {
    // If a direct external link was clicked, let it navigate
    if (e.target.closest('.project-link')) return;

    const trigger = e.target.closest('.project-details-btn, .project-thumbnail');
    if (!trigger) return;

    const indexAttr = trigger.getAttribute('data-project-index');
    if (indexAttr === null) return;
    const index = parseInt(indexAttr, 10);
    const projects = (portfolioData.projects && portfolioData.projects.items) || [];
    const proj = projects[index];
    if (!proj) return;

    AppState.previousActiveElement = document.activeElement;
    renderProjectModalContent(proj, modalBody);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    const closeBtn = modalBody.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  });

  // Close modal handlers
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('.modal-close') || e.target.classList.contains('project-modal-overlay')) {
      closeModal();
    }
  });
}

function renderProjectModalContent(proj, container) {
  const d = proj.details || {};
  const techPills = (proj.technologies || []).map(t => `<span class="tech-tag">${t}</span>`).join('');

  // Screenshot gallery inside modal
  let galleryHTML = '';
  if (proj.images && proj.images.length > 0) {
    galleryHTML = `
      <div class="project-modal-section">
        <h5>Project Gallery</h5>
        <div class="project-modal-gallery">
          ${proj.images.map((imgSrc, i) => `
            <img src="${imgSrc}" alt="${proj.name} screenshot ${i + 1}" class="lightbox-trigger" data-gallery="modal-project" data-full="${imgSrc}" loading="lazy" />
          `).join('')}
        </div>
      </div>
    `;
  } else if (proj.thumbnail) {
    galleryHTML = `
      <div class="project-modal-section">
        <div class="project-modal-gallery">
          <img src="${proj.thumbnail}" alt="${proj.name} preview" class="lightbox-trigger" data-full="${proj.thumbnail}" loading="lazy" />
        </div>
      </div>
    `;
  }

  // Features list
  let featuresHTML = '';
  if (d.features && d.features.length > 0) {
    featuresHTML = `
      <div class="project-modal-section">
        <h5>Key Features</h5>
        <ul>
          ${d.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Links
  const liveLink = proj.liveUrl
    ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
         Live Demo
       </a>`
    : '';

  const githubLink = proj.githubUrl
    ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
         Source Code
       </a>`
    : '';

  container.innerHTML = `
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="project-modal-header">
      <div class="project-modal-meta">
        ${proj.category ? `<span class="badge">${proj.category}</span>` : ''}
        ${proj.featured ? '<span class="badge featured-badge">Featured</span>' : ''}
      </div>
      <h3 class="project-modal-title">${proj.name || 'Project Details'}</h3>
      <p class="text-muted">${proj.shortDescription || ''}</p>
    </div>

    ${galleryHTML}

    ${d.overview ? `
      <div class="project-modal-section">
        <h5>Overview</h5>
        <p>${d.overview}</p>
      </div>` : ''}

    ${d.objective ? `
      <div class="project-modal-section">
        <h5>Project Objective</h5>
        <p>${d.objective}</p>
      </div>` : ''}

    ${d.problem ? `
      <div class="project-modal-section">
        <h5>Problem Statement</h5>
        <p>${d.problem}</p>
      </div>` : ''}

    ${d.role ? `
      <div class="project-modal-section">
        <h5>My Role</h5>
        <p>${d.role}</p>
      </div>` : ''}

    ${featuresHTML}

    ${d.implementation ? `
      <div class="project-modal-section">
        <h5>Technical Implementation</h5>
        <p>${d.implementation}</p>
      </div>` : ''}

    ${d.challenges ? `
      <div class="project-modal-section">
        <h5>Challenges & Solutions</h5>
        <p><strong>Challenges:</strong> ${d.challenges}</p>
        ${d.solutions ? `<p style="margin-top: 8px;"><strong>Solutions:</strong> ${d.solutions}</p>` : ''}
      </div>` : ''}

    ${d.results ? `
      <div class="project-modal-section">
        <h5>Results & Impact</h5>
        <p>${d.results}</p>
      </div>` : ''}

    <div class="project-modal-section">
      <h5>Technologies Used</h5>
      <div class="project-modal-tech">${techPills}</div>
    </div>

    ${(liveLink || githubLink) ? `
      <div class="project-modal-links">
        ${liveLink}
        ${githubLink}
      </div>` : ''}
  `;
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (!modal || !modal.classList.contains('active')) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (AppState.previousActiveElement) {
    AppState.previousActiveElement.focus();
    AppState.previousActiveElement = null;
  }
}


/* ──────────────────────────────────────────────
 *  12. FULLSCREEN IMAGE LIGHTBOX
 * ────────────────────────────────────────────── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Event delegation to catch clicks on any .lightbox-trigger
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (!trigger) return;

    const src = trigger.getAttribute('data-full') || trigger.getAttribute('src');
    if (!src) return;

    // Collect all gallery images if part of a gallery
    const galleryGroup = trigger.getAttribute('data-gallery');
    if (galleryGroup) {
      const allInGallery = document.querySelectorAll(`.lightbox-trigger[data-gallery="${galleryGroup}"]`);
      AppState.lightboxImages = Array.from(allInGallery).map(el => el.getAttribute('data-full') || el.getAttribute('src'));
      AppState.activeLightboxIndex = AppState.lightboxImages.indexOf(src);
    } else {
      AppState.lightboxImages = [src];
      AppState.activeLightboxIndex = 0;
    }

    openLightbox(src);
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    updateLightboxNav();
  }

  function updateLightboxNav() {
    const isMulti = AppState.lightboxImages.length > 1;
    if (prevBtn) prevBtn.style.display = isMulti ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = isMulti ? 'flex' : 'none';
  }

  function showNext() {
    if (AppState.lightboxImages.length <= 1) return;
    AppState.activeLightboxIndex = (AppState.activeLightboxIndex + 1) % AppState.lightboxImages.length;
    lightboxImg.src = AppState.lightboxImages[AppState.activeLightboxIndex];
  }

  function showPrev() {
    if (AppState.lightboxImages.length <= 1) return;
    AppState.activeLightboxIndex = (AppState.activeLightboxIndex - 1 + AppState.lightboxImages.length) % AppState.lightboxImages.length;
    lightboxImg.src = AppState.lightboxImages[AppState.activeLightboxIndex];
  }

  if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); showNext(); });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !lightbox.classList.contains('active')) return;

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');

  // Only restore overflow if project modal is NOT still open
  const projectModal = document.getElementById('project-modal');
  if (!projectModal || !projectModal.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}


/* ──────────────────────────────────────────────
 *  13. TESTIMONIAL SLIDER & TOUCH GESTURES
 * ────────────────────────────────────────────── */
function initTestimonialSlider() {
  const container = document.getElementById('testimonials-content');
  if (!container) return;

  const slides = container.querySelectorAll('.testimonial-slide');
  const dots = container.querySelectorAll('.testimonial-dot');
  const prevBtn = container.querySelector('.slider-prev');
  const nextBtn = container.querySelector('.slider-next');

  if (slides.length <= 1) return;

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    AppState.testimonialIndex = index;
  }

  function nextSlide() {
    const next = (AppState.testimonialIndex + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (AppState.testimonialIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
    });
  });

  // Autoplay with hover pause
  function startAutoplay() {
    stopAutoplay();
    AppState.testimonialTimer = setInterval(() => {
      if (!AppState.isTestimonialPaused) {
        nextSlide();
      }
    }, 6000);
  }

  function stopAutoplay() {
    if (AppState.testimonialTimer) {
      clearInterval(AppState.testimonialTimer);
      AppState.testimonialTimer = null;
    }
  }

  const sliderTrack = container.querySelector('.testimonial-slider') || container;
  sliderTrack.addEventListener('mouseenter', () => { AppState.isTestimonialPaused = true; });
  sliderTrack.addEventListener('mouseleave', () => { AppState.isTestimonialPaused = false; });
  sliderTrack.addEventListener('focusin', () => { AppState.isTestimonialPaused = true; });
  sliderTrack.addEventListener('focusout', () => { AppState.isTestimonialPaused = false; });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  startAutoplay();
}


/* ──────────────────────────────────────────────
 *  14. CONTACT FORM VALIDATION & SUBMISSION
 * ────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('form-submit');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    [nameInput, emailInput, messageInput].forEach(inp => {
      if (inp) inp.classList.remove('input-error');
    });
  }

  // Clear errors in real-time as user types
  [
    { input: nameInput, error: nameError },
    { input: emailInput, error: emailError },
    { input: messageInput, error: messageError }
  ].forEach(({ input, error }) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        if (error) error.textContent = '';
      });
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const nameVal = (nameInput ? nameInput.value : '').trim();
    const emailVal = (emailInput ? emailInput.value : '').trim();
    const subjectVal = (subjectInput ? subjectInput.value : '').trim();
    const messageVal = (messageInput ? messageInput.value : '').trim();

    // Validate Name
    if (!nameVal) {
      if (nameError) nameError.textContent = 'Please enter your name.';
      if (nameInput) nameInput.classList.add('input-error');
      isValid = false;
    }

    // Validate Email
    if (!emailVal) {
      if (emailError) emailError.textContent = 'Please enter your email address.';
      if (emailInput) emailInput.classList.add('input-error');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      if (emailInput) emailInput.classList.add('input-error');
      isValid = false;
    }

    // Validate Message
    if (!messageVal) {
      if (messageError) messageError.textContent = 'Please write a message.';
      if (messageInput) messageInput.classList.add('input-error');
      isValid = false;
    } else if (messageVal.length < 10) {
      if (messageError) messageError.textContent = 'Message should be at least 10 characters.';
      if (messageInput) messageInput.classList.add('input-error');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please correct the errors in the form.', 'error');
      return;
    }

    const endpoint = (portfolioData.contact && portfolioData.contact.formEndpoint) || '';
    const recipientEmail = (portfolioData.contact && portfolioData.contact.email) || '';

    // If an external endpoint is configured (Formspree, EmailJS, etc.)
    if (endpoint) {
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 0.8s linear infinite; display: inline-block; margin-right: 8px;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          Sending...
        `;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            subject: subjectVal || 'Portfolio Contact Form Message',
            message: messageVal
          })
        });

        if (response.ok) {
          form.reset();
          showToast('Thank you! Your message has been sent successfully.', 'success');
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (err) {
        showToast('Submission error. Opening your default email client...', 'info');
        fallbackToMailto(recipientEmail, nameVal, emailVal, subjectVal, messageVal);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    } else {
      // Functional email fallback using mailto link
      fallbackToMailto(recipientEmail, nameVal, emailVal, subjectVal, messageVal);
      showToast('Opening your email client to send the message...', 'info');
      form.reset();
    }
  });

  function fallbackToMailto(recipient, name, email, subject, message) {
    const targetEmail = recipient || 'contact@example.com';
    const emailSubject = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
    const emailBody = encodeURIComponent(`Hello,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`);
    const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
  }
}


/* ──────────────────────────────────────────────
 *  15. COPY EMAIL TO CLIPBOARD
 * ────────────────────────────────────────────── */
function initCopyEmail() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-email-btn');
    if (!btn) return;

    const email = btn.getAttribute('data-email');
    if (!email) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('Email address copied to clipboard!', 'success');
        })
        .catch(() => {
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showToast('Email address copied to clipboard!', 'success');
      } else {
        showToast(`Could not copy automatically: ${text}`, 'info');
      }
    } catch (err) {
      showToast(`Email address: ${text}`, 'info');
    }

    document.body.removeChild(textArea);
  }
}


/* ──────────────────────────────────────────────
 *  16. LIGHTWEIGHT LOADER TRANSITION
 * ────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function hide() {
    loader.classList.add('hidden');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 550);
  }

  // Smoothly hide loader after content is rendered
  if (document.readyState === 'complete') {
    requestAnimationFrame(hide);
  } else {
    window.addEventListener('load', () => {
      requestAnimationFrame(hide);
    });
    // Fallback safety timeout
    setTimeout(hide, 2000);
  }
}


/* ═══════════════════════════════════════════════
 *  17. MASTER ANIMATIONS INITIALIZATION
 * ═══════════════════════════════════════════════ */
function initAnimations() {
  initHeroParticles();
  initTheme();
  initNavbarScroll();
  initSmoothScroll();
  initMobileNav();
  initBackToTop();
  initTypingAnimation();
  initCounters();
  initScrollAnimations();
  initProjectFilter();
  initSkillFilter();
  initProjectModal();
  initLightbox();
  initTestimonialSlider();
  initContactForm();
  initCopyEmail();
  initLoader();
}

window.initAnimations = initAnimations;
