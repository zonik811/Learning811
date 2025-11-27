        // Datos de todos los días del curso
        const courseDays = [
            // SEMANA 1: Fundamentos
            { day: 1, title: "Introducción al Mundo Tech", description: "Descubre cómo funcionan las plataformas gigantes y las carreras disponibles", modules: ["📋 Inicio del Curso", "💼 Carreras Tech", "🌐 Plataformas", "📚 Fundamentos"], duration: "90 minutos", week: 1 },
            { day: 2, title: "Setup y Configuración", description: "Instala y configura VS Code, Python y extensiones necesarias", modules: ["🛠️ VS Code", "🐍 Python", "🧩 Extensiones"], duration: "60 minutos", week: 1 },
            { day: 3, title: "HTML desde Cero", description: "Aprende la estructura de las páginas web y etiquetas básicas", modules: ["🏗️ Estructura HTML", "📝 Etiquetas", "🔗 Enlaces"], duration: "90 minutos", week: 1 },
            { day: 4, title: "CSS: Dando Estilo", description: "Aprende a diseñar páginas hermosas con colores, fuentes y layouts", modules: ["🎨 Selectores CSS", "📦 Box Model", "🌈 Colores"], duration: "90 minutos", week: 1 },
            { day: 5, title: "Proyecto: Pokémon Cards", description: "Crea tu primer proyecto combinando HTML y CSS", modules: ["🎴 Proyecto Final", "🏗️ HTML + CSS", "🎯 Práctica"], duration: "120 minutos", week: 1 },

            // SEMANA 2: Interactividad y Frameworks
            { day: 6, title: "JavaScript: Variables y Tipos", description: "Primeros pasos en programación: variables, tipos de datos y operadores", modules: ["📦 Variables", "🔢 Tipos de Datos", "➕ Operadores"], duration: "90 minutos", week: 2 },
            { day: 7, title: "Funciones y Condicionales", description: "Aprende a crear funciones y tomar decisiones en tu código", modules: ["🔧 Funciones", "🔀 If/Else", "🔄 Bucles"], duration: "90 minutos", week: 2 },
            { day: 8, title: "DOM Manipulation", description: "Manipula elementos de la página con JavaScript", modules: ["🌳 DOM", "🎯 Eventos", "✨ Interactividad"], duration: "90 minutos", week: 2 },
            { day: 9, title: "Proyecto: Calculadora", description: "Construye una calculadora funcional con todo lo aprendido", modules: ["🔢 Proyecto", "💻 JavaScript", "🎨 UI/UX"], duration: "120 minutos", week: 2 },
{ day: 10, title: "Pokédex Mejorada", description: "Continúa el proyecto Pokédex con JavaScript avanzado", modules: ["🔍 Búsqueda", "🎯 Filtros", "💾 localStorage"], duration: "90 minutos", week: 2 },
            // SEMANA 3: Backend y Bases de Datos
            { day: 11, title: "Conceptos de Backend y Storage", description: "Arquitectura de backend y persistencia con localStorage", modules: ["⚙️ Backend", "💾 Storage", "⭐ Sistema de favoritos"], duration: "90 minutos", week: 3 },
            { day: 12, title: "APIs, SQL y Comunicación", description: "Fundamentos SQL, APIs reales y comunicación front-back", modules: ["🔌 APIs", "🗄️ SQL", "🌐 Comunicación"], duration: "90 minutos", week: 3 },
            { day: 13, title: "Proyecto Backend Integrado", description: "Pokédex completamente funcional integrando todo lo aprendido", modules: ["📦 Proyecto Integrated", "🔗 Front-Back", "🎯 Funcionalidades"], duration: "120 minutos", week: 3 },
            { day: 14, title: "Bonus Backend", description: "Mejoras, retos y preguntas comunes del backend práctico", modules: ["🤝 Preguntas", "🔍 Retos", "💡 Tips"], duration: "60 minutos", week: 3 },
            { day: 15, title: "Presentación de Avances", description: "Muestra de proyectos y avance individual/grupal", modules: ["🔬 Presentación", "🎤 Explicación", "🌟 Feedback"], duration: "90 minutos", week: 3 },

            // SEMANA 4: IA y Proyecto Final
            { day: 16, title: "Introducción a IA", description: "Fundamentos de IA, generación de imágenes y práctica", modules: ["🤖 Fundamentos IA", "🖼️ Imágenes IA", "🔬 Práctica"], duration: "90 minutos", week: 4 },
            { day: 17, title: "Aplicaciones con IA", description: "Automatizaciones, Pokémon personalizados con IA", modules: ["🔄 Automatización", "🎨 IA Pokémon", "⚙️ Integración"], duration: "90 minutos", week: 4 },
            { day: 18, title: "Proyecto Final: Preparación", description: "Diseña y planifica tu proyecto integrador completo", modules: ["📝 Planificación", "🎨 Diseño", "🤝 Wireframes"], duration: "120 minutos", week: 4 },
            { day: 19, title: "Proyecto Final: Desarrollo", description: "Construcción y despliegue del proyecto final", modules: ["🏗️ Desarrollo", "🚀 Deploy", "🧩 Presentación técnica"], duration: "120 minutos", week: 4 },
            { day: 20, title: "Graduación y Certificación", description: "Presentaciones, reto técnico y cierre", modules: ["🎓 Presentaciones", "🧠 Reto", "📃 Certificación"], duration: "180 minutos", week: 4 }
        ];

        // Inicializar localStorage si no existe
        function initializeStorage() {
            if (!localStorage.getItem('completedDays')) {
                localStorage.setItem('completedDays', JSON.stringify([]));
                console.log('📦 LocalStorage inicializado con array vacío');
            }
            if (!localStorage.getItem('userName')) {
                localStorage.setItem('userName', 'Usuario');
            }
        }

        // Obtener días completados
        function getCompletedDays() {
            const completed = JSON.parse(localStorage.getItem('completedDays') || '[]');
            console.log('✅ Días completados:', completed);
            return completed;
        }

        // Verificar si un día está desbloqueado
        function isDayUnlocked(dayNumber) {
            const completedDays = getCompletedDays();
            if (dayNumber === 1) return true;
            return completedDays.includes(dayNumber - 1);
        }

        // Verificar si un día está completado
        function isDayCompleted(dayNumber) {
            const completedDays = getCompletedDays();
            return completedDays.includes(dayNumber);
        }

        // Actualizar progreso general
        function updateProgress() {
            const completedDays = getCompletedDays();
            const totalDays = 20;
            const progress = (completedDays.length / totalDays) * 100;
            
            document.getElementById('progressPercentage').textContent = Math.round(progress) + '%';
            document.getElementById('progressBar').style.width = progress + '%';
            
            console.log(`📊 Progreso: ${completedDays.length}/${totalDays} días (${Math.round(progress)}%)`);
        }

        // Crear HTML de una card de día
        function createDayCard(dayData) {
            const isCompleted = isDayCompleted(dayData.day);
            const isUnlocked = isDayUnlocked(dayData.day);
            
            let statusIcon = '🔒';
            let statusClass = 'locked';
            
            if (isCompleted) {
                statusIcon = '✅';
                statusClass = 'completed';
            } else if (isUnlocked) {
                statusIcon = '🎯';
                statusClass = '';
            }

            const modulesHTML = dayData.modules.map(module => 
                `<span class="module-tag">${module}</span>`
            ).join('');

            return `
                <div class="day-card ${statusClass}" onclick="${isUnlocked ? `goToDay(${dayData.day})` : ''}" data-day="${dayData.day}">
                    <div class="day-header">
                        <div class="day-number">Día ${dayData.day}</div>
                        <div class="${isCompleted || isUnlocked ? 'day-status' : 'lock-icon'}">${statusIcon}</div>
                    </div>
                    <div class="day-title">${dayData.title}</div>
                    <div class="day-description">${dayData.description}</div>
                    <div class="day-modules">${modulesHTML}</div>
                    <div class="day-footer">
                        <div class="day-duration">⏱️ ${dayData.duration}</div>
                        <button class="start-button" ${!isUnlocked ? 'disabled' : ''}>
                            ${isCompleted ? 'Revisar 📖' : isUnlocked ? 'Comenzar 🎯' : 'Bloqueado 🔒'}
                        </button>
                    </div>
                </div>
            `;
        }

        // Renderizar todos los días
        function renderAllDays() {
            const weeks = document.querySelectorAll('.week-section');
            
            weeks.forEach((week, index) => {
                const weekNumber = index + 1;
                const daysGrid = week.querySelector('.days-grid');
                const weekDays = courseDays.filter(day => day.week === weekNumber);
                
                daysGrid.innerHTML = weekDays.map(day => createDayCard(day)).join('');
            });
            
            console.log('🎨 Todas las cards renderizadas');
        }

        // Función para ir a un día específico
        function goToDay(dayNumber) {
            console.log(`🚀 Navegando a Día ${dayNumber}`);
window.location.href = `Dia${dayNumber}/inicio_curso.html`;
        }

        // Función global para marcar día como completado
        window.completeDay = function(dayNumber) {
            const completedDays = getCompletedDays();
            
            if (!completedDays.includes(dayNumber)) {
                completedDays.push(dayNumber);
                completedDays.sort((a, b) => a - b);
                localStorage.setItem('completedDays', JSON.stringify(completedDays));
                console.log(`✅ Día ${dayNumber} marcado como completado`);
                
                updateProgress();
                renderAllDays();
                
                showNotification(`🎉 ¡Día ${dayNumber} completado! Día ${dayNumber + 1} desbloqueado.`);
            }
        };

        // Mostrar notificación
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #48bb78, #38a169);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                font-weight: 600;
                z-index: 9999;
                animation: slideInRight 0.5s ease;
                box-shadow: 0 10px 30px rgba(72, 187, 120, 0.4);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }

        // Inicializar cuando la página carga
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Iniciando aplicación del menú');
            
            initializeStorage();
            
            const userName = localStorage.getItem('userName') || 'Usuario';
            document.getElementById('userName').textContent = userName;
            
            renderAllDays();
            updateProgress();
            
            console.log('✅ Menú cargado completamente');
        });

        // Función para mostrar el banner de desafíos
