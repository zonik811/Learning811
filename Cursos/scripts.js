// ====== DARK MODE TOGGLE ======
const darkModeToggle = document.getElementById('darkModeToggle');

// Verificar preferencia guardada en localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Escuchar cambios en el toggle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// ====== PARALLAX SCROLL EFFECT ======
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    
    // Efecto parallax en el header
    if (header) {
        header.style.transform = `translateY(${scrollY * 0.5}px)`;
        header.style.opacity = Math.max(0, 1 - (scrollY / 500));
    }
    
    // Parallax para las semanas con velocidades variables
    const weeks = document.querySelectorAll('.week');
    weeks.forEach((week, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollY * speed);
        week.style.transform = `translateY(${yPos}px)`;
    });
    
    lastScrollY = scrollY;
});

// ====== SCROLL ANIMATIONS CON INTERSECTION OBSERVER ======
const animateElements = document.querySelectorAll('section, .week, .razon, .plan, .beneficio');

const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Agregar clase con delay para efecto escalonado
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Agregar clase de animación y observar elementos
animateElements.forEach((element, index) => {
    // Variar el tipo de animación según el índice
    const animationType = ['', 'animate-left', 'animate-right', 'animate-fade'][index % 4];
    element.classList.add('animate-on-scroll', animationType);
    observer.observe(element);
});

// ====== SMOOTH SCROLL PARA NAVEGACIÓN ======
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

// ====== BOTÓN SCROLL TO TOP ======
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
});
