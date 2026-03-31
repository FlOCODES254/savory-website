/* ============================================================
   SAVORY BITES — script.js
   ============================================================ */

/* ── 1. Sticky nav + active section highlighting ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── 2. Smooth scroll ── */
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 3. Budget range slider live update ── */
const slider = document.getElementById('budget');
const badge  = document.getElementById('budgetVal');

if (slider && badge) {
  slider.addEventListener('input', () => {
    badge.textContent = '$' + slider.value;
  });
}

/* ── 4. Reservation form ── */
const resForm    = document.getElementById('reservationForm');
const resSuccess = document.getElementById('formSuccess');

if (resForm) {
  resForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name  = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const date  = document.getElementById('resdate').value;
    const time  = document.getElementById('restime').value;

    if (!name || !email || !date || !time) {
      alert('⚠️  Please fill in Name, Email, Date and Time.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('⚠️  Please enter a valid email address.');
      return;
    }

    const d = new Date(date + 'T00:00:00');
    const formatted = d.toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    resSuccess.style.display = 'block';
    resSuccess.textContent   =
      `✦  Thank you, ${name}! Your reservation for ${formatted} at ${time} has been confirmed. We will be in touch shortly.`;

    this.reset();
    if (badge) badge.textContent = '$50';
    resSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => { resSuccess.style.display = 'none'; }, 9000);
  });

  resForm.addEventListener('reset', () => {
    resSuccess.style.display = 'none';
    if (badge) badge.textContent = '$50';
  });
}

/* ── 5. Login form ── */
const loginForm = document.getElementById('loginForm');
const loginMsg  = document.getElementById('loginMsg');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    if (!user || !pass) {
      alert('⚠️  Please enter your username and password.');
      return;
    }

    loginMsg.style.display = 'block';
    loginMsg.textContent   = `✦  Welcome back, ${user}! You are now logged in.`;
    this.reset();

    setTimeout(() => { loginMsg.style.display = 'none'; }, 6000);
  });
}

/* ── 6. Table row click-to-select ── */
document.querySelectorAll('tbody tr').forEach(row => {
  row.addEventListener('click', function () {
    document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('selected'));
    this.classList.add('selected');
  });
});

/* ── 7. Marquee pause on hover ── */
const marqueeEl = document.querySelector('marquee.announcement');
if (marqueeEl) {
  marqueeEl.addEventListener('mouseenter', () => marqueeEl.stop());
  marqueeEl.addEventListener('mouseleave', () => marqueeEl.start());
}
