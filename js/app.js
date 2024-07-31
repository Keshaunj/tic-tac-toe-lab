/*-------------------------------- Constants --------------------------------*/

// Board to represent the state of the squares
const board = ["", "", "", "", "", "", "", "", ""];

// Cached element references
const messageElement = document.getElementById("message");
const squares = document.querySelectorAll(".sqr"); // All square elements

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6]  // Diagonal (top-right to bottom-left)
];

// Variables for the game state
let turn = "X"; // First player turn
let winner = null;
let tie = false;

/*---------------------------- Functions ----------------------------*/

function updateMessage() {
  if (winner) {
    messageElement.textContent = `${winner.toUpperCase()} wins!`;
  } else if (tie) {
    messageElement.textContent = "It's a tie!";
  } else {
    messageElement.textContent = `${turn.toUpperCase()}'s turn`;
  }
}

function handleSquareClick(event) {
  const square = event.target;
  const index = Array.prototype.indexOf.call(squares, square);
  if (board[index] === "" && !winner && !tie) {
    board[index] = turn;
    square.textContent = turn;
    square.classList.add(turn.toLowerCase());
    checkWinner();
    tie = board.every(cell => cell !== "");
    updateMessage();
    switchTurn();
  }
}

function checkWinner() {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return;
    }
  }
}

function switchTurn() {
  turn = turn === "X" ? "O" : "X";
}

function init() {
  console.log("Initializing the game...");
  board.fill("");
  turn = "X";
  winner = null;
  tie = false;
  render();
}

function render() {
  squares.forEach((square, index) => {
    square.textContent = board[index];
    square.className = "sqr"; // Reset class name
    if (board[index] === 'X') {
      square.classList.add('x'); // Add class for X
    } else if (board[index] === 'O') {
      square.classList.add('o'); // Add class for O
    }
  });
  updateMessage();
}

function updateBoard() {
  // Loop over each element in the board array
  board.forEach((value, index) => {
    const square = squares[index]; // Get the corresponding square element

    // Update the text content of the square based on the board's value
    square.textContent = value;

    // Remove existing classes to reset the square
    square.classList.remove('x', 'o');

    // Add a class based on the value to apply the appropriate styles
    if (value === 'X') {
      square.classList.add('x');
    } else if (value === 'O') {
      square.classList.add('o');
    }
  });

  // Update the message based on the game state
  updateMessage();
}

/*----------------------------- Event Listeners -----------------------------*/

// Initialize the game when the DOM is fully loaded

  init(); // Call init to set up the game

  // Add event listeners to squares
  squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
  });

  // Create and style the restart button
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.style.display = 'block';
  restartBtn.style.margin = '20px auto'; // Center horizontally and add vertical margin
  restartBtn.style.fontSize = '24px';
  restartBtn.style.padding = '10px 20px';
  restartBtn.style.cursor = 'pointer';
  restartBtn.style.backgroundColor = '#f0f0f0'; 
  restartBtn.style.border = '1px solid #ccc'; 
  restartBtn.style.borderRadius = '40px'; // Optional: adds rounded corners

  // Ensure button is below the board
  restartBtn.style.position = 'relative';
  restartBtn.style.top = '20px'; // Adjust this value to position it below the board

  // Add click event listener to restart button
  restartBtn.addEventListener('click', () => {
    board.fill(""); // Reset the board
    squares.forEach(square => {
      square.textContent = "";
      square.className = "sqr"; // Remove player-specific class
    });
    winner = null;
    tie = false;
    turn = "X";
    updateMessage();
  });
  


 function updateBoard() {
  board.forEach((element, index) => {
    const square = squareEls[index];
    square.textContent = element;
  });
};
function placePiece(index){
board[index]= turn;
}
