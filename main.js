console.log("js is loaded");

// 1. Define Variables
const INIT_STATE = {
  score: 5,
};
let score;
let state;
let timer;
let timerInterval;
let seconds = 0;
state = { ...INIT_STATE };
let flippedCards = [];
let cards = [];
const numRows = 6;
const numColumns = 6;
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

// 2. DOM Captures
const scoreStatEl = document.querySelector("#score-stat");
const startBtnEl = document.getElementById("start-btn");
const timerEl = document.getElementById("timer-stat");
const btnWrapperEl = document.querySelectorAll("button-wrapper button");
const resetBtnEl = document.querySelector("#reset-btn");
const gridContainerEl = document.getElementById("grid-container");

//adding event listener
startBtnEl.addEventListener("click", startGame);
resetBtnEl.addEventListener("click", reset);


//definging utility functions
function startGame() {
  console.log("starting game");
  gridContainerEl.innerHTML = "";
  cardLayout();
  setTimeout(init, 10);
}

function cardLayout() {
  console.log("card layout is done and grid is made");
  shuffleImages(imagesArray);
  gridMaker(shuffleImages);
}

let shuffledArray = [];
function shuffleImages(arr) {
  const generatedIndex = [];
  while (generatedIndex.length !== arr.length) {
    const generateNum = Math.floor(Math.random() * 36);
    if (!generatedIndex.includes(generateNum)) {
      shuffledArray.push(imagesArray[generateNum]);
      generatedIndex.push(generateNum);
    }
  }
  return shuffledArray;
}

function gridMaker() {
  //nested loop to creat grid
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      //making main image card
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.classList.add("card-front");
      gridItem.classList.add("flip");
      // making cover card
      const gridItemContent = document.createElement("div");
      gridItemContent.classList.add("solid-color");
      gridItemContent.classList.add("card-front");
      gridItemContent.style.zIndex = "10";
      //for finding the ID to compare cards
      const randomImagePath = shuffledArray[0];
      const imageIdLetters = randomImagePath.split("");
      const imageIdFinder = imageIdLetters.filter(function (imageIdLetter) {
        return imageIdLetter === imageIdLetter.toUpperCase();
      });
      console.log(imageIdFinder[1]);
      if (imageIdFinder) {
        gridItem.setAttribute("id", imageIdFinder[1]);
        gridItemContent.setAttribute("id", imageIdFinder[1]);
      }
      //REMOVE FIRST ARRAY ITEM AFTER IT IS USED
      shuffledArray.shift();

      //assigning  shuffled images to my cards
      gridItem.style.backgroundImage = `url('${randomImagePath}')`;
      gridItem.style.backgroundSize = "cover";

      //adding elements to my HTML to show up
      gridContainerEl.appendChild(gridItem);
      gridItem.appendChild(gridItemContent);

      //event listener for top cards
      gridItemContent.addEventListener("click", handleBtnClick);
    }
  }
}

//eventlistener for cards
//card is solid top card to cover images

function handleBtnClick(e) {
  const card = e.target;
  card.style.visibility = "hidden";
  //for comparing purposes defind an emty array to hold values -> flipped cards
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
        //matched cards to remin face up
        flippedCards[0].style.visibility = "hidden";
        flippedCards[1].style.visibility = "hidden";
        //make them unavailable
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
        flippedCards = [];
      } else {
        console.log("not Matching Cards");
        score = parseInt(scoreStatEl.innerText) - 1;
        scoreStatEl.innerText = score;
        state.score = score;
        console.log(score);
        // to flip back give some time the user see the images
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
          setTimeout(() => {
            flippedCards[0].style.visibility = "visible";
            flippedCards[1].style.visibility = "visible";
            flippedCards = [];
          }, 100);
        }, 400);
      }
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
    if (seconds === 1) {
      timerEl.innerText = `Timer: ${seconds} second`;
    } else {
      timerEl.innerText = `Timer: ${seconds} seconds`;
    }
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
    state[key] = score;
    currentStats.push(score);
    console.log(currentStats)
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
  timerEl.innerText = "Game Over";
  setTimeout(reset, 5000);
}
function reset() {
  console.log("reset works");
  setTimeout(function () {
    document.getElementById("button-wrapper").style.display = "none";
  }, 1000);
  clearInterval(statusStat);
  setTimeout(function () {
    window.location.reload();
  }, 500);
}
