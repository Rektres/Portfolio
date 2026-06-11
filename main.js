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
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = 'Por favor completa todos los campos.';
        formMessage.classList.remove('hidden');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Por favor ingresa un email válido.';
        formMessage.classList.remove('hidden');
        return;
    }

    formMessage.textContent = '¡Mensaje recibido! Te responderé pronto.';
    formMessage.classList.remove('hidden');
    contactForm.reset();

    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 3000);
});

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
