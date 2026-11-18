const quizData = {
    general: [
        {
            question: "what is the capital city of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Bamgkok"],
            answer: 2,
            fact: "Tokyo is the most populous metropolitan area in the world with over 37 million residents."
        },
        {
            question: "which planet is known as the Red Planet?",
            options: ["venus", "mars", "jupiter", "saturn"],
            answer: 1,
            fact: "Mars looks red because of thr iron oxide (rust) coverinr its surface."
        },
        {
            question: "How many continents are there on earth?",
            options: ["5", "6", "7", "8"],
            answer: 2,
            fact: "Asia is the largest continen, covering about 30% of Earth's total land area."
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            Answer: 2,
            fact: "The Ppacific Ocean covers more than 30% of Earth's surface"
        }
    ],
    gaming: [
        {
            question: "Which video game features a character named Master Chief?",
            options: ["Halo", "Call of duty", "Gears of war", "Destiny"],
            answer: 0,
            fact: " Halo: Combat Evolved was released in 2001 as a launch title for the original xbox."
        },
        {
            question: "What is the best-selling video game of all time?",
            options: ["Tetris", "Grand Theft Auto V", "Minecraft", "Wii Sports"],
            answer: 2,
            fact: "Minecraft is the best-selling video game of all time."
        },
        {
           question: "In which year was the original playstation  released in Japan?",
           options: [ "1992", "1994", "1996", "1998"],
           answer: 1,
           fact: "The original PlayStation was the first console to ship over 100 million units."
        },
        {
            question: "Who is Nintendo's famous Italian plumber mascot?",
            options: ["Luigi", "Mario", "Link", "Sonic"],
            answer: 1,
            fact: "Mario originally appeared under the name'Jumpman' in the 1981 arcade game Donkey Kong."
        }
    ],
    sports: [
        {
            question: "Which country won the first ever FIFA World Cup in 1930?",
            options: ["Brazil", "Italy", "Argentina", "Uruguay"],
            answer: 3,
            fact: "Uruguay hosted the tournament and defeated Argentina 4-2 in the final."
        },
        {
            question: "How many players are on a standard basketball on the court?",
            options: ["5", "6", "7", "11"],
            answer: 0,
            fact: " Basketball was invented by Dr. James Naismith in 1891 using peach baskets."
        },
        {
            question:" Which tennis player has won the most Grand Slam men's singles titles?",
            options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampers"],
            answer: 2,
            fact: "Novak Djokpvic surpassed 24 Grand Slam singles titles in his career"
        },
        {
            question: "How often are the Summer Olymic Games held?",
            options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
            answer: 2,
            fact: "The first modern Olympic Games were held in Athens.Greece, in 1896."
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Fe", "Au", "Gd"],
            answer: 2,
            fact: "The symbol Au comes from 'Aurum' the Latin word for gold."
        },
        {
            question: "How many bones are in the adult human body?",
            options: ["186", "206", "226", "250"],
            answer: 1,
            fact: "Babies are born with around 270 bones, which fuse together as they grow"
        },
        {
            question: "What is the fastest land animal in the world?",
            options: ["Cheetah", "Lion", "Gazelle", "Horse"],
            answer: 0,
            fact: " A cheetah can reach speeds of up to 122 km/h in short bursts"
        },
        {
            question: "Which gas do plants absorb from the atmosphere during photosynthesis",
            options: ["oxygen", "Nitrogen", "Hydrogen", "CarbonDioxode"],
            answer: 3,
            fact: "plants absorb carbon dioxode and release oxygen back into the air"
        }
    ],
    movies: [
        {
            question: "Who directed the sci-fi movie 'incepption'?",
            options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"],
            answer: 1,
            fact: "Released in 2010 and won four Academy Awards",
        },
        {
            question: "What is the name of the fictional African country in 'Black Pnather'?",
            options: ["Wakanda", "Sokovia", "Genovia", "Zamunda"],
            answer: 0,
            fact: "In the Marvel universe, Wakanda is the world's only source of the metal Vibra"
        },
        {
            question: "Which animated movie features a coeboy toy named Woody?",
            options: ["Shrek", "Finding Nemo", "Toy Story", "Monsters, Inc"],
            answer: 2,
            fact: "Released in 1995, 'Toy Store' was the first feature-length computer-animated"
        },
        {
            question: "In 'The Matrix' which color pill does neo choose to take?",
            options: ["Blue", "Red", "Green", "Yellow"],
            answer: 1,
            fact: "choosing the red pill allows neo to see the truth about the simulated world"
        },
    ]
};

let currentCategory ="";
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;
let playerName = "Player";

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerNameInput = document.getElementById("player-name");
const displayName = document.getElementById("display-name");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const funFactText = document.getElementById("fun-fact");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

document.querySelectorAll(".cat-btn").forEach(button=> {
    button.addEventListener("click", () => {
        const enteredName = playerNameInput.value.trim();
        playerName = enteredName !== "" ? enteredName : "Player";
        currentCategory = button.getAttribute("data-category");

        currentQuestionIndex = 0;
        score = 0;
        displayName.textContent = playerName;
        scoreDisplay.textContent = score;

        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");

        loadQuestion();
    });
});

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 20;
    timerDisplay.textContent = timeLeft;

    funFactText.classList.add("hidden");
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const questions = quizData[currentCategory];
    const currentQ = questions[currentQuestionIndex];

    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQ.question;

    currentQ.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function selectAnswer(selectedIndex, selectedBtn) {
    clearInterval(timerInterval);
    const questions = quizData[currentCategory];
    const currentQ = questions[currentQuestionIndex];
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQ.answer) {
        selectedBtn.classList.add("correct");
        score += 10 + timeLeft; 
        scoreDisplay.textContent = score;
    } else {
        selectedBtn.classList.add("wrong");
        allButtons[currentQ.answer].classList.add("correct");
    }

    funFactText.textContent = `Fun Fact: ${currentQ.fact}`;
    funFactText.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

function handleTimeOut() {
    const questions = quizData[currentCategory];
    const currentQ = questions[currentQuestionIndex];
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => btn.disabled = true);
    allButtons[currentQ.answer].classList.add("correct");
    funFactText.textContent = `Times up! ${currentQ.fact}`;
    funFactText.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    const questions = quizData[currentCategory];

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});
function showResults() {
    progressBar.style.width = "100%";
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const savedHighScore = Number(localStorage.getItem("brainiacHighScore")) || 0;
    const highScore = Math.max(score, savedHighScore);
    localStorage.setItem("brainiacHighScore", highScore);

    document.getElementById("final-score").textContent = score;
    document.getElementById("high-score").textContent = highScore;

    const finalMsg = document.getElementById("final-message");
    if (score>= 50) {
        finalMsg.textContent = `Amazing job, ${playerName}! You're a true genius!`
    } else {
        finalMsg.textContent = `Good effort, ${playerName}!Play again to beat the high score`;
    }
}

restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
