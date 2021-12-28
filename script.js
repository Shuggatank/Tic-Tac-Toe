// Declared the global variables
let playerX = []; // Stores the choices made by player 1 in an array
let playerO = []; // Stores the choices made by player 2 in an array
let playerXToken = 'X';
let playerOToken = 'O';
let turnCounter = 1; // The number of current turn. Starts at 1 for modulus logic reasons.
//let playerOTurn = false;
//let winCounter = 0;

/* The winning square combinations stored in an array, 
   which is stored in the array named winningConditions.
   This is used to check against the player array */
const winningConditions = [
    // Rows
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],

    // Columns
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],

    // Diagonal
    ['0', '4', '8'],
    ['2', '4', '6']

];
let playerXPoints = 0;
let playerOPoints = 0;
let tiePoints = 0;
// Used DOM

// Returns all the elements with the id of square and stores them into the variable squares in an array. This will be used for the gameboard logic.
const squares = document.querySelectorAll('.squares');

// Returns the reset button element with the type of rest.
const reset = document.querySelector("button[type = reset]");

// Returns the class of turnMessage used to display player turn
const turnText = document.querySelector(".turnMessage")

const resetScoreButton = document.querySelector("#resetScore")

const playerXScore = document.querySelector('#playerXscore');

const playerOScore = document.querySelector('#playerOscore');

const tieScore = document.querySelector('#tieScore');

const playerSelect = document.querySelector('#playerSelect');

const player1Tokens = document.querySelectorAll('.p1token');
console.log(player1Tokens);

const player2Tokens = document.querySelectorAll('.p2token');
console.log(player2Tokens);


//Unused DOM
// const gameBoard = document.querySelector('.gameBoard');
// console.log(gameBoard);



// Runs the startGame function when the site is loaded
window.onload = startGame;

// When the startGame function is called it in turn calls two other functions, gameInitializer and resetBoard.
function startGame() {
  gameInitializer();
  resetBoard();
  //resetScore()
  getGameData();
  playerTokens();
}

// gameInitializer goes through the square array and listen for the click. It passes the index of the clicked square to the playerSymbols function.
function gameInitializer() {
  squares.forEach((square) => {
    square.addEventListener("click", playerSymbols)
  })
}

// Square index is passed to the playerSymbols function
function playerSymbols(event) {
  // event.target.innerHTML.length checks whether the square is already taken. If it returns a 0 then the logic continues, if a 1 is returned then the logic does not continue until an empty square is clicked.
  if (event.target.innerHTML.length === 0){
    playerSelect.play();
    if (turnCounter % 2 === 0) {
      playerO.push(event.target.getAttribute("id"));
      event.target.innerHTML = " "; // This fills the square with a space so result will come back as 1 and the space can't be clicked again.
      event.target.setAttribute("XO", playerOToken); // This sets a new attribute with the value of O, which is used for CSS styling.
      turnText.innerHTML = "X's turn";
      turnCounter++;
      // Runs a check on player two's array to see if there is a match
      if(check(playerO)){      
        turnText.innerHTML = "Player Two Wins!";
        playerOPoints++;  
        setGameData();
        playerOScore.innerHTML = "O: " + playerOPoints;
        alert("Player Two Wins!");
        resetBoard();
      }
    }
    else {
      playerX.push(event.target.getAttribute("id"));
      event.target.innerHTML = " "; // This fills the square with a space so result will come back as 1 and the space can't be clicked again.
      event.target.setAttribute("XO", playerXToken); // This sets a new attribute of "xo" with the value of X, which is used for CSS styling.
      console.log(event.target.getAttribute("[XO]"));
      console.log(playerXToken )
      turnText.innerHTML = "O's turn";
      turnCounter++;
      // Runs a check on player one's array to see if there is a match
      if(check(playerX)){
        turnText.innerHTML = "Player One Wins!";
        playerXPoints++;
        setGameData();
        playerXScore.innerHTML = "X: " + playerXPoints;
        alert("Player One Wins!");
        resetBoard();
      }
    }
  // If the turnCounter is greater than or equal to 10, then the game is a draw. This is done because the game board has 9 spaces so going to 10 will result in a completely full board thus a drawn game.
  if (turnCounter >= 10){
    turnText.innerHTML = "Game Over!";
    tiePoints++;
    setGameData();
    tieScore.innerHTML = "Tie: " + tiePoints;
    let confirmed = confirm("The game is a draw. Do you want to play again?");
    if(confirmed){
      resetBoard();
    }
  }
  }
}

