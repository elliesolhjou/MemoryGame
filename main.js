console.log("js is loaded")

// 1. Define Variables    
const INIT_STATE={
    score:0,
    timer:0,
    message:""
}

let gridCells = 
[["0","0","0","0","0","0"]
 ["0","0","0","0","0","0"]
 ["0","0","0","0","0","0"] 
 ["0","0","0","0","0","0"]
 ["0","0","0","0","0","0"] 
 ["0","0","0","0","0","0"]]

// const imagesArray=[document.getElementbyId("a"),document.getElementbyId("b"),document.getElementbyId("c"),
// document.getElementbyId("d"),document.getElementbyId("e"),document.getElementbyId("f"),document.getElementbyId("h"),
// document.getElementbyId("j"),document.getElementbyId("k"),document.getElementbyId("l"),document.getElementbyId("p"),
// document.getElementbyId("r"),document.getElementbyId("s"),document.getElementbyId("t"),document.getElementbyId("w"),
// document.getElementbyId("y"),document.getElementbyId("z")]

let score;  
let state; 
let timer; //setInterval Id
let interval;


// 2. DOM Captures  
const scoreStatEl=document.querySelector ("#score-stat")  
const startEl=document.querySelector ("#start-btn")  
const cards=document.querySelectorAll(".card")

//3. Event Listeners  
cards.forEach(function(card){
    card.addEventListener("click", handleBtnClick)
    })

function handleBtnClick(){   //compare two selected eleemnts innerHTML
    let flippedCards=[];
    const card=e.currentTarget
    const clickedBtnId = card.getAttribute("id")
    if (flippedCards.length<2 && !card.classList.contains("flipped")){
        card.classList.add("flipped")
        flippedCards.push(clickedBtnId)
        if (flippedCards.length===2){ //nested if statements -> now we add second choice to the array let's compare these two
            // we need to declare if statement again in order to make the event listener to reach  the point to compare two elements -hala ke push kardim o length dota shod: biain compare konim
            if (flippedCards[0]===flippedCards[0]){
                alert("Matching Cards")
                score++
            } else{
                //if they are not matched:
                    //flip cards back
                    //remove added "flipped" class in case cards are not matched
                card.classList.remove("flipped")

            }
        }
    }
    flippedCards=[]
}


//4. Define Functions  

//UNDERHOOD FUNCTIONS - helper function
//i have to define sthg for my images so they can be picked randomly -> picking randomly means Math.radom()
// which works hand in hand with indexing -> best practice for indexing is have the collection of my images in an array
// I have to creat an array of my images and if i need to grab them it means I need DOM (document.querySelctor) -> i need an array of DOMS
//iterating through image arrays makes us sure we are not picking an image over and over
function shuffleCards(){
    const flatGrid=imagesArray.flat() // to ease positioning the images by indexing 0-35
    imagesArray.forEach(function(image){
        shuffleIndex() // give us arrays of two numbers
        for (let i=0; i<shuffleIndex; i++){
            if(flatGrid[shuffleIndex[i]]==="0"){
                flatGrid[shuffleIndex[i]] = image //not sure how to assign image
            } else{ //if one of the shuffleNums already has been assigned
                const secondRandomIndex=Math.floor(Math.random()*36)
                if (secondRandomIndex !== shuffleIndex[i]){
                    flatGrid[secondRandomIndex] = image
                }
            }
        }
        return flatGrid
    })
    unflattenArray(flatGrid, 6)
}
//ShuffleIndex - needs to generate an array of two different number as an index for 
//shuffleCards()
function shuffleIndex(){
    const shuffleNums=[]
    for (let i=0; i<=1; i++){
        const generateNum=Math.floor(Math.random()*36)
        if(!shuffleNums.includes(generateNum)){
            shuffleNums.push(generateNum)
        }
    }
    return shuffleNums
}
console.log(shuffleIndex())


function unflattenArray(flatArray, chunkSize){
    const unflattened = [];
    for (let i=0; i<flatArray.length; i+=chunkSize){
        unflattened.push(flatArray.slice(i, i+chunkSize))
    }
    return unflattened
}

init();
function init() {
    state={...INIT_STATE};
    interval=1000
    timer=setInterval(runGame, interval)
    render()
}

// function runGame()  



// function firstCardDisplay()
// function timer() 
// //hideCard()/showCard() -> Maybe a css Animation instead
// function compareSelection()  
// function gameOver()
