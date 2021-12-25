let playerX = [];
let playerO = [];
//const player_X = 'X';
//const player_O = 'O';
let turnCounter = 1;
//let playerOTurn = false;
//let winCounter = 0;
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
// let playerXPoints = 0;
// let playerOPoints = 0;

const gameBoard = document.querySelector('.gameBoard');
console.log(gameBoard);

const squares = document.querySelectorAll('.squares');
console.log(squares);

const reset = document.querySelector('button[type = reset]');
console.log(reset);

const playerXIcon = document.querySelector('#playerXicon');
console.log(playerXIcon);

const playerOIcon = document.querySelector('#playerOicon');
console.log(playerOIcon);
let turnText = document.querySelector(".turnMessage")

window.onload = startGame;


function startGame() {
    gameListener();
    resetGame();
}

function gameListener() {
    for (let i = squares.length -1; i >= 0; i--) {
        squares[i].addEventListener('click', playerSymbols);
    }
}

function playerSymbols(event){
    console.log(event.target.innerHTML.length)
    if (event.target.innerHTML.length === 0){
      if (turnCounter % 2 === 0) {
        playerO.push(event.target.getAttribute("id"));
        event.target.innerHTML = " ";
        event.target.setAttribute("XO","O");
        turnText.innerHTML = "It is X's turn";
        turnCounter++;
        if(check(playerO)){        
            alert("Congrats player two you win");
            resetBoard();
            return true;
        }
      }
      else {
        playerX.push(event.target.getAttribute("id"));
        event.target.innerHTML = " ";
        event.target.setAttribute("XO","X");
        turnText.innerHTML = "It is O's turn";
        turnCounter++;
        if(check(playerX)){
            alert("Congrats player one you win");
            resetBoard();
            return true;
          }
      }
    // if the counter is greater than or equal to 10, the game is a draw!
    if (turnCounter >= 10){
      turnText.innerHTML = "Game Over!";
      let confirmed = confirm("It's a draw, do you want to play again?");
      if(confirmed){
        resetBoard();
      }
    }
   }
  }
  
  function resetGame(){
    reset.addEventListener("click", resetBoard);
  }

  function check(array){
    let finalResult = false;
    for(let item of winningConditions){
    
      let result = item.every(val => array.indexOf(val) !== -1);
      // console.log(array)
      // console.log(item)
      // console.log(res)
      if(result){
        finalResult = true;
        break;
      }
    }
    return finalResult;
  }

  function resetBoard(){
    for (let i = squares.length - 1; i >= 0; i--) {
      squares[i].innerHTML="";
      squares[i].setAttribute("XO","");
    }
    playerO = [];
    playerX = [];
    //winCounter=0;
    turnCounter = 1;
    turnText.innerHTML = "It is X's turn";
  }

