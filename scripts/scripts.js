const quizQuestions = [
    {
        question: "In The Matrix, what color pill does Neo take?",
        questionNum: 1,
        answers: {
            a: "Red",
            b: "Blue",
            c: "Green",
            d: "Yellow"
        },
        correctAnswer: "a"
    },
    {
        question: "Which 1994 film features the quote, 'Life is like a box of chocolates'?",
        questionNum: 2,
        answers: {
            a: "Pulp Fiction",
            b: "The Shawshank Redemption",
            c: "Forrest Gump",
            d: "The Lion King"
        },
        correctAnswer: "c"
    },
    {
        question: "Who played Jack Dawson in Titanic?",
        questionNum: 3,
        answers: {
            a: "Brad Pitt",
            b: "Leonardo DiCaprio",
            c: "Johnny Depp",
            d: "Tom Cruise"
        },
        correctAnswer: "b"
    }
];

// DOM Elements
const start = document.getElementById("start");
const instructions = document.getElementById("instructions");
const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const checkQuesAnswer = document.getElementById("check");
const navigation = document.querySelector(".navigation");

// state variables
let questionIndexVal = 0;
let selectedAnswers = [];
let correctAnswers = quizQuestions.map(q => q.correctAnswer);

function showQuestions() {
    const singleQuestion = quizQuestions[questionIndexVal];
    quiz.innerHTML = `
        <div data-id-quesnum=${singleQuestion[questionIndexVal]}>
            <h3>${singleQuestion.question}</h3>
            <div class="questions">
                ${Object.entries(singleQuestion.answers).map(([key, value], idx) => `
                    <div class="question">
                        <input type="radio" name="question" id="question${singleQuestion.questionNum}-${idx+1}" value=${key}>
                        <label for="question${singleQuestion.questionNum}-${idx+1}" class="option">${value}</label>
                    </div>
                    `).join('')}
            </div>
        </div>
    `;
    questionIndexVal++;
    showHideButtons();
}

start.addEventListener("click", startQuiz);

function startQuiz() {
    showQuestions();
    instructions.classList.add("hide");
    start.classList.add("hide");
}

function showHideButtons() {
    nextBtn.classList.toggle("show", questionIndexVal < quizQuestions.length);
    submitBtn.classList.toggle("show", questionIndexVal == quizQuestions.length);
    checkQuesAnswer.classList.add("show");
}

nextBtn.addEventListener("click", nextQuestion);
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="question"]:checked');
    if (!selectedAnswer) {
        alert("Select an Answer Choice");
        return;
    }
    selectedAnswers.push(selectedAnswer.value);
    showQuestions();
}

checkQuesAnswer.addEventListener("click", checkAnswer);
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="question"]:checked');
    if (!selectedAnswer) {
        alert("Select an Answer Choice");
    } else if (selectedAnswer.value == correctAnswers[questionIndexVal - 1]) {
        alert("Correct Answer")
    } else {
        alert("Incorrect Answer")
    }
}

submitBtn.addEventListener("click", submitQuiz)
function submitQuiz() {
    const selectedAnswer = document.querySelector('input[name="question"]:checked');
    if (!selectedAnswer) {
        alert("Select an Answer Choice");
        return;
    }
    selectedAnswers.push(selectedAnswer.value);
    calculateScore();
    showRestartButton();
}

function calculateScore() {
    let currentCount = 0;

    for (i=0; i<correctAnswers.length; i++) {
        if (selectedAnswers[i] == correctAnswers[i]) {
            currentCount++;
        }
    }

    let percentPerQues = 100 / correctAnswers.length;

    let score = percentPerQues * currentCount;

    finalAlert(score.toFixed(2));
}

function finalAlert(score) {
    if (score >= 80) {
        alert(`You Scored: ${score}%. You're a movie buff!`);
    } else if (score >= 50) {
        alert(`You Scored: ${score}%. Are you sure you watch movies?`);
    } else {
        alert(`Yikes, you Scored: ${score}%.`);
    }
}

function showRestartButton() {
    const restart = document.createElement('button');
    restart.innerText = "Restart";
    restart.id = "restart";
    checkQuesAnswer.classList.remove("show");
    submitBtn.classList.remove("show");
    navigation.append(restart);
    restart.addEventListener("click", resetQuiz);
}

function resetQuiz() {
    questionIndexVal = 0;
    selectedAnswers = [];
    showQuestions();
    document.getElementById("restart").remove();
}


