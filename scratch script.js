//if you want to iteray through grid instead of image array
//const board = document.querySelector('#grid-container')
//function makeBoard(){
//     const randImgLink=
//     for (let i=0; gridCells.length; i++){
//         for (let j=o; j<gridCells[i].length; j++){
//             let newCell=document.createElement("img")
//             newCell.setAttribute("src",randImgLink )
//             board.appendChild(newCell)
//         }
//     }
// }
//ShuffleIndex - needs to generate an array of two different number as an index for
//shuffleCards()




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

//3. Event Listeners
// cards.forEach(function (card) {
//   card.addEventListener("click", handleBtnClick);
// });
//btnWrapperEl.addEventListener("click", handleBtnClick)

function startGame() {
  console.log("starting game");
  cardLayout();
  setTimeout(init, 10);
}

startBtnEl.addEventListener("click", startGame);

//4. Define Functions

//UNDERHOOD FUNCTIONS - helper function
//i have to define sthg for my images so they can be picked randomly -> picking randomly means Math.radom()
// which works hand in hand with indexing -> best practice for indexing is have the collection of my images in an array
// I have to creat an array of my images and if i need to grab them it means I need DOM (document.querySelctor) -> i need an array of DOMS
//iterating through image arrays makes us sure we are not picking an image over and over

let flippedCards = [];

function handleBtnClick(e) {
  //compare two selected elements innerHTML
  const card = e.target;
  console.log(card);
  const clickedBtnId = card.id;
  console.log(clickedBtnId);
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(clickedBtnId);
    if (flippedCards.length === 2) {
      console.log(flippedCards);
      //nested if statements -> now we add second choice to the array let's compare these two
      // we need to declare if statement again in order to make the event listener to reach  the point to compare two elements -hala ke push kardim o length dota shod: biain compare konim
      if (flippedCards[0] === flippedCards[1]) {
        //how to make flipped match cards stay????
        alert("Matching Cards");
        score = parseInt(scoreStatEl.innerText) + 1;
        state.score = score; // to update state object for runGame()
        //how to keep cards displayed????????
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
}

function cardLayout() {
  console.log("card layout is done and grid is made");
  shuffleArray(imagesArray);
  gridMaker(shuffledArray, 6);
  smartCells();
}
// let shuffleNums = [];
// function shuffleCards() {
//   console.log("should shuffle");
//   const flatGrid = gridCells.flat(); // to ease positioning the images by indexing 0-35
//   imagesArray.forEach(function (image) {
//      // give us arrays of two numbers
//     for (let i = 0; i < shuffleNums.length; i++) {
//       if (flatGrid[shuffleNums[i]] === "0") {
//         const displayCard = document
//         .createElement("img")
//         .setAttribute("src",image);
//         document.querySelector(".button-wrapper").appendChild(displayCard)
//         flatGrid[shuffleNums[i]] = displayCard;
//       } else {
//         //if one of the shuffleNums already has been assigned
//         const ReplacementRandomIndex = Math.floor(Math.random() * 36);
//         if (ReplacementRandomIndex !== shuffleNums[i]) {
//           const displayCard = document
//           .createElement("img")
//           .setAttribute("src",image);
//           document.querySelector(".button-wrapper").appendChild(displayCard)
//           flatGrid[shuffleNums[i]] = displayCard
//         }
//       }
//     }
//     return flatGrid;
//   });
//   unflattenArray(flatGrid, 6);
// }
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

// function shuffleIndex() {
//   shuffleNums=[]
//   for (let i = 0; i <= 1; i++) {
//     const generateNum = Math.floor(Math.random() * 36);
//     if (!shuffleNums.includes(generateNum)) {
//       shuffleNums.push(generateNum);
//     }
//   }
// }
const grid = [];
function gridMaker(flatArray, chunkSize) {
  for (let i = 0; i < flatArray.length; i += chunkSize) {
    grid.push(flatArray.slice(i, i + chunkSize));
  }
}

function smartCells() {
  grid.forEach(function (cell) {
    for (let i = 0; i < cell.length; i++) {
      if (typeof cell[i] === "string")
        displayCard = document.createElement("img");
      displayCard.setAttribute("src", cell[i]);
      //trying to name an id based on tehimage file name
      const letterArray = cell[i].split("");
      const capitalLetter = letterArray.find(function (letter) {
        //to find cell[i] name
        return letter === letter.toUpperCase();
      });
      return capitalLetter;
    }
    if (capitalLetter) {
      displayCard.setAttribute("id", capitalLetter[0]);
      document.getElementById("button-wrapper").appendChild(displayCard);
      displayCard.addEventListener("click", handleBtnClick);
    }
  });
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
