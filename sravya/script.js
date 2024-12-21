// Variables to track game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Get HTML elements
const board = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-btn');

// Check if there is a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
};

// Handle player move
const handleCellClick = (index) => {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;
    document.querySelector(`[data-index='${index}']`).classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
    if (winner) {
        gameStatus.textContent = `Player ${winner} Wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        gameStatus.textContent = "It's a Tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

// Restart the game
const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player X's Turn`;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

// Event listeners
board.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index !== undefined) {
        handleCellClick(parseInt(index));
    }
});

restartButton.addEventListener('click', restartGame);
