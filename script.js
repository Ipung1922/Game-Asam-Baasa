
// Game variables
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let questionsAnswered = 0;
let gameQuestions = [];

// Questions database
const questions = [
    {
        substance: "Air Lemon",
        question: "Apa sifat zat dari air lemon?",
        answer: "Asam",
        explanation: "Air lemon mengandung asam sitrat yang memberikan rasa masam."
    },
    {
        substance: "Sabun",
        question: "Apa sifat zat dari sabun?",
        answer: "Basa",
        explanation: "Sabun bersifat basa karena dapat menetralkan minyak dan kotoran."
    },
    {
        substance: "Air Murni",
        question: "Apa sifat zat dari air murni?",
        answer: "Netral",
        explanation: "Air murni memiliki pH 7 yang berarti bersifat netral."
    },
    {
        substance: "Cuka",
        question: "Apa sifat zat dari cuka?",
        answer: "Asam",
        explanation: "Cuka mengandung asam asetat yang memberikan rasa asam."
    },
    {
        substance: "Pasta Gigi",
        question: "Apa sifat zat dari pasta gigi?",
        answer: "Basa",
        explanation: "Pasta gigi bersifat basa untuk menetralkan asam di mulut."
    },
    {
        substance: "Air Garam",
        question: "Apa sifat zat dari air garam?",
        answer: "Netral",
        explanation: "Larutan garam (NaCl) dalam air bersifat netral."
    },
    {
        substance: "Jeruk",
        question: "Apa sifat zat dari jeruk?",
        answer: "Asam",
        explanation: "Buah jeruk mengandung asam sitrat dan asam askorbat (vitamin C)."
    },
    {
        substance: "Baking Soda",
        question: "Apa sifat zat dari baking soda?",
        answer: "Basa",
        explanation: "Baking soda (NaHCO3) bersifat basa dengan pH sekitar 8-9."
    },
    {
        substance: "Gula",
        question: "Apa sifat zat dari gula?",
        answer: "Netral",
        explanation: "Gula tidak bersifat asam maupun basa ketika dilarutkan dalam air."
    },
    {
        substance: "Kopi",
        question: "Apa sifat zat dari kopi?",
        answer: "Asam",
        explanation: "Kopi bersifat sedikit asam dengan pH sekitar 5."
    },
    {
        substance: "Pembersih Lantai",
        question: "Apa sifat zat dari pembersih lantai?",
        answer: "Basa",
        explanation: "Kebanyakan pembersih lantai bersifat basa untuk menghilangkan kotoran berminyak."
    },
    {
        substance: "Air Hujan",
        question: "Apa sifat zat dari air hujan normal?",
        answer: "Asam",
        explanation: "Air hujan normal sedikit asam (pH sekitar 5.6) karena bereaksi dengan CO2 di udara."
    },
    {
        substance: "Susu",
        question: "Apa sifat zat dari susu segar?",
        answer: "Netral",
        explanation: "Susu segar hampir netral dengan pH sekitar 6.5-6.7."
    },
    {
        substance: "Pembersih Toilet",
        question: "Apa sifat zat dari pembersih toilet?",
        answer: "Asam",
        explanation: "Pembersih toilet biasanya asam untuk menghilangkan kerak mineral."
    },
    {
        substance: "Ammonia",
        question: "Apa sifat zat dari ammonia?",
        answer: "Basa",
        explanation: "Ammonia (NH3) adalah basa kuat yang digunakan dalam berbagai pembersih rumah tangga."
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const quitBtn = document.getElementById('quit-btn');
const questionElement = document.getElementById('question');
const substanceElement = document.getElementById('substance');
const questionCounter = document.getElementById('question-counter');
const timeLeftElement = document.getElementById('time-left');
const progressBar = document.getElementById('progress-bar');
const currentScoreElement = document.getElementById('current-score');
const scoreDisplay = document.getElementById('score-display');
const questionCard = document.getElementById('question-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const explanation = document.getElementById('explanation');
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

// Button elements
const acidBtn = document.querySelector('.btn-acid');
const baseBtn = document.querySelector('.btn-base');
const neutralBtn = document.querySelector('.btn-neutral');

// Shuffle questions array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start game
function startGame() {
    // Shuffle questions and select first 10
    const shuffledQuestions = shuffleArray([...questions]).slice(0, 10);
    gameQuestions = shuffledQuestions;
    
    // Reset game variables
    currentQuestion = 0;
    score = 0;
    questionsAnswered = 0;
    
    // Show game screen
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    
    // Show first question
    showQuestion();
}

// Show question
function showQuestion() {
    // Reset timer
    timeLeft = 10;
    timeLeftElement.textContent = timeLeft;
    
    // Update progress
    progressBar.style.width = `${(currentQuestion / gameQuestions.length) * 100}%`;
    questionCounter.textContent = `Pertanyaan ${currentQuestion + 1}/${gameQuestions.length}`;
    
    // Set question and substance
    const question = gameQuestions[currentQuestion];
    questionElement.textContent = question.question;
    substanceElement.textContent = question.substance;
    
    // Reset card state
    questionCard.classList.remove('flipped');
    
    // Start timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    
    // Enable buttons
    acidBtn.disabled = false;
    baseBtn.disabled = false;
    neutralBtn.disabled = false;
}

// Update timer
function updateTimer() {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;
    
    // Change color when time is running out
    if (timeLeft <= 3) {
        document.getElementById('timer').classList.add('bg-red-100', 'text-red-800', 'shake');
        document.getElementById('timer').classList.remove('bg-blue-100', 'text-blue-800');
    }
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        timeUp();
    }
}

// Time's up
function timeUp() {
    // Disable buttons
    acidBtn.disabled = true;
    baseBtn.disabled = true;
    neutralBtn.disabled = true;
    
    // Show feedback
    showFeedback(null, false);
}

// Check answer
function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    
    // Disable buttons
    acidBtn.disabled = true;
    baseBtn.disabled = true;
    neutralBtn.disabled = true;
    
    const correctAnswer = gameQuestions[currentQuestion].answer;
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
        score++;
        currentScoreElement.textContent = score;
        scoreDisplay.classList.remove('hidden');
    }
    
    showFeedback(selectedAnswer, isCorrect);
}

