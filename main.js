console.log("js is loaded");

// 1. Define Variables
const INIT_STATE = {
  score: 5,
};

// const gridCells = [
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0"],
// ];

const imagesArray = [
  "images/A.png",
  "images/B.png",
  "images/C.png",
  "images/D.png",
  "images/E.png",
  "images/F.png",
  "images/H.png",
  "images/J.png",
  "images/K.png",
  "images/L.png",
  "images/P.png",
  "images/R.png",
  "images/S.png",
  "images/T.png",
  "images/W.png",
  "images/Y.png",
  "images/Z.png",
  "images/M.png",
  "images/A.png",
  "images/B.png",
  "images/C.png",
  "images/D.png",
  "images/E.png",
  "images/F.png",
  "images/H.png",
  "images/J.png",
  "images/K.png",
  "images/L.png",
  "images/P.png",
  "images/R.png",
  "images/S.png",
  "images/T.png",
  "images/W.png",
  "images/Y.png",
  "images/Z.png",
  "images/M.png",
];

let score;
let state;
let timer; //setInterval Id
let timerInterval;
let seconds = 0;
state = { ...INIT_STATE };

// 2. DOM Captures
const scoreStatEl = document.querySelector("#score-stat");
const startEl = document.querySelector("#start-btn");
//const cards = document.querySelectorAll(".card");
const startBtnEl = document.getElementById("start-btn");
const timerEl = document.getElementById("timer-stat");
const btnWrapperEl = document.querySelectorAll("button-wrapper button");
const resetBtnEl = document.querySelector("#reset-btn");
const gridContainerEl = document.getElementById("grid-container");
//const blankCardContainerEl = document.getElementsByClassName("blank-card-container");
console.log(gridContainerEl);
//console.log(blankCardContainerEl);
console.log(startBtnEl);
const numRows = 6;
const numColumns = 6;

startBtnEl.addEventListener("click", startGame);
resetBtnEl.addEventListener("click", reset);


function startGame() {
  console.log("starting game");
  cardLayout();
  setTimeout(init, 10);
}

function cardLayout() {
  console.log("card layout is done and grid is made");
  shuffleImages(imagesArray);
  gridMaker(shuffleImages);
  //smartCells();
}

let shuffledArray = [];
function shuffleImages(arr) {
  const generatedIndex = [];
  while (generatedIndex.length !== arr.length) {
    console.log(generatedIndex.length);
    const generateNum = Math.floor(Math.random() * 36);
    if (!generatedIndex.includes(generateNum)) {
      shuffledArray.push(imagesArray[generateNum]);
      generatedIndex.push(generateNum);
    }
  }
  return shuffledArray;
}

console.log(gridContainerEl);
function gridMaker() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.classList.add("card-front");
      gridItem.classList.add("flip");

      const gridItemContent = document.createElement("div")
      gridItemContent.classList.add("solid-color")
      gridItemContent.style.zIndex="10"

      const randomImagePath = shuffledArray[0];
      //console.log(randomImagePath);
      
      const imageIdLetters = randomImagePath.split("");
      //console.log(imageIdLetters)
      const imageIdFinder = imageIdLetters.filter(function (imageIdLetter) {
        return imageIdLetter === imageIdLetter.toUpperCase();
      });
      console.log(imageIdFinder[1]);
      if (imageIdFinder) {
        gridItem.setAttribute("id", imageIdFinder[1]);
        gridItemContent.setAttribute("id", imageIdFinder[1])
      }
      //console.log(randomImagePath);
      //console.log(typeof randomImagePath);
      //console.log(shuffledArray.length);
      shuffledArray.shift();
      //console.log(shuffledArray.length);
      //console.log(shuffledArray);

      gridItem.style.backgroundImage = `url('${randomImagePath}')`;
      gridItem.style.backgroundSize = "cover";

      gridItem.appendChild(gridItemContent)
      gridContainerEl.appendChild(gridItem);
      gridItem.addEventListener("click", handleBtnClick);
   
    }
  }
}
document.querySelectorAll(".solid-card").forEach(function(card){
  card.addEventListener.onclick=function(e){
  gridItemContent.visibility="hidden"
  }
} )

let flippedCards = [];

//eventlistener

function handleBtnClick(e) {
  const card = e.target;
  card.classList.remove("card-front");
  card.classList.add("card-back");
  //console.log(card);
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      card1Id = flippedCards[0].getAttribute("id");
      card2Id = flippedCards[1].getAttribute("id");
      console.log(card1Id, card2Id);
      if (card1Id === card2Id) {
        console.log(flippedCards);
        console.log("Matching Cards");
        score = parseInt(scoreStatEl.innerText) + 1;
        scoreStatEl.innerText = score;
        state.score = score;
        console.log(state.score);
        flippedCards[0].style.visibility = "hidden";        
        flippedCards[1].style.visibility = "hidden";
      } else {
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
        console.log("not Matching Cards");
        score = parseInt(scoreStatEl.innerText) - 1;
        scoreStatEl.innerText = score;
        state.score = score; // to update state object for runGame()
        console.log(score);
        flippedCards[0].style.visibility = "visible";
        flippedCards[1].style.visibility = "visible";
        
          //setTimeout
        //console.log(state.score)
      }
      flippedCards = [];
    }
  }
}

function init() {
  console.log("initializedd helper functions");
  timerDisplay();
  statusChecker();
  render();
}
function timerDisplay() {
  console.log("timer should start");
  timer = setInterval(function () {
    seconds++;
    timerEl.innerText = seconds + " Seconds";
  }, 1000);
}
function statusChecker() {
  console.log("status checker should work");
  timerInterval = 1000;
  statusStat = setInterval(runGame, timerInterval);
}
function runGame() {
  console.log("run game should work");
  let keepRunning = true;
  let currentStats = [];
  for (let key in state) {
    state[key] = score; //to update score
    currentStats.push(score);
    if (score <= 0) {
      keepRunning = false;
      console.log("GAME OVER");
      gameOver();
      scoreStatEl.innerText = "0";
    }
  }

  return keepRunning;
}
function render() {
  console.log("render should work");
  state.score = parseInt(scoreStatEl.innerText);
}
function gameOver() {
  console.log("game over works");
  clearInterval(timer);
  timerEl.innerText = "...";
  reset();
}
function reset() {
  console.log("reset works");
  setTimeout(function () {
    document.getElementById("button-wrapper").style.display = "none";
  }, 1000);
  clearInterval(statusStat);
  setTimeout(function () {
    window.location.reload();
  }, 1000);
}
