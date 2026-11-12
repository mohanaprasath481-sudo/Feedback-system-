
const questions = [
    {
        question: "What is your favourite programming language?",
        options: ["Java", "Python", "JavaScript", "C++"]
    },
    {
        question: "How do you spend your free time?",
        options: ["Reading", "Playing Games", "Watching Movies", "Sports"]
    },
    {
        question: "Which technology interests you most?",
        options: ["Artificial Intelligence", "Web Development", "Cyber Security", "Cloud Computing"]
    },
    {
        question: "How often do you use the internet?",
        options: ["Always", "Daily", "Sometimes", "Rarely"]
    },
    {
        question: "What is your favourite food?",
        options: ["Pizza", "Biryani", "Burger", "Dosa"]
    },
    {
        question: "Which device do you use most?",
        options: ["Mobile", "Laptop", "Tablet", "Desktop"]
    },
    {
        question: "What is your learning preference?",
        options: ["Online Videos", "Books", "Practical Training", "Classroom Learning"]
    }
];

let selectedQuestions = [];
let currentQuestion = 0;
let answers = [];

// Random question selection
function shuffleQuestions() {
    let shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 5);
}

// Start Survey
function startSurvey() {

    selectedQuestions = shuffleQuestions();
    currentQuestion = 0;
    answers = [];

    document.querySelector(".welcome").style.display = "none";
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("surveyBox").style.display = "block";

    showQuestion();
}

// Display Question
function showQuestion() {

    let q = selectedQuestions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;

    document.getElementById("question").textContent = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {

        let label = document.createElement("label");
        label.className = "option";

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;

        radio.addEventListener("change", () => {
            document.querySelectorAll(".option").forEach(el => {
                el.classList.remove("selected");
            });

            label.classList.add("selected");
        });

        label.append(radio, document.createTextNode(" " + option));

        optionsDiv.appendChild(label);
    });

    let progress = ((currentQuestion) / selectedQuestions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("nextBtn").textContent =
        currentQuestion === selectedQuestions.length - 1
        ? "Submit Survey"
        : "Next Question";
}

// Next Question
function nextQuestion() {

    let selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    answers.push({
        question: selectedQuestions[currentQuestion].question,
        answer: selected.value
    });

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show Result
function showResult() {

    document.getElementById("surveyBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("progressBar").style.width = "100%";

    let result = "<strong>Your Answers:</strong><br><br>";

    answers.forEach((item, index) => {
        result += `${index + 1}. ${item.question}<br>
        Answer: ${item.answer}<br><br>`;
    });

    document.getElementById("resultText").innerHTML = result;
}

// Restart Survey
function restartSurvey() {

    document.getElementById("resultBox").style.display = "none";
    document.querySelector(".welcome").style.display = "block";
}
