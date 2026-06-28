// ─── 1. DARK MODE TOGGLE ────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function initTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
});

initTheme();

// ─── 2. NAVBAR SCROLL BEHAVIOR ──────────────────────────────────────
const navbar = document.getElementById('navbar');

let lastScrollY = 0;
function updateNavbarOnScroll() {
    lastScrollY = window.scrollY;
    if (lastScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

// ─── 3. ACTIVE NAV LINK ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.4
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('text-accent');
                link.classList.add('text-gray-900', 'dark:text-gray-300');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.remove('text-gray-900', 'dark:text-gray-300');
                    link.classList.add('text-accent');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ─── 4. SCROLL ANIMATIONS ───────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ─── 5. MOBILE MENU ─────────────────────────────────────────────────
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenuBackdrop.classList.add('open');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuBackdrop.classList.remove('open');
}

mobileMenuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ─── 6. CONTACT FORM ────────────────────────────────────────────────
const CONTACT_API_URL = 'https://portfolio-api-production-3b8f.up.railway.app/api/contact';

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showMessage('Por favor completa todos los campos.', false);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor ingresa un email válido.', false);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        const res = await fetch(CONTACT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        if (!res.ok) throw new Error('Error del servidor');

        showMessage('¡Mensaje enviado! Te responderé pronto.', true);
        contactForm.reset();
    } catch {
        showMessage('Error al enviar. Intenta nuevamente.', false);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
});

function showMessage(text, success) {
    formMessage.textContent = text;
    formMessage.style.color = success ? '#00D26A' : '#ef4444';
    formMessage.classList.remove('hidden');
    setTimeout(() => formMessage.classList.add('hidden'), 4000);
}

// ─── 7. SMOOTH SCROLL ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