// Show feedback
function showFeedback(selectedAnswer, isCorrect) {
    const question = gameQuestions[currentQuestion];
    
    // Set feedback content
    if (selectedAnswer === null) {
        feedbackIcon.innerHTML = '<i class="fas fa-hourglass-end text-yellow-500"></i>';
        feedbackText.textContent = 'Waktu Habis!';
        feedbackText.className = 'text-2xl font-bold mb-2 text-yellow-600';
    } else if (isCorrect) {
        feedbackIcon.innerHTML = '<i class="fas fa-check-circle text-green-500"></i>';
        feedbackText.textContent = 'Benar!';
        feedbackText.className = 'text-2xl font-bold mb-2 text-green-600';
    } else {
        feedbackIcon.innerHTML = '<i class="fas fa-times-circle text-red-500"></i>';
        feedbackText.textContent = 'Salah!';
        feedbackText.className = 'text-2xl font-bold mb-2 text-red-600';
    }
    
    explanation.textContent = question.explanation;
    
    // Flip card to show feedback
    questionCard.classList.add('flipped');
    
    // Move to next question after delay
    setTimeout(nextQuestion, 2000);
}

// Next question
function nextQuestion() {
    currentQuestion++;
    questionsAnswered++;
    
    if (currentQuestion < gameQuestions.length) {
        showQuestion();
        
        // Reset timer style
        document.getElementById('timer').classList.remove('bg-red-100', 'text-red-800', 'shake');
        document.getElementById('timer').classList.add('bg-blue-100', 'text-blue-800');
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = (score / gameQuestions.length) * 100;
    
    // Set results content
    finalScore.textContent = `${score}/${gameQuestions.length}`;
    
    if (percentage >= 80) {
        resultIcon.innerHTML = '<i class="fas fa-trophy text-yellow-500"></i>';
        resultTitle.textContent = 'Luar Biasa!';
        resultTitle.className = 'text-3xl font-bold mb-4 text-yellow-600';
        resultMessage.textContent = 'Pengetahuanmu tentang asam basa sangat mengagumkan! Pertahankan ya!';
    } else if (percentage >= 50) {
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up text-blue-500"></i>';
        resultTitle.textContent = 'Bagus!';
        resultTitle.className = 'text-3xl font-bold mb-4 text-blue-600';
        resultMessage.textContent = 'Hasilmu sudah cukup baik, tapi masih bisa ditingkatkan lagi!';
    } else {
        resultIcon.innerHTML = '<i class="fas fa-book text-purple-500"></i>';
        resultTitle.textContent = 'Belajar Lagi';
        resultTitle.className = 'text-3xl font-bold mb-4 text-purple-600';
        resultMessage.textContent = 'Jangan menyerah! Pelajari lagi materi asam basa dan coba lagi!';
    }
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
quitBtn.addEventListener('click', () => {
    startScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
});

acidBtn.addEventListener('click', () => checkAnswer('Asam'));
baseBtn.addEventListener('click', () => checkAnswer('Basa'));
neutralBtn.addEventListener('click', () => checkAnswer('Netral'));

// Initialize
document.getElementById('timer').classList.add('bg-blue-100', 'text-blue-800');
