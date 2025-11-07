        // Crear confetti animado
        function createConfetti() {
            const confettiContainer = document.getElementById('confettiContainer');
            const colors = ['#667eea', '#764ba2', '#f093fb', '#48bb78', '#ed8936'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                confettiContainer.appendChild(confetti);
            }
        }

        createConfetti();

        // Función para marcar el Día 1 como completado
        function completeDay1() {
            const button = document.querySelector('.complete-button');
            const successMessage = document.getElementById('successMessage');
            
            // Deshabilitar botón
            button.disabled = true;
            button.style.opacity = '0.6';
            button.textContent = '⏳ Guardando progreso...';
            
            // Simular guardado con delay (para efecto visual)
            setTimeout(() => {
                // Obtener días completados actuales
                let completedDays = JSON.parse(localStorage.getItem('completedDays') || '[1]');
                
                // Agregar Día 1 si no está
                if (!completedDays.includes(1)) {
                    completedDays.push(1);
                    localStorage.setItem('completedDays', JSON.stringify(completedDays));
                }
                
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                
                // Redirigir al menú después de 2 segundos
                setTimeout(() => {
                    window.location.href = '../menu.html';
                }, 2000);
            }, 800);
        }

        // Función para volver al menú sin marcar como completado
        function goToMenu() {
            window.location.href = '../menu.html';
        }

        // Detectar si la página está dentro de un iframe (para el sistema parent)
        if (window.parent !== window) {
            // Si está en iframe, agregar botón alternativo que usa el parent
            const altButton = document.createElement('button');
            altButton.className = 'menu-button';
            altButton.textContent = '✨ Marcar como Completado (Modo Iframe)';
            altButton.onclick = function() {
                if (window.parent.completeDay) {
                    window.parent.completeDay(1);
                    setTimeout(() => {
                        window.parent.location.reload();
                    }, 1000);
                }
            };
            altButton.style.marginTop = '1rem';
            document.querySelector('.action-buttons').appendChild(altButton);
        }

        // Guardar estadísticas del día (opcional, para futuras features)
        localStorage.setItem('day1Stats', JSON.stringify({
            completed: true,
            modules: 4,
            timeSpent: 90,
            completedAt: new Date().toISOString()
        }));

        // Logging para debug
        console.log('Días completados actualmente:', localStorage.getItem('completedDays'));