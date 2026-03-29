// ── SCROLL: Header shadow + back-to-top + active nav ──
const header = document.getElementById('header');
const topBtn = document.getElementById('topBtn');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Header shadow
  header.classList.toggle('scrolled', y > 30);

  // Back to top
  topBtn.classList.toggle('show', y > 400);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── BACK TO TOP ───────────────────────────────────
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── MOBILE NAV ────────────────────────────────────
function toggleNav() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ── INTERSECTION OBSERVER: fade-in animations ─────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Skill cards
document.querySelectorAll('.skill-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
  observer.observe(el);
});

// Project cards
document.querySelectorAll('.proj-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
  observer.observe(el);
});

// ── TYPEWRITER for role text ──────────────────────
const roles = [
  'Data Scientist & AI/ML Engineer',
  'Python Developer',
  'LLM Security Researcher',
  'Deep Learning Practitioner',
  'NLP Engineer'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const roleEl = document.getElementById('roleText');

function type() {
  if (!roleEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 75);
}
type();

// ── CONTACT FORM ──────────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('formBtn');
  btn.innerHTML = '✓ Message Sent! <i class="fas fa-check"></i>';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}

// ── DRAG & DROP PHOTO ─────────────────────────────
const photoCard = document.querySelector('.photo-card');
if (photoCard) {
  photoCard.addEventListener('dragover', e => {
    e.preventDefault();
    photoCard.style.borderColor = '#2563eb';
  });
  photoCard.addEventListener('dragleave', () => {
    photoCard.style.borderColor = '';
  });
  photoCard.addEventListener('drop', e => {
    e.preventDefault();
    photoCard.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      const empty = photoCard.querySelector('.photo-empty');
      if (empty) empty.remove();
      const existingImg = photoCard.querySelector('img');
      if (existingImg) existingImg.remove();
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Pranjali Chaudhari';
      photoCard.appendChild(img);
    }
  });
}