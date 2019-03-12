// Const - these are variables that will not change, note this in your notebook

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// this will create our questions - lets are your friend.
let questions = [
  {
    question: "Where did George Washington have his own Brewhouse?",
    imgSrc: "assets/images/GW.jpg",
    choiceA: "Mt. Vernon",
    choiceB: "Mt. Rushmore",
    choiceC: "Virginia",
    correct: "A"
  },
  {
    question: "Where is the Miller Brewing Company located?",
    imgSrc: "assets/images/miller.jpg",
    choiceA: "Chicago, IL",
    choiceB: "Lincoln, NE",
    choiceC: "Milwuakee, WI",
    correct: "C"
  },
  {
    question: "Which mountains are on the Coors Light label?",
    imgSrc: "assets/images/coors.jpeg",
    choiceA: "Arapahoe Basin",
    choiceB: "Pikes Peak",
    choiceC: "Wilson Peak",
    correct: "C"
  },
  {
    question: "Who owns Old Milwuakee?",
    imgSrc: "assets/images/oldm.png",
    choiceA: "Anheuser-Busch",
    choiceB: "Pabst",
    choiceC: "Miller Coors",
    correct: "B"
  },
  {
    question: "Where is the original Heineken brewery located?",
    imgSrc: "assets/images/hein.webp",
    choiceA: "Amsterdam",
    choiceB: "Brussels",
    choiceC: "Berlin",
    correct: "A"
  }
];

// Creating variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// this will render  questions
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);


// START QUIZ
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// this is for our progress bar on the bottom right
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// Counter Functions

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red - Incorrect
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// CHECK ANSWER

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}



