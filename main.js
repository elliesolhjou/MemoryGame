console.log("js is loaded");

// 1. Define Variables
const INIT_STATE = {
    score: 40,
};

const gridCells = [
["0", "0", "0", "0", "0", "0"],["0", "0", "0", "0", "0", "0"],["0", "0", "0", "0", "0", "0"],["0", "0", "0", "0", "0", "0"],["0", "0", "0", "0", "0", "0"],["0", "0", "0", "0", "0", "0"]
];

const imagesArray=[document.getElementById("a"),document.getElementById("b"),document.getElementById("c"),
document.getElementById("d"),document.getElementById("e"),document.getElementById("f"),document.getElementById("h"),
document.getElementById("j"),document.getElementById("k"),document.getElementById("l"),document.getElementById("p"),
document.getElementById("r"),document.getElementById("s"),document.getElementById("t"),document.getElementById("w"),
document.getElementById("y"),document.getElementById("z")]

let score;
let state;
let timer; //setInterval Id
let timerInterval;
let seconds=0
state={...INIT_STATE}

// 2. DOM Captures
const scoreStatEl = document.querySelector("#score-stat");
//const startEl=document.querySelector ("#start-btn")
const cards= document.querySelectorAll(".card");
const startBtnEl=document.querySelector("start-btn");
const timerEl=document.querySelector("timer-stat")

//3. Event Listeners
cards.forEach(function (card) {
    card.addEventListener("click", handleBtnClick);
});

startBtnEl.addEventListener("click", startGame)



//4. Define Functions

//UNDERHOOD FUNCTIONS - helper function
//i have to define sthg for my images so they can be picked randomly -> picking randomly means Math.radom()
// which works hand in hand with indexing -> best practice for indexing is have the collection of my images in an array
// I have to creat an array of my images and if i need to grab them it means I need DOM (document.querySelctor) -> i need an array of DOMS
//iterating through image arrays makes us sure we are not picking an image over and over


function handleBtnClick(e) {
    //compare two selected elements innerHTML
    let flippedCards = [];
    const card = e.Target;
    const clickedBtnId = card.getAttribute("id");
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(clickedBtnId);
        if (flippedCards.length === 2) {
        //nested if statements -> now we add second choice to the array let's compare these two
        // we need to declare if statement again in order to make the event listener to reach  the point to compare two elements -hala ke push kardim o length dota shod: biain compare konim
            if (flippedCards[0] === flippedCards[1]) {
          //how to make flipped match cards stay????
                alert("Matching Cards");
                score=parseInt(scoreStatEl.innerText)++;
                state.score= score // to update state object for runGame()
          //how to keep cards displayed????????
            } else {
          //if they are not matched:
          //flip cards back
          //remove added "flipped" class in case cards are not matched
                card.classList.remove("flipped");
                score=parseInt(scoreStatEl.innerText)--;
                state.score= score // to update state object for runGame()
            }
        }
    }
    flippedCards = [];
}



function startGame(){
    shuffleCards();
    setTimeout(init, 3000)
}


function shuffleCards() {
    const flatGrid = gridCells.flat(); // to ease positioning the images by indexing 0-35
    imagesArray.forEach(function (image) {
    shuffleIndex(); // give us arrays of two numbers
    for (let i = 0; i < shuffleIndex; i++) {
        if (flatGrid[shuffleIndex[i]] === "0") {
        flatGrid[shuffleIndex[i]] = image; //not sure how to assign image
        } else {
        //if one of the shuffleNums already has been assigned
        const ReplacementRandomIndex = Math.floor(Math.random() * 36);
            if (ReplacementRandomIndex !== shuffleIndex[i]) {
                flatGrid[ReplacementRandomIndex] = image;
            }
        }
    }
    return flatGrid;
    });
    unflattenArray(flatGrid, 6);
}
function shuffleIndex() {
    const shuffleNums = [];
    for (let i = 0; i <= 1; i++) {
    const generateNum = Math.floor(Math.random() * 36);
        if (!shuffleNums.includes(generateNum)) {
            shuffleNums.push(generateNum);
        }
    }
    return shuffleNums;
}
function unflattenArray(flatArray, chunkSize) {
  const unflattened = [];
  for (let i = 0; i < flatArray.length; i += chunkSize) {
    unflattened.push(flatArray.slice(i, i + chunkSize));
  }
  return unflattened;
}


init();
function init() {
    timerDisplay()
    statusChecker()
    render();
}
function timerDisplay(){
    timer=setInterval(function(){
        seconds++;
        timerEl.innerText = seconds+" Seconds"
    }, 10000)
        
}
function statusChecker(){
    timerInterval = 1000;
    statusStat = setInterval(runGame, timerInterval)
}
function runGame() {
    let keepRunning = true;
    let currentStats = [];
    for (let key in state) {
        state[key]=score //to update score
        currentStats.push(score);
        if (score<=0){
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
    state.score=parseInt(scoreStatEl.innerText);
}
function gameOver() {
    clearInterval(timer);
}


