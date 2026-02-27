(() => {
  const body = document.body;
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navPanel = document.querySelector('[data-nav-panel]');

  function closeNav() {
    body.classList.remove('nav-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function openNav() {
    body.classList.add('nav-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', () => {
      if (body.classList.contains('nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    navPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (event) => {
      if (!body.classList.contains('nav-open')) return;
      const clickedInsidePanel = navPanel.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);
      if (!clickedInsidePanel && !clickedToggle) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const href = link.getAttribute('href');
      if (!href || link.target === '_blank') return;
      if (href.startsWith('http')) return;
      event.preventDefault();
      body.classList.add('page-transitioning');
      window.setTimeout(() => {
        window.location.href = href;
      }, 160);
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('active'));
  }

  const words = [
    'Delivering Precision.',
    'Creating Immersive Spaces.',
    'Shaping Architectural Stories.'
  ];
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeFrame = () => {
      const current = words[wordIndex];
      if (!deleting) {
        typedTarget.textContent = current.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === current.length) {
          deleting = true;
          window.setTimeout(typeFrame, 900);
          return;
        }
      } else {
        typedTarget.textContent = current.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      window.setTimeout(typeFrame, deleting ? 42 : 86);
    };

    typeFrame();
  }

  const preview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const previewClose = document.querySelector('[data-preview-close]');
  const previewCards = document.querySelectorAll('[data-preview-src]');

  function closePreview() {
    if (!preview) return;
    preview.classList.remove('active');
    body.classList.remove('nav-open');
  }

  function openPreview(src, alt) {
    if (!preview || !previewImg) return;
    previewImg.src = src;
    previewImg.alt = alt || 'Project preview';
    preview.classList.add('active');
  }

  previewCards.forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-preview-src');
      if (!src) return;
      openPreview(src, card.getAttribute('data-preview-alt'));
    });
  });

  if (previewClose) {
    previewClose.addEventListener('click', closePreview);
  }

  if (preview) {
    preview.addEventListener('click', (event) => {
      if (event.target === preview) closePreview();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePreview();
  });
})();
