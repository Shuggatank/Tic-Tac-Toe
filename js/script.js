// Declared the global variables
let playerXChoices = [];
let playerOChoices = []; 
let playerXToken = "X";
let playerOToken = "O";
let turnCounter = 1; // The number of current turn. Starts at 1 for modulus logic reasons.
let playerXPoints = 0;
let playerOPoints = 0;
let tiePoints = 0;

/* The winning square combinations stored in an array, 
   which is stored in the array named winningConditions.
   This is used to check against the player array */
const winningConditions = [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"]

];

//DOM
const squares = document.querySelectorAll(".squares");

const reset = document.querySelector("button[type = reset]");

const turnText = document.querySelector(".turnMessage")

const resetScoreButton = document.querySelector("#resetScore")

const playerXScore = document.querySelector("#playerXscore");

const playerOScore = document.querySelector("#playerOscore");

const tieScore = document.querySelector("#tieScore");

const playerSelectAudio = document.querySelector("#playerSelect");

const player1Tokens = document.querySelectorAll(".p1token");

const player2Tokens = document.querySelectorAll(".p2token");

const tokens = document.querySelectorAll("li");


window.onload = startGame;


function startGame() {
  gameInitializer();
  resetBoard();
  getGameData();
  playerTokens();
  if (localStorage.length === 0) {
    resetScore();
  }

}

// gameInitializer goes through the square array and listen for the click. It passes the index of the clicked square to the playerSymbols function.
function gameInitializer() {
  squares.forEach((square) => {
    square.addEventListener("click", playerSymbols)
  })
}

function playerSymbols(event) {
  /* event.target.innerHTML.length checks whether the square is already taken. 
     If it returns a 0 then the logic continues, if a 1 is returned then the logic does not continue until an empty square is clicked.
  */
  if (event.target.innerHTML.length === 0){
    playerSelectAudio.play();
    if (turnCounter % 2 === 0) {
      document.querySelector(".player2choices").style.visibility="hidden";
      playerOChoices.push(event.target.getAttribute("id"));
      event.target.innerHTML = " "; // This fills the square with a space so result will come back as 1 and the space can't be clicked again.
      event.target.setAttribute("XO", playerOToken); 
      turnText.innerHTML = "X's turn";
      turnCounter++;
      // Runs a check on player two's array to see if there is a match
      if(check(playerOChoices)){      
        turnText.innerHTML = "Player Two Wins!";
        playerOPoints++;  
        setGameData();
        playerOScore.innerHTML = "O: " + playerOPoints;
        alert("Player Two Wins!");
        resetBoard();
      }
    }
    else {
      document.querySelector(".player1choices").style.visibility="hidden";
      playerXChoices.push(event.target.getAttribute("id"));
      event.target.innerHTML = " "; // This fills the square with a space so result will come back as 1 and the space can't be clicked again.
      event.target.setAttribute("XO", playerXToken); 
      turnText.innerHTML = "O's turn";
      turnCounter++;
      // Runs a check on player one's array to see if there is a match
      if(check(playerXChoices)){
        turnText.innerHTML = "Player One Wins!";
        playerXPoints++;
        setGameData();
        playerXScore.innerHTML = "X: " + playerXPoints;
        alert("Player One Wins!");
        resetBoard();
      }
    }
  /* If the turnCounter is greater than or equal to 10, then the game is a draw. 
     This is done because the game board has 9 spaces so going to 10 will result in a completely full board thus a drawn game.
  */
  if (turnCounter >= 10){
    turnText.innerHTML = "Game Over!";
    tiePoints++;
    setGameData();
    tieScore.innerHTML = "Tie: " + tiePoints;
    alert("The game is a draw.");
    resetBoard();
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
  playerOChoices = [];
  playerXChoices = [];
  turnCounter = 1;
  turnText.innerHTML = "X's turn";
  unhideTokens();
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
  localStorage.setItem("playerxpoints",playerXPoints);
  localStorage.setItem("playeropoints",playerOPoints);
  localStorage.setItem("tiepoints",tiePoints);
}

// The getGameData function returns the player data from localStorage
function getGameData() {
  playerXPoints = localStorage.getItem("playerxpoints");
  playerOPoints = localStorage.getItem("playeropoints");
  tiePoints = localStorage.getItem("tiepoints");
  playerOScore.innerHTML = "O: " + playerOPoints;
  playerXScore.innerHTML = "X: " + playerXPoints;
  tieScore.innerHTML = "Tie: " + tiePoints;
}

function playerTokens() {
  player1Tokens.forEach((token) => {
    token.addEventListener("click", ()=> {
      playerXToken = token.id;
      document.querySelector(".player1choices").style.visibility="hidden";
    });
  });

  player2Tokens.forEach((token) => {
    token.addEventListener("click", ()=> {
      playerOToken = token.id;
      document.querySelector(".player2choices").style.visibility="hidden";
    });
  });
}

function unhideTokens() {
  document.querySelector(".player1choices").style.visibility="visible";
  document.querySelector(".player2choices").style.visibility="visible";
}