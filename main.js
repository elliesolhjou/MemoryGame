console.log("js is loaded")



// 1. Define Variables    
const INIT_STATE={
    score:0,
    timer:0,
}

let score;  
let state; 
let timer; //setInterval Id
let interval;


// 2. DOM Captures  
const scoreStatEl=document.querySelector ("#score-stat")  
const startEl=document.querySelector ("#start-btn")  
const gamebtnEls=document.querySelectorAll("#controller button")

//3. Event Listeners  
gameBtnEls.forEach(function(btn){
    btn.addEventListener("click", handleBtnClick)
    })



//4. Define Functions  
init() 
runGame()  
handleBtnClick()  
firstCardDisplay()
timer() -> let or function?
//hideCard()/showCard() -> Maybe a css Animation instead
compareSelection()  
gameOver()

//under the hood function
shuffle() -> is the helper function to Shuffle Images Randomly