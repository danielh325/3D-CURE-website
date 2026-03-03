
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

const THEME_STORAGE_KEY = 'theme-preference';

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        target.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
});

function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);

    // Swap logos per theme.
    document.querySelectorAll('.theme-logo').forEach((img) => {
        const lightLogo = img.getAttribute('data-light-logo');
        const darkLogo = img.getAttribute('data-dark-logo');
        const nextLogo = isDark ? darkLogo : lightLogo;
        if (nextLogo) img.src = nextLogo;
    });

    // Keep favicon consistent with current theme.
    const favicon = document.getElementById('site-favicon');
    if (favicon) {
        const lightFavicon = favicon.getAttribute('data-light-favicon');
        const darkFavicon = favicon.getAttribute('data-dark-favicon');
        const nextFavicon = isDark ? darkFavicon : lightFavicon;
        if (nextFavicon) favicon.setAttribute('href', nextFavicon);
    }

    const themeToggleLabel = document.querySelector('#theme-toggle .theme-toggle-label');
    const themeToggleButton = document.getElementById('theme-toggle');
    const nextLabel = isDark ? 'Light Mode' : 'Dark Mode';
    if (themeToggleLabel) themeToggleLabel.textContent = nextLabel;
    if (themeToggleButton) themeToggleButton.setAttribute('aria-label', `Switch to ${nextLabel}`);
}

const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme = null;
try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
} catch (error) {
    savedTheme = null;
}

const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDarkQuery.matches;
applyTheme(initialIsDark);

prefersDarkQuery.addEventListener('change', (event) => {
    let currentSavedTheme = null;
    try {
        currentSavedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
        currentSavedTheme = null;
    }
    if (!currentSavedTheme) applyTheme(event.matches);
});

const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const isDarkNow = document.documentElement.classList.contains('dark');
        const nextIsDark = !isDarkNow;
        applyTheme(nextIsDark);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
        } catch (error) {
            // Ignore storage failures silently.
        }
    });
}

// Form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate form submission (would be replaced with actual submission logic)
        setTimeout(() => {
            formSuccess.style.display = 'block';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }, 1000);
    });
}