// The check function checks if the player array values match the winningConditions array values
function check(array){
  let finalResult = false;
  for(let item of winningConditions){
    let result = item.every(arr => array.indexOf(arr) !== -1);
    if(result){
      finalResult = true;
      break;
    }
  }
  return finalResult;
}

function resetBoard() {
  reset.addEventListener("click", resetBoard);
  squares.forEach((squares) => {
    squares.innerHTML= "";
    squares.setAttribute("XO","");
  });
  playerO = [];
  playerX = [];
  turnCounter = 1;
  turnText.innerHTML = "X's turn";
}

resetScoreButton.addEventListener("click", resetScore);

function resetScore() {
  playerXPoints = 0;
  playerOPoints = 0;
  tiePoints = 0;
  playerOScore.innerHTML = "O: " + playerOPoints;
  playerXScore.innerHTML = "X: " + playerXPoints;
  tieScore.innerHTML = "Tie: " + tiePoints;
  setGameData(); // Sets the game data to initial state of 0. If localStorage.clear was used then the values would be null instead.
}

// The setGameData function sets the player data to localStorage so it can persistent even after site reload.
function setGameData() { 
  localStorage.setItem('playerxpoints',playerXPoints);
  localStorage.setItem('playeropoints',playerOPoints);
  localStorage.setItem('tiepoints',tiePoints);
}

// The getGameData function returns the player data from localStorage
function getGameData() {
  playerXPoints = localStorage.getItem('playerxpoints');
  playerOPoints = localStorage.getItem('playeropoints');
  tiePoints = localStorage.getItem('tiepoints');
  playerOScore.innerHTML = "O: " + playerOPoints;
  playerXScore.innerHTML = "X: " + playerXPoints;
  tieScore.innerHTML = "Tie: " + tiePoints;
}

function playerTokens() {
  // player1Tokens.forEach((token) => {
  //   token.addEventListener("click", tokenCheck);
  // });

  player1Tokens.forEach((token) => {
    token.addEventListener("click", ()=> {
      playerXToken = token.id;
      console.log(playerXToken);
    });
  });

  player2Tokens.forEach((token) => {
    token.addEventListener("click", ()=> {
      playerOToken = token.id;
      console.log(playerOToken);
    });
  });

}

//FIX ME
/* Need to check a check for the token of the players to see if two of them are trying to select the same one.
If they are trying to select the same one then disable the one that hasn't been selected.
 Alternatively, disable the token from being selected if one player has already selected it by using the event.target.src attribute*/
function tokenCheck(event) {
  // console.log(event.target.id);
  playerXToken  =  event.target.id; 
  // console.log(playerXToken )
  // X = document.querySelectorAll('[XO=X]')
  // console.log(X)
  // console.log(document.styleSheets[0].cssRules[13].style)
  //console.log(X.style.content)
  // let add = document.styleSheets[0].cssRules[13].style;
  // // add.insertRule('content: url('+ event.target.src+')', 0);
  // tokenInsert = '[XO=X] {';
  // tokenInsert += 'url('+event.target.src+')';
  // tokenInsert += '}';
  // console.log(tokenInsert);
  // //add.insertRule(tokenInsert, 13);
  // document.styleSheets[0].insertRule(tokenInsert, 13);
  // console.log(document.styleSheets[0].cssRules[13].style)
}

