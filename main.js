console.log("js is loaded");

// 1. Define Variables
const INIT_STATE = {
  score: 40,
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


function startGame() {
  console.log("starting game");
  cardLayout();
  setTimeout(init, 10);
}

startBtnEl.addEventListener("click", startGame);


let flippedCards = [];


function cardLayout() {
  console.log("card layout is done and grid is made");
  shuffleArray(imagesArray);
  gridMaker(shuffledArray, 6);
  smartCells();
}

let shuffledArray = [];
function shuffleArray(arr) {
  const generatedIndex = [];
  for (let i = 0; i < arr.length; i++) {
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

function smartCells(){
  grid.forEach(function (cell){
    for (let i = 0; i < cell.length; i++) {
      if (typeof cell[i] === "string"){
        const img= document.createElement("img");
        img.setAttribute("src", cell[i]);
      //trying to name an id based on tehimage file name
        const letterArray = cell[i].split("");
        const capitalLetter = letterArray.filter(function (letter) {
        //to find cell[i] name
        return letter === letter.toUpperCase();
        console.lof(capitalLetter)
      });
        if (capitalLetter) {
          img.setAttribute("id", capitalLetter[1]);
          document.getElementById("button-wrapper").appendChild(img);
          img.addEventListener("click", handleBtnClick);
        }
      };
    }
  })
}

//eventlistener
function handleBtnClick(e) {
  //compare two selected elements innerHTML
  const card = e.target;
  console.log(card);
  const clickedBtnId = card.id;
  console.log(clickedBtnId);
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(clickedBtnId);}
  if (flippedCards.length === 2) {
    console.log(flippedCards);
      //nested if statements -> now we add second choice to the array let's compare these two
      // we need to declare if statement again in order to make the event listener to reach  the point to compare two elements -hala ke push kardim o length dota shod: biain compare konim
    if (flippedCards[0] === flippedCards[1]) {
        //how to make flipped match cards stay????
      alert("Matching Cards");
      score = parseInt(scoreStatEl.innerText) + 1;
      state.score = score; 
        //flippedCards[0].removeEventListener("click",handleBtnClick )
        //flippedCards[1].removeEventListener("click",handleBtnClick )
    } else {
        //if they are not matched:
        //flip cards back
        //remove added "flipped" class in case cards are not matched
      flippedCards[0].classList.remove("flipped");
      flippedCards[1].classList.remove("flipped");
      console.log(flippedCards);
      score = parseInt(scoreStatEl.innerText) - 1;
      state.score = score; // to update state object for runGame()
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
  timer = setInterval(function () {
    seconds++;
    timerEl.innerText = seconds + " Seconds";
  }, 10000);
}
function statusChecker() {
  timerInterval = 2000;
  statusStat = setInterval(runGame, timerInterval);
}
function runGame() {
  let keepRunning = true;
  let currentStats = [];
  for (let key in state) {
    state[key] = score; //to update score
    currentStats.push(score);
    if (score <= 0) {
      keepRunning = false;
      console.log("GAME OVER");
      gameOver();
    }
  }
  // for (let stat of currentStats) {
  //     if (stat <= 0) {
  //         keepRunning = false;
  //         console.log("GAME OVER");
  //         gameOver();
  //     }
  return keepRunning;
}
function render() {
  state.score = parseInt(scoreStatEl.innerText);
}
function gameOver() {
  clearInterval(timerDisplay);
}
