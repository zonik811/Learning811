 const quizData = [
            {
                question: "¿Qué es un CDN y por qué es importante para YouTube y Netflix?",
                options: [
                    "Un código de desarrollo nativo",
                    "Una red de servidores cercanos a los usuarios que entregan contenido más rápido",
                    "Un sistema de cifrado de datos",
                    "Una base de datos centralizada"
                ],
                correct: 1,
                explanation: "CDN (Content Delivery Network) es una red de servidores distribuidos globalmente que almacenan copias del contenido cerca de los usuarios, reduciendo latencia y mejorando velocidad de carga."
            },
            {
                question: "¿Qué lenguaje de programación usa Roblox para que los desarrolladores creen juegos?",
                options: [
                    "JavaScript",
                    "Python",
                    "Lua",
                    "C++"
                ],
                correct: 2,
                explanation: "Roblox usa Lua, un lenguaje de scripting simple y rápido diseñado para ser fácil de aprender. El motor del juego está en C++, pero los desarrolladores usan Lua para la lógica."
            },
            {
                question: "¿Qué significa 'streaming adaptativo' en Netflix y YouTube?",
                options: [
                    "El video se adapta al tamaño de la pantalla",
                    "La plataforma ajusta automáticamente la calidad según tu velocidad de internet",
                    "Los subtítulos se adaptan al idioma",
                    "El contenido se adapta a tu edad"
                ],
                correct: 1,
                explanation: "Streaming adaptativo mide constantemente tu velocidad de internet y ajusta la calidad del video (de 144p a 4K) para evitar buffering y darte la mejor experiencia posible."
            },
            {
                question: "¿Por qué Netflix usa AWS (Amazon Web Services) al 100%?",
                options: [
                    "Es más barato que tener servidores propios",
                    "Permite escalar recursos automáticamente según demanda y tener alta disponibilidad global",
                    "Amazon es dueño de Netflix",
                    "AWS es el único que soporta streaming de video"
                ],
                correct: 1,
                explanation: "AWS permite a Netflix escalar dinámicamente (agregar más servidores cuando hay mucha demanda) y tener presencia global sin construir infraestructura física. Es más flexible y confiable."
            },
            {
                question: "¿Cuál es el trabajo del 'Physics Engine' en Roblox?",
                options: [
                    "Crear los gráficos del juego",
                    "Conectar jugadores entre sí",
                    "Simular gravedad, colisiones y movimiento físico realista",
                    "Ejecutar el código Lua"
                ],
                correct: 2,
                explanation: "El Physics Engine simula la física del mundo real: gravedad (caes si saltas), colisiones (no atraviesas paredes), fricción, explosiones, etc. Todo se calcula 60 veces por segundo."
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
                    <div style="color: ${userAnswers[index] === question.correct ? '#48bb78' : '#f56565'}; font-weight: 600; margin-top: 1rem; padding: 1rem; background: rgba(40,40,40,0.8); border-radius: 12px;">
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
                message = '🎉 ¡Excelente! Entiendes cómo funcionan las plataformas';
                color = '#48bb78';
            } else if (percentage >= 60) {
                message = '👍 ¡Bien! Repasa los conceptos que fallaste';
                color = '#ed8936';
            } else {
                message = '📚 Necesitas repasar las arquitecturas';
                color = '#f56565';
            }
            
            resultDiv.innerHTML = `
                <div style="background: rgba(40,40,40,0.9); padding: 2rem; border-radius: 16px; border: 2px solid ${color}; text-align: center; margin-top: 2rem;">
                    <h3 style="color: ${color}; font-size: 2rem; margin-bottom: 1rem;">${message}</h3>
                    <p style="font-size: 1.5rem; color: white; margin-bottom: 0.5rem;">
                        Puntuación: ${score} / ${quizData.length}
                    </p>
                    <p style="font-size: 1.2rem; color: rgba(255,255,255,0.7);">
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

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.platform-section, .quiz-section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });