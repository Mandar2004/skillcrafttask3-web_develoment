// ==========================================
// QUIZ QUESTIONS
// ==========================================

const questions = [

    {
        question:
            "Which language is primarily used to structure a web page?",

        type:
            "SINGLE SELECT",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        answer: 0
    },


    {
        question:
            "Which of the following are programming languages?",

        type:
            "MULTI SELECT",

        options: [
            "Java",
            "Python",
            "HTML",
            "C++"
        ],

        answer: [0, 1, 3]
    },


    {
        question:
            "Which technology is used to style web pages?",

        type:
            "SINGLE SELECT",

        options: [
            "HTML",
            "CSS",
            "SQL",
            "Java"
        ],

        answer: 1
    },


    {
        question:
            "Which keyword is used to declare a constant in JavaScript?",

        type:
            "SINGLE SELECT",

        options: [
            "let",
            "var",
            "const",
            "static"
        ],

        answer: 2
    },


    {
        question:
            "Which of these can be used to store data in a browser?",

        type:
            "MULTI SELECT",

        options: [
            "Local Storage",
            "Session Storage",
            "Cookies",
            "Photoshop"
        ],

        answer: [0, 1, 2]
    }

];


// ==========================================
// HTML ELEMENTS
// ==========================================

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");


const startBtn =
    document.getElementById("startBtn");

const nextBtn =
    document.getElementById("nextBtn");

const restartBtn =
    document.getElementById("restartBtn");


const question =
    document.getElementById("question");

const questionType =
    document.getElementById("questionType");

const optionsContainer =
    document.getElementById("options");


const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");


const finalScore =
    document.getElementById("finalScore");

const correctAnswers =
    document.getElementById("correctAnswers");

const wrongAnswers =
    document.getElementById("wrongAnswers");

const resultMessage =
    document.getElementById("resultMessage");


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let selectedAnswers = [];


// ==========================================
// START QUIZ
// ==========================================

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswers = [];


    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    scoreDisplay.textContent =
        "Score: 0";


    showQuestion();

}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const current =
        questions[currentQuestion];


    // Question number

    questionNumber.textContent =
        `Question ${
            currentQuestion + 1
        } of ${
            questions.length
        }`;


    // Question type

    questionType.textContent =
        current.type;


    // Question

    question.textContent =
        current.question;


    // Progress

    const progress =
        ((currentQuestion) /
        questions.length) * 100;


    progressBar.style.width =
        `${progress}%`;


    // Clear old options

    optionsContainer.innerHTML = "";


    selectedAnswers = [];


    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestion ===
        questions.length - 1
            ? "Finish Quiz →"
            : "Next Question →";


    // Create options

    current.options.forEach(
        (optionText, index) => {

            const option =
                document.createElement(
                    "button"
                );


            option.className =
                "option";


            option.textContent =
                optionText;


            option.addEventListener(
                "click",
                () => selectOption(
                    option,
                    index
                )
            );


            optionsContainer.appendChild(
                option
            );

        }
    );

}


// ==========================================
// SELECT OPTION
// ==========================================

function selectOption(
    optionElement,
    index
) {

    const current =
        questions[currentQuestion];


    // SINGLE SELECT

    if (
        current.type ===
        "SINGLE SELECT"
    ) {

        const allOptions =
            document.querySelectorAll(
                ".option"
            );


        allOptions.forEach(
            option => {

                option.classList.remove(
                    "selected"
                );

            }
        );


        optionElement.classList.add(
            "selected"
        );


        selectedAnswers = [index];

    }


    // MULTI SELECT

    else {

        optionElement.classList.toggle(
            "selected"
        );


        if (
            selectedAnswers.includes(index)
        ) {

            selectedAnswers =
                selectedAnswers.filter(
                    item =>
                        item !== index
                );

        }

        else {

            selectedAnswers.push(index);

        }

    }


    // Enable next button

    nextBtn.disabled =
        selectedAnswers.length === 0;

}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer() {

    const current =
        questions[currentQuestion];


    let correct = false;


    // SINGLE SELECT

    if (
        current.type ===
        "SINGLE SELECT"
    ) {

        correct =
            selectedAnswers.length === 1 &&
            selectedAnswers[0] ===
            current.answer;

    }


    // MULTI SELECT

    else {

        const userAnswer =
            [...selectedAnswers]
                .sort((a, b) => a - b);


        const correctAnswer =
            [...current.answer]
                .sort((a, b) => a - b);


        correct =
            JSON.stringify(userAnswer) ===
            JSON.stringify(correctAnswer);

    }


    if (correct) {

        score++;

    }


    scoreDisplay.textContent =
        `Score: ${score}`;


    return correct;

}


// ==========================================
// NEXT QUESTION
// ==========================================

nextBtn.addEventListener(
    "click",
    () => {

        checkAnswer();


        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        }

        else {

            showResult();

        }

    }
);


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    quizScreen.classList.add(
        "hidden"
    );


    resultScreen.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        score;


    correctAnswers.textContent =
        score;


    wrongAnswers.textContent =
        questions.length - score;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect score! Excellent work! 🎉";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "Great job! You have excellent knowledge! 👏";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "Good work! Keep practicing! 💪";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "Not bad! A little more practice will help! 📚";

    }

    else {

        resultMessage.textContent =
            "Keep learning and try again! 🚀";

    }


    progressBar.style.width =
        "100%";

}


// ==========================================
// RESTART
// ==========================================

restartBtn.addEventListener(
    "click",
    startQuiz
);


// ==========================================
// START BUTTON
// ==========================================

startBtn.addEventListener(
    "click",
    startQuiz
);