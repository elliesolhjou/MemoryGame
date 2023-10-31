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
//console.log(startBtnEl)


startBtnEl.addEventListener("click", startGame);

function startGame() {
  console.log("starting game");
  cardLayout();
  setTimeout(init, 10);
}


function cardLayout() {
  console.log("card layout is done and grid is made");
  shuffleArray(imagesArray);
  gridMaker(shuffledArray, 6);
  smartCells();
}

let shuffledArray = [];
function shuffleArray(arr) {
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

const grid = [];
function gridMaker(shuffledArray, chunkSize) {
  for (let i = 0; i < shuffledArray.length; i += chunkSize) {
    grid.push(shuffledArray.slice(i, i + chunkSize));
  }
}

function smartCells() {
  grid.forEach(function (cell) {
    for (let i = 0; i < cell.length; i++) {
      if (typeof cell[i] === "string") {
        const img = document.createElement("img");
        img.setAttribute("src", cell[i]);
        //trying to name an id based on tehimage file name
        const letterArray = cell[i].split("");
        const capitalLetter = letterArray.filter(function (letter) {
          //to find cell[i] name
          return letter === letter.toUpperCase();
          console.lof(capitalLetter);
        });
        if (capitalLetter) {
          img.setAttribute("id", capitalLetter[1]);
          document.getElementById("button-wrapper").appendChild(img);
          img.addEventListener("click", handleBtnClick);
        }
      }
    }
  });
}
let flippedCards = [];

//eventlistener
// let flippedCards = [];
function handleBtnClick(e) {
  const card = e.target;
  console.log(card);
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      card1Id = flippedCards[0].getAttribute("id");
      card2Id = flippedCards[1].getAttribute("id");
      console.log(card1Id, card2Id);
      if (card1Id === card2Id) {
        console.log(flippedCards);
        //console.log(flippedCards[0]);
        //nested if statements -> now we add second choice to the array let's compare these two
        // we need to declare if statement again in order to make the event listener to reach  the point to compare two elements -hala ke push kardim o length dota shod: biain compare konim

        //how to make flipped match cards stay????
        console.log("Matching Cards");
        score = parseInt(scoreStatEl.innerText) + 1;
        scoreStatEl.innerText = score;
        state.score = score;
        console.log(state.score);
        flippedCards[0].style.visibility = "hidden";
        flippedCards[1].style.visibility = "hidden";
        //flippedCards[0].setAttribute("disabled", "true");
        //flippedCards[0].style.display="none"
        //flippedCards[1].style.display="none"
        //flippedCards[1].setAttribute("disabled", "true");
      } else {
        //flippedCards[0].classList.remove("flipped");
        //flippedCards[1].classList.remove("flipped");
        console.log("not Matching Cards");
        score = parseInt(scoreStatEl.innerText) - 1;
        scoreStatEl.innerText = score;
        state.score = score; // to update state object for runGame()
        console.log(score);
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
  console.log("reset works")
  document.getElementById("button-wrapper").style.display = "none";
  clearInterval(statusStat)
}