function initializeChallengesBanner() {
    const completedDays = getCompletedDays();
    const isDay10Unlocked = completedDays.includes(9) || completedDays.includes(10);
    const banner = document.getElementById('challenges-banner');

    if (isDay10Unlocked && banner) {
        banner.innerHTML = `
        <div style="
            text-align: center;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #680191ff, #31024dff);
            padding: 25px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(195, 0, 255, 0.3);
            animation: challengePulse 2s infinite;
        ">
            <a href="../Desafios/desafio10.html" style="
                display: inline-block;
                background: linear-gradient(135deg, #2d5016, #4a7c2c);
                color: #7bed9f;
                padding: 16px 40px;
                font-size: 1.1rem;
                border: 2px solid #7bed9f;
                border-radius: 12px;
                font-weight: 700;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s;
            ">
                🏆 DESAFÍOS MINECRAFT - Gana 10 Dólares 💰
            </a>
        </div>
        <style>
            @keyframes challengePulse {
                0%, 100% { box-shadow: 0 8px 32px rgba(195, 0, 255, 0.3); }
                50% { box-shadow: 0 8px 32px rgba(204, 0, 255, 0.6); }
            }
        </style>
        `;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    const userName = localStorage.getItem('userName') || 'Usuario';
    document.getElementById('userName').textContent = userName;
    
    renderAllDays();
    updateProgress();
    initializeChallengesBanner();  // ← AGREGA ESTA LÍNEA
    
    console.log('✅ Menú cargado completamente');
});
