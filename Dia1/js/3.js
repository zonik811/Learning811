  function copyCode(button) {
            const codeBlock = button.parentElement.querySelector('pre');
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text);
            
            button.textContent = '✅ Copiado';
            setTimeout(() => {
                button.textContent = 'Copiar';
            }, 2000);
        }

        const quizData = [
            {
                question: "¿Cuál es la función principal de HTML en una página web?",
                options: [
                    "Dar color y estilo a la página",
                    "Definir la estructura y el contenido",
                    "Hacer que la página sea interactiva",
                    "Conectarse a la base de datos"
                ],
                correct: 1,
                explanation: "HTML (HyperText Markup Language) define la estructura y el contenido de la página usando etiquetas. Es el 'esqueleto' de la web."
            },
            {
                question: "¿Qué hace CSS en el desarrollo web?",
                options: [
                    "Crea la estructura de la página",
                    "Controla la apariencia visual: colores, tamaños, posiciones",
                    "Maneja la lógica y la interactividad",
                    "Almacena datos en el servidor"
                ],
                correct: 1,
                explanation: "CSS (Cascading Style Sheets) controla cómo se ven las cosas: colores, fuentes, espaciado, layout. Es el 'diseñador' de la web."
            },
            {
                question: "¿Qué es el DOM (Document Object Model)?",
                options: [
                    "Un lenguaje de programación",
                    "Una base de datos",
                    "Una representación en memoria de la página HTML como un árbol de objetos",
                    "Un servidor web"
                ],
                correct: 2,
                explanation: "El DOM es una representación de la página HTML como un árbol de nodos que JavaScript puede leer y modificar dinámicamente."
            },
            {
                question: "¿Cuál es la diferencia principal entre una página estática y una dinámica?",
                options: [
                    "Las estáticas usan HTML y las dinámicas no",
                    "Las estáticas tienen el mismo contenido para todos, las dinámicas cambian según el usuario o datos",
                    "Las dinámicas no usan CSS",
                    "Las estáticas son más caras de mantener"
                ],
                correct: 1,
                explanation: "Las páginas estáticas tienen contenido fijo para todos, mientras que las dinámicas generan contenido personalizado basándose en bases de datos o interacciones del usuario."
            },
            {
                question: "¿Qué hace JavaScript en una página web?",
                options: [
                    "Define la estructura HTML",
                    "Cambia los colores y fuentes",
                    "Añade interactividad: responde a clicks, valida formularios, actualiza contenido dinámicamente",
                    "Guarda datos en el servidor"
                ],
                correct: 2,
                explanation: "JavaScript es el lenguaje de programación que hace que las páginas sean interactivas: eventos, animaciones, validaciones, manipulación del DOM, llamadas a APIs."
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
                message = '🎉 ¡Perfecto! Dominas los fundamentos';
                color = '#48bb78';
            } else if (percentage >= 60) {
                message = '👍 ¡Bien! Repasa los conceptos que fallaste';
                color = '#ed8936';
            } else {
                message = '📚 Necesitas repasar los fundamentos';
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

        document.querySelectorAll('.concept-section, .quiz-section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });