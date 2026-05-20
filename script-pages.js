// 0. Hamburger Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// Navbar Sticky
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '8px 30px';
        navbar.style.background = 'rgba(42, 31, 28, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
        navbar.style.top = '10px';
        navbar.style.width = '95%';
    } else {
        navbar.style.padding = '12px 30px';
        navbar.style.background = 'rgba(42, 31, 28, 0.85)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        navbar.style.top = '15px';
        navbar.style.width = '90%';
    }
}, { passive: true });

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Contadores animados (página Sobre)
function animateNumbers() {
    const numbers = document.querySelectorAll('.number-value[data-target]');
    numbers.forEach(num => {
        const target = parseInt(num.dataset.target);
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            num.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                num.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}

const numbersSection = document.querySelector('.about-numbers');
if (numbersSection) {
    const numbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                numbersObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    numbersObserver.observe(numbersSection);
}
