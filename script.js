let playerX = [];
let playerO = [];
const player_X = 'X';
const player_O = 'O';
let currentTurn = 0;
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

