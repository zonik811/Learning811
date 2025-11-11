let correctAnswers = 0;
let answeredQuestions = 0;
const totalQuestions = 3;

const answers = {
    1: 'B',
    2: 'C',
    3: 'C'
};

const explanations = {
    1: '✅ Correcto! HTML fue creado por Tim Berners-Lee en 1991 en el CERN.',
    2: '✅ Exacto! La extensión .html indica al navegador y al sistema que el archivo contiene código HTML que debe ser interpretado.',
    3: '✅ Perfecto! El &lt;body&gt; contiene TODO el contenido visible: textos, imágenes, botones, etc.'
};

function checkAnswer(questionNum, correctAnswer, element) {
    // Verificar si ya se respondió
    const feedback = document.getElementById(`q${questionNum}-feedback`);
    if (feedback.classList.contains('show')) return;

    answeredQuestions++;
    const options = document.getElementById(`q${questionNum}-options`).children;
    const selectedLetter = element.textContent.charAt(0);

    // Deshabilitar todas las opciones
    Array.from(options).forEach(opt => opt.classList.add('disabled'));

    // Marcar como seleccionada
    element.classList.add('selected');

    // Verificar respuesta
    if (selectedLetter === correctAnswer) {
        element.classList.add('correct');
        element.classList.remove('selected');
        feedback.textContent = explanations[questionNum];
        feedback.classList.add('correct', 'show');
        correctAnswers++;
    } else {
        element.classList.add('incorrect');
        element.classList.remove('selected');
        // Mostrar la correcta
        Array.from(options).forEach(opt => {
            if (opt.textContent.charAt(0) === correctAnswer) {
                opt.classList.add('correct');
            }
        });
        feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${correctAnswer}. ${explanations[questionNum]}`;
        feedback.classList.add('incorrect', 'show');
    }

    // Avanza automáticamente a la siguiente pregunta después de 1 segundo
    setTimeout(() => {
        document.getElementById(`question-${questionNum}`).style.display = 'none';
        if (questionNum < totalQuestions) {
            document.getElementById(`question-${questionNum + 1}`).style.display = 'block';
            // Hace scroll automático para centrar la nueva pregunta
            document.getElementById(`question-${questionNum + 1}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Habilitar botón después de la última pregunta
        if (answeredQuestions === totalQuestions) {
            document.getElementById('nextBtn').disabled = false;
        }
    }, 1000);
}

function goToNextModule() {
    if (answeredQuestions < totalQuestions) {
        alert('⚠️ Por favor responde todas las preguntas antes de continuar.');
        return;
    }
    window.location.href = 'modulo2.html';
}