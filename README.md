

I've opted for the Concentration (Memory Game), and I've designed a web browser game called "KID'S MEMORY GAME," specifically tailored for children aged 4 or younger.

![Alt text](./images/Project%20Wireframe.jpeg)

Pseudocode:

1. Define Variables  
   . Global Variables  
    . Constant Variables  
    . Initial Data States  
    . Animation Names  
    . Image Asset Paths  
    . State Variables -> State is Data Would Change Throughout the Game (let)  
    . let score;  
    . let state; -> Shows Score and Timer States  
    . let timer; -> setInterval id

2. DOM Captures  
   . Define DOMs  
    . Controller Buttons -> 36 buttons  
    . Start Button  
    . Score-Stat Button

   . Save and Cached DOM Elements in a New Varaiable  
    . const scoreStatEl=document.querySelector ("#score-stat")  
    . const startEl=document.querySelector ("#start-btn)  
    . const gamebtnEls=document.querySelectorAll("#controller button")

3. Event Listeners  
   . Add Custom Functions to Cached DOM Elements  
    . gameBtnEls.forEach(function(btn){
   btn.addEventListener("click", handleBtnClick)
   })

4. Define Functions  
   . init() the Game -> Initiate the Game  
. Functions -> for Event Listeners  
    . runGame()  
    . handleBtnClick()  
    . firstCardDisplay() -> setTimer() to Be Incorporated
    . shuffle() -> Shuffle Images Randomly
    . timer() -> let or function?
    . hideCard()/showCard() -> Maybe a css Animation instead
    . compareSelection()  
    . gameOver()

. Render the Result -> End the Game  
    . render()  
    . renderStats()  
    . updateStats()

. Game Loops -> Ask Player to Continue  
    . continueGame()

I also attached my box modeling I based my Pseudocode on.
![Alt text](./images/BOXING%20MODEL.png)
