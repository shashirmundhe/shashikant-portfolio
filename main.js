/* ============================================================
   Shashikant Mundhe — Portfolio JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PAGE LOADER ---------- */
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('loaded'), 600);
  });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link, input, textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const nav = document.getElementById('mainNav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav);

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const navLinks = document.querySelectorAll('.nav-pill');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));
  const setActiveLink = () => {
    let current = sections[0];
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(sec => {
      if (sec && sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      link.classList.toggle('active', target === current);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  /* close mobile nav on link click */
  const navMenu = document.getElementById('navMenu');
  navLinks.forEach(link => link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  }));

  /* ---------- TYPED ROLE TEXT ---------- */
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const roles = [
      'Salesforce Developer',
      'Salesforce Administrator',
      'Apex & LWC Engineer',
      'CRM Automation Expert'
    ];
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(typeLoop, 1500);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 80);
    }
    typeLoop();
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- STAT COUNTERS ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target; return; }
          el.textContent = current;
          requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- SKILL BARS ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        const width = entry.target.dataset.width;
        requestAnimationFrame(() => { fill.style.width = `${width}%`; });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(el => skillObserver.observe(el));

  /* ---------- SKILL CARD MOUSE GLOW ---------- */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- BACK TO TOP ---------- */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 600);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- CONTACT FORM (demo only) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btnText = document.getElementById('btnText');
      const btnLoader = document.getElementById('btnLoader');
      const formMsg = document.getElementById('formMsg');

      btnText.style.display = 'none';
      btnLoader.style.display = 'inline-flex';

      setTimeout(() => {
        btnText.style.display = 'inline-flex';
        btnLoader.style.display = 'none';
        formMsg.style.display = 'block';
        formMsg.className = 'form-message mt-3 success';
        formMsg.textContent = 'Thanks for reaching out! Shashikant will get back to you soon.';
        form.reset();
        setTimeout(() => { formMsg.style.display = 'none'; }, 4000);
      }, 1100);
    });
  }

  /* ---------- HERO PARTICLE NETWORK ---------- */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, nodes = [];
    const colors = ['rgba(255,201,60,', 'rgba(94,200,242,', 'rgba(92,224,176,'];

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = Math.min(70, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + '0.85)';
        ctx.fill();
      });
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(148,163,184,${0.12 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener('resize', () => resize());
  }

});