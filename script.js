// Declared the global variables
let playerX = []; // Stores the choices made by player 1 in an array
let playerO = []; // Stores the choices made by player 2 in an array
//const player_X = 'X';
//const player_O = 'O';
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
const squares = document.querySelectorAll(".squares");
console.log(squares);

// Returns the reset button element with the type of rest.
const reset = document.querySelector("button[type = reset]");
console.log(reset);

// Returns the class of turnMessage used to display player turn
const turnText = document.querySelector(".turnMessage")

const resetScoreButton = document.querySelector("#resetScore")
console.log(resetScoreButton);

const playerXScore = document.querySelector('#playerXscore');
console.log(playerXScore);

const playerOScore = document.querySelector('#playerOscore');
console.log(playerOScore);

const tieScore = document.querySelector('#tieScore');
console.log(tieScore);

const playerSelect = document.querySelector('#playerSelect');
console.log(playerSelect);


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
      event.target.setAttribute("XO","O"); // This sets a new attribute with the value of O, which is used for CSS styling.
      turnText.innerHTML = "X's turn";
      turnCounter++;
      // Runs a check on player two's array to see if there is a match
      if(check(playerO)){      
        turnText.innerHTML = "Player Two Wins!";
        playerOPoints++;  
        popluateStorage();
        playerOScore.innerHTML = "O: " + playerOPoints;
        alert("Player Two Wins!");
        resetBoard();
      }
    }
    else {
      playerX.push(event.target.getAttribute("id"));
      event.target.innerHTML = " "; // This fills the square with a space so result will come back as 1 and the space can't be clicked again.
      event.target.setAttribute("XO","X"); // This sets a new attribute of "xo" with the value of X, which is used for CSS styling.
      turnText.innerHTML = "O's turn";
      turnCounter++;
      // Runs a check on player one's array to see if there is a match
      if(check(playerX)){
        turnText.innerHTML = "Player One Wins!";
        playerXPoints++;
        popluateStorage();
        playerXScore.innerHTML = "X: " + playerXPoints;
        alert("Player One Wins!");
        resetBoard();
      }
    }
  // If the turnCounter is greater than or equal to 10, then the game is a draw. This is done because the game board has 9 spaces so going to 10 will result in a completely full board thus a drawn game.
  if (turnCounter >= 10){
    turnText.innerHTML = "Game Over!";
    tiePoints++;
    popluateStorage();
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
  popluateStorage();
}


function popluateStorage() {
  localStorage.setItem('playerxpoints',playerXPoints);
  console.log(localStorage.getItem('playerxpoints'));
  localStorage.setItem('playeropoints',playerOPoints);
  localStorage.setItem('tiepoints',tiePoints);
}
function getGameData() {
  playerXPoints = localStorage.getItem('playerxpoints');
  playerOPoints = localStorage.getItem('playeropoints');
  tiePoints = localStorage.getItem('tiepoints');
  playerOScore.innerHTML = "O: " + playerOPoints;
  playerXScore.innerHTML = "X: " + playerXPoints;
  tieScore.innerHTML = "Tie: " + tiePoints;
  console.log(playerXPoints);
}