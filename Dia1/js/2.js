        function showInfo(element) {
            const infoDisplay = document.getElementById('info-display');
            const info = {
                user: "👤 <strong>Usuario</strong><br>Eres tú, navegando por internet desde tu computadora o teléfono. Escribes una URL o haces clic en un enlace.",
                browser: "🌐 <strong>Navegador</strong><br>Tu navegador (Chrome, Firefox, Safari) es como un traductor. Toma tu petición y la envía al servidor correcto en internet.",
                server: "🖥️ <strong>Servidor</strong><br>Una computadora especial que está siempre encendida, esperando peticiones. Aquí vive el código de la página web que quieres ver.",
                database: "💾 <strong>Base de Datos</strong><br>Como un archivo gigante organizado donde se guarda toda la información: usuarios, posts, fotos, comentarios, etc."
            };
            
            infoDisplay.innerHTML = info[element];
            infoDisplay.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
            infoDisplay.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        }

        const quizData = [
            {
                question: "¿Qué es Internet?",
                options: [
                    "Una red de computadoras conectadas en todo el mundo",
                    "Un programa de computadora",
                    "Un tipo de teléfono",
                    "Una empresa de tecnología"
                ],
                correct: 0,
                explanation: "Internet es una red gigante que conecta millones de computadoras alrededor del mundo, permitiéndoles comunicarse entre sí."
            },
            {
                question: "¿Qué hace un servidor?",
                options: [
                    "Navega por internet",
                    "Guarda y envía páginas web cuando se las piden",
                    "Escribe código",
                    "Diseña páginas web"
                ],
                correct: 1,
                explanation: "Un servidor es una computadora especial que está siempre encendida, esperando peticiones y enviando páginas web a quien las solicite."
            },
            {
                question: "¿Cuál es la diferencia principal entre Frontend y Backend?",
                options: [
                    "Frontend maneja bases de datos, Backend la interfaz",
                    "Frontend es lo que ve el usuario, Backend es la lógica del servidor",
                    "Frontend es más difícil que Backend",
                    "No hay diferencia entre ellos"
                ],
                correct: 1,
                explanation: "Frontend es todo lo visual que ves e interactúas (botones, colores). Backend es la lógica invisible que hace que todo funcione (bases de datos, autenticación)."
            },
            {
                question: "¿Qué es una variable en programación?",
                options: [
                    "Un error en el código",
                    "Una caja donde guardas información",
                    "Un tipo de computadora",
                    "Un lenguaje de programación"
                ],
                correct: 1,
                explanation: "Una variable es como una caja con nombre donde guardas datos (números, texto, etc.) que puedes usar y cambiar más tarde en tu programa."
            },
            {
                question: "¿Para qué sirve VS Code?",
                options: [
                    "Para navegar en internet",
                    "Para escribir y editar código de programación",
                    "Para diseñar imágenes",
                    "Para jugar videojuegos"
                ],
                correct: 1,
                explanation: "VS Code es un editor de código donde los programadores escriben sus programas. Es como Word pero especializado para código, con colores y herramientas útiles."
            }
        ];

        let currentQuestion = 0;
        let userAnswers = Array(quizData.length).fill(null);
        let score = 0;

        function loadQuestion(index) {
            const container = document.getElementById('quiz-container');
            const question = quizData[index];
            
            container.innerHTML = `
                <div class="quiz-question">
                    Pregunta ${index + 1} de ${quizData.length}: ${question.question}
                </div>
                <div class="quiz-options">
                    ${question.options.map((option, i) => `
                        <div class="quiz-option ${userAnswers[index] === i ? (i === question.correct ? 'correct' : 'wrong') : ''}" 
                             onclick="selectAnswer(${i})"
                             ${userAnswers[index] !== null ? 'style="pointer-events: none;"' : ''}>
                            ${option}
                        </div>
                    `).join('')}
                </div>
                ${userAnswers[index] !== null ? `
                    <div style="color: ${userAnswers[index] === question.correct ? '#48bb78' : '#f56565'}; font-weight: 600; margin-top: 1.5rem; padding: 1.5rem; background: rgba(40,40,40,0.6); border-radius: 12px; font-size: 1.1rem;">
                        ${userAnswers[index] === question.correct ? '✅ ¡Correcto!' : '❌ Incorrecto.'} ${question.explanation}
                    </div>
                ` : ''}
            `;

            document.querySelectorAll('.quiz-indicator').forEach((indicator, i) => {
                indicator.classList.remove('active', 'completed');
                if (i === index) {
                    indicator.classList.add('active');
                } else if (userAnswers[i] !== null) {
                    indicator.classList.add('completed');
                }
            });

            document.getElementById('prev-btn').style.display = index > 0 ? 'block' : 'none';
            document.getElementById('next-btn').style.display = userAnswers[index] !== null && index < quizData.length - 1 ? 'block' : 'none';

            if (userAnswers.every(answer => answer !== null) && index === quizData.length - 1) {
                showFinalResults();
            }
        }

        function selectAnswer(selectedIndex) {
            const question = quizData[currentQuestion];
            userAnswers[currentQuestion] = selectedIndex;
            
            if (selectedIndex === question.correct) {
                score++;
            }
            
            loadQuestion(currentQuestion);
        }

        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                loadQuestion(currentQuestion);
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion(currentQuestion);
            }
        }

        function showFinalResults() {
            const percentage = (score / quizData.length) * 100;
            const resultDiv = document.getElementById('quiz-result');
            
            let message = '';
            let color = '';
            
            if (percentage >= 80) {
                message = '🎉 ¡Excelente! Dominas los fundamentos';
                color = '#48bb78';
            } else if (percentage >= 60) {
                message = '👍 ¡Bien hecho! Vas por buen camino';
                color = '#ed8936';
            } else {
                message = '📚 Sigue practicando, puedes mejorar';
                color = '#f56565';
            }
            
            resultDiv.innerHTML = `
                <div style="background: rgba(40,40,40,0.8); padding: 2.5rem; border-radius: 20px; border: 3px solid ${color}; text-align: center; margin-top: 2rem;">
                    <h3 style="color: ${color}; font-size: 2.2rem; margin-bottom: 1.5rem; font-weight: 700;">${message}</h3>
                    <p style="font-size: 1.8rem; color: white; margin-bottom: 0.8rem; font-weight: 600;">
                        Puntuación: ${score} / ${quizData.length}
                    </p>
                    <p style="font-size: 1.3rem; color: rgba(255,255,255,0.8);">
                        ${percentage.toFixed(0)}% correcto
                    </p>
                </div>
            `;
        }

        document.addEventListener('DOMContentLoaded', function() {
            loadQuestion(0);
        });

        document.querySelectorAll('.quiz-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentQuestion = index;
                loadQuestion(currentQuestion);
            });
        });