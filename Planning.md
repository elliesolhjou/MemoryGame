I've opted for the Concentration (Memory Game), and I've designed a web browser game called "MEMORY GAME," specifically tailored for children aged 4 or younger.

![Alt text](./images/Project%20Wireframe.jpeg)

**Pseudocode:**

1. Define Variables  
   . Global Variables  
   . Constant Variables  
   . Initial Data States  
   . Image Asset Paths  
   . State Variables -> State is Data Would Change Throughout the Game (let)  
   . let score;  
   . let state; -> Shows Score and Timer States  
   . let timer; -> setInterval id
   . let numRows
   . let numColumns
   ...

2. DOM Captures  
    . Define DOMs  
    . Controller Buttons -> 36 buttons  
    . Start Button  
    . Score-Stat Button
   . Reset Button

   . Save and Cached DOM Elements in a New Varaiable  
    . const scoreStatEl=document.querySelector ("#score-stat")  
    . const startEl=document.querySelector ("#start-btn)  
    . const gamebtnEls=document.querySelectorAll("#controller button")

3. Event Listeners  
   . Add Custom Functions to Cached DOM Elements  
    . gameBtnEls.forEach(function(btn){
   btn.addEventListener("click", handleBtnClick)
   })
   . Add event listener to teh Reset Game button to reload and refresh the page

4. Define Functions

**UNDER THE HOOD/HELPER FUNCTIONS:**

    .HIGHEST-LEVEL FUNCTION: startGame() - activated by hitting start button and would initialize shuffleCards() and after 3 seconds run init function

. Main Function (sub function to startGame()): init() the Game -> used for initiating the whole game model, updating and checking status of user's play and it constantly renders teh result
. Main Function(sub function to startGame()): shuffleCard() is a helper function to distribute card images randomly throughout the grid each time player hits the start button
. SUB FUNCTIONS TO SHUFFLECARDS(): - shuffleIndex() which returns an array of two different indexes to position selected images in the flattened array of initial grid. - unflattenArray() which returns nested array of 6\*6 containing images in every i and j indexes.

    . SUB FUNCTIONS TO INIT():
            - timerDisplay() every 1000 ms updates the timer element (DOM) by incrementing "second" variable on teh screen
            - statusChecker() checks the user's play status evey two seconds and decides whether to to keep running the game or stopping teh timer and announce the game is over. this functions runs a sub function called runGame():
                - runGame() loops through sets of logics to see if user meets the criteria (score===0) to keep playing. This function gets called every second and check the current score of player.
                    -gameOver() a sub function to the runGame() and it stops the timer

            - render() updates the score DOM so user can see the score

**UI FUNCTIONS - WAITS ON USER TO TAKE ACTIONS**
. handleBtnClick() with logical statements, it is the brain of the model and decides if two selcted cards(buttons) by the user are matched or not.

FOR BETTER UNDERSTANDING OF THE READER A FLOWCHART INDICATING THE GAME FLOW HAS BEEN PROVIDED.
![Alt text](./images/Conversation%20tree%20example.jpeg)

I also attached my box modeling I based my Pseudocode on.
![Alt text](./images/BOXING%20MODEL.png)
