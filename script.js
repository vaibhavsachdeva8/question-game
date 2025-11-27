const questions = [
    {
        question: "Which house at Hogwarts values bravery the most?",
        options: ["Slytherin", "Hufflepuff", "Gryffindor", "Ravenclaw"],
        correct: 2
    },
    {
        question: "What position does Harry play in Quidditch?",
        options: ["Keeper", "Chaser", "Beater", "Seeker"],
        correct: 3
    },
    {
        question: "What is the name of the wizarding newspaper?",
        options: ["The Magic Post", "The Daily Prophet", "Wizard Times", "The Hogwarts Herald"],
        correct: 1
    },
    {
        question: "Which spell is used to disarm your opponent?",
        options: ["Expelliarmus", "Lumos", "Avada Kedavra", "Alohomora"],
        correct: 0
    },
    {
        question: "Who is the Half-Blood Prince?",
        options: ["Harry Potter", "Albus Dumbledore", "Severus Snape", "Tom Riddle"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const replayBtn = document.getElementById("replay-btn");

function loadQuestion() {
    const q = questions[currentQuestion];

    // Fade animation reset
    questionText.classList.remove("fade");
    void questionText.offsetWidth;
    questionText.classList.add("fade");

    questionText.textContent = q.question;
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].correct;

    if (selected === correct) score += 10;

    Array.from(optionsDiv.children).forEach((btn, index) => {
        btn.disabled = true;
        if (index === correct) btn.style.background = "green";
        else if (index === selected) btn.style.background = "red";
    });

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    nextBtn.classList.add("hidden");

    if (currentQuestion < questions.length) loadQuestion();
    else finishQuiz();
});

function finishQuiz() {
    questionText.textContent = "";
    optionsDiv.innerHTML = "";
    nextBtn.classList.add("hidden");

    if (score >= 30) {
        resultDiv.textContent = `🏆✨ You Win! You scored ${score} points! ✨🏆`;
        resultDiv.style.color = "gold";
    } else {
        resultDiv.textContent = `💀 You Lost! You scored only ${score} points!`;
        resultDiv.style.color = "red";
    }

    resultDiv.classList.remove("hidden");
    replayBtn.classList.remove("hidden");
}

/* Replay Button */
replayBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultDiv.classList.add("hidden");
    replayBtn.classList.add("hidden");

    loadQuestion();
});

loadQuestion();
