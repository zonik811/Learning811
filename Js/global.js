// Base de datos de usuarios hardcodeados
const users = {
    'sofia': {
        password: 'Sofia2024!',
        name: 'Sofía'
    },
    'daniel': {
        password: 'Daniel2024!',
        name: 'Daniel'
    }
};

// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Llenar credenciales de demo
function fillCredentials(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;

    // Pequeña animación visual
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '#667eea';
        setTimeout(() => {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }, 300);
    });
}

// Manejar el login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validar credenciales
    if (users[username] && users[username].password === password) {
        // Login exitoso
        errorMessage.style.display = 'none';

        // Animar salida del login
        const loginContainer = document.getElementById('loginContainer');
        loginContainer.style.animation = 'slideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

        // Mostrar pantalla de bienvenida después de un breve delay
        setTimeout(() => {
            loginContainer.style.display = 'none';
            showWelcomeScreen(users[username].name);
        }, 500);

    } else {
        // Login fallido
        errorMessage.style.display = 'block';

        // Shake en los inputs
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        });
    }
});

// Añadir animación de slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Mostrar pantalla de bienvenida
function showWelcomeScreen(name) {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeName = document.getElementById('welcomeName');
    
    welcomeName.textContent = name;
    welcomeScreen.style.display = 'flex';
    
    // 🔥 GUARDAR EL NOMBRE EN LOCALSTORAGE 🔥
    localStorage.setItem('userName', name);
    
    // Inicializar array de días completados si no existe
    if (!localStorage.getItem('completedDays')) {
        localStorage.setItem('completedDays', JSON.stringify([]));
    }
    
    console.log('✅ Usuario guardado en localStorage:', name);
    console.log('📦 LocalStorage inicializado');
    
    // Redirigir a menu.html después de 3 segundos
    setTimeout(() => {
        welcomeScreen.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 500);
    }, 3000);
}

// Añadir animación fadeOut
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Focus automático en el campo de usuario
document.getElementById('username').focus();

// Permitir login con Enter
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});


