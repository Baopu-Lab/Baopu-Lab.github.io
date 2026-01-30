// Language Toggle Functionality
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLanguage();

    // Update button text
    const langText = document.getElementById('lang-text');
    langText.textContent = currentLang === 'en' ? '中文' : 'English';
}

function updateLanguage() {
    // Update all elements with data-en and data-zh attributes
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
        if (text) {
            el.innerHTML = text;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
}

// Smooth Scroll for Navigation Links
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

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    updateLanguage();

    // Trigger hero animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});

// Parallax effect for floating elements
window.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    elements.forEach((el, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Console Easter Egg
console.log(`
%c抱朴实验室 | Baopu Lab
%c━━━━━━━━━━━━━━━━━━━━━━━━━━
%c抱朴守真

%c🔬 Interested in our research?
   Visit: https://github.com/Baopu-Lab
`,
    'font-size: 24px; font-weight: bold; color: #e94560;',
    'color: #667eea;',
    'font-size: 14px; color: #a0a0a0;',
    'font-size: 12px; color: #667eea;'
);

// Copy BibTeX function
function copyBibtex() {
    const bibtex = `@inproceedings{gao2026lssar,
  title={Softplus Attention with Re-weighting Boosts Length Extrapolation in Large Language Models},
  author={Gao, Bo and Spratling, Michael W. and Gionfrida, Letizia},
  booktitle={International Conference on Machine Learning (ICML)},
  year={2026}
}`;

    navigator.clipboard.writeText(bibtex).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.querySelector('span').textContent;
        btn.classList.add('copied');
        btn.querySelector('span').textContent = currentLang === 'en' ? 'Copied!' : '已复制!';

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('span').textContent = originalText;
        }, 2000);
    });
}
