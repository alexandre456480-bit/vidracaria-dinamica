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

// 1. Navbar Sticky com Background Effect
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

// 2. Carrossel Automático de Background com transições diferenciadas
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    const leavingSlide = slides[currentSlide];
    leavingSlide.classList.remove('active');
    leavingSlide.classList.add('leaving');

    // Remove a classe 'leaving' após a transição terminar
    setTimeout(() => {
        leavingSlide.classList.remove('leaving');
    }, 1600);

    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Troca a imagem a cada 5 segundos
setInterval(nextSlide, 5000);

// 3. Configuração do Particles.js
document.addEventListener("DOMContentLoaded", function() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#c4ac90" // Cor principal de destaque (Dourado/Bege)
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false // Desabilitado para ter efeito apenas de partículas subindo
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "top", // Partículas subindo
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 200,
                    "size": 6,
                    "duration": 0.3,
                    "opacity": 0.8,
                    "speed": 3
                }
            }
        },
        "retina_detect": true
    });
});

// 4. Carrossel 3D de Serviços
document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('.carousel-scene');
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!scene || cards.length === 0) return;

    const totalCards = cards.length;
    const angleStep = 360 / totalCards;
    const radius = 300;
    let currentAngle = 0;

    // Posicionar cards no círculo 3D
    cards.forEach((card, i) => {
        const angle = angleStep * i;
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // Criar dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCard(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        const idx = Math.round((-currentAngle % 360 + 360) % 360 / angleStep) % totalCards;
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }

    function rotateCarousel() {
        scene.style.transform = `rotateY(${currentAngle}deg)`;
        updateDots();
    }

    function goToCard(index) {
        currentAngle = -angleStep * index;
        rotateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        currentAngle += angleStep;
        rotateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentAngle -= angleStep;
        rotateCarousel();
    });

    // Auto-play do carrossel
    let carouselAuto = setInterval(() => {
        currentAngle -= angleStep;
        rotateCarousel();
    }, 4000);

    // Pausar auto-play ao interagir
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselAuto));
    carouselWrapper.addEventListener('mouseleave', () => {
        carouselAuto = setInterval(() => {
            currentAngle -= angleStep;
            rotateCarousel();
        }, 4000);
    });

    // Touch/Swipe support
    let touchStartX = 0;
    const carousel3d = document.querySelector('.carousel-3d');
    carousel3d.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(carouselAuto);
    });
    carousel3d.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) { currentAngle -= angleStep; }
            else { currentAngle += angleStep; }
            rotateCarousel();
        }
    });
});

// 5. Animação dos Contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}

// Observer para disparar contadores ao entrar na tela
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const trustStats = document.querySelector('.trust-stats');
if (trustStats) statsObserver.observe(trustStats);

// 6. Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.trust-content, .trust-gallery, .features-grid, .services-content, .carousel-wrapper, .reveal').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// 7. Scattered Gallery Animation
document.addEventListener('DOMContentLoaded', () => {
    const imagesList = [
        'sessão imagens/1.webp',
        'sessão imagens/2.webp',
        'sessão imagens/3.webp',
        'sessão imagens/4.webp',
        'sessão imagens/5.webp',
        'imagens/piscina.webp'
    ];
    
    const slots = document.querySelectorAll('.scattered-slot');
    if (slots.length === 0) return;
    
    let currentImages = [];
    
    // Inicia os slots com imagens aleatórias sem repetir
    let shuffled = [...imagesList].sort(() => 0.5 - Math.random());
    
    slots.forEach((slot, index) => {
        const front = slot.querySelector('.img-front');
        const back = slot.querySelector('.img-back');
        
        front.src = shuffled[index];
        front.classList.add('active');
        back.classList.add('hidden');
        currentImages.push(shuffled[index]);
    });
    
    // Função para trocar uma imagem aleatória
    setInterval(() => {
        const randomSlotIndex = Math.floor(Math.random() * slots.length);
        const slot = slots[randomSlotIndex];
        const front = slot.querySelector('.img-front');
        const back = slot.querySelector('.img-back');
        
        // Achar uma imagem que não está sendo mostrada no momento
        const availableImages = imagesList.filter(img => !currentImages.includes(img));
        const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        
        // Trocar atual pela nova no array
        currentImages[randomSlotIndex] = newImage;
        
        // Configurar a imagem escondida e fazer fade
        if (front.classList.contains('hidden')) {
            front.src = newImage;
            front.classList.remove('hidden');
            front.classList.add('active');
            back.classList.add('hidden');
            back.classList.remove('active');
        } else {
            back.src = newImage;
            back.classList.remove('hidden');
            back.classList.add('active');
            front.classList.add('hidden');
            front.classList.remove('active');
        }
    }, 2500); // Troca uma imagem a cada 2.5s
});
