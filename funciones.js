/* apuntamos constantes al DOM para pintar los resultados */
const board = document.getElementById('board');
const message = document.getElementById('message');

// definición jugador actual
let currentPlayer = 'X';
// definición tablero de juego
let gameBoard = ['', '', '', '', '', '', '', '', ''];
// función para crear el tablero
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        //añadimos el índice a cada celda
        cell.dataset.index = i;
        //añadimos el evento click a cada celda
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    // obtenemos el indes de la celda clicada
    const cell = event.target;
    const index = cell.dataset.index;
    // si la celda ya está ocupada o hay un ganador, no hacemos nada
    if (gameBoard[index] !== '' || checkWinner()) {
        return;
    }
    //pintamos el jugador actual en la celda clicada
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `¡${currentPlayer} ha ganado!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = '¡Es un empate!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

/* funcion para comparar situacion de tablero con 
las combinaciones de victoria */
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
//
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });

       /*  
       //Alternativa al método some con un bucle for
       for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false; 
    */
}

createBoard();
