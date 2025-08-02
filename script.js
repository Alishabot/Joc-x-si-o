// --- Variabile globale ---
let playerName = '';
let playerSign = 'X';
let cpuSign = 'O';
let board = Array(9).fill('');
let currentTurn = 'X';
let gameActive = false;
let stats = { X: 0, O: 0, draws: 0 };

// --- Elemente DOM ---
const registerModal = document.getElementById('register-modal');
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const mainMenu = document.getElementById('main-menu');
const newGameBtn = document.getElementById('new-game-btn');
const boardDiv = document.getElementById('game-board');
const boardGrid = document.querySelector('.board-grid');
const restartBtn = document.getElementById('restart-btn');
const resultModal = document.getElementById('result-modal');
const resultTitle = document.getElementById('result-title');
const resultOk = document.getElementById('result-ok');
const restartModal = document.getElementById('restart-modal');
const restartConfirm = document.getElementById('restart-confirm');
const restartCancel = document.getElementById('restart-cancel');
const xWins = document.getElementById('x-wins');
const oWins = document.getElementById('o-wins');
const draws = document.getElementById('draws');

// --- Formular de înregistrare ---
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('player-name').value.trim();
  const sign = registerForm.sign.value;
  if (name.length < 3 || name.length > 16) {
    registerError.textContent = 'Numele trebuie să aibă între 3 și 16 caractere.';
    return;
  }
  playerName = name;
  playerSign = sign;
  cpuSign = sign === 'X' ? 'O' : 'X';
  registerModal.classList.remove('active');
  mainMenu.classList.remove('hidden');
  updateStats();
});

// --- Meniu principal ---
newGameBtn.addEventListener('click', startNewGame);

function startNewGame() {
  mainMenu.classList.add('hidden');
  boardDiv.classList.remove('hidden');
  resetBoard();
  renderBoard();
  gameActive = true;
  currentTurn = 'X';
  if (playerSign !== 'X') cpuMove();
}

// --- Tabla de joc ---
function renderBoard() {
  boardGrid.innerHTML = '';
  board.forEach((cell, idx) => {
    const div = document.createElement('div');
    div.className = 'cell' + (cell ? ' filled' : '');
    div.textContent = cell;
    div.addEventListener('click', () => handleCellClick(idx));
    boardGrid.appendChild(div);
  });
}

function handleCellClick(idx) {
  if (!gameActive || board[idx] || currentTurn !== playerSign) return;
  board[idx] = playerSign;
  renderBoard();
  if (checkGameOver()) return;
  currentTurn = cpuSign;
  setTimeout(cpuMove, 400);
}

function cpuMove() {
  if (!gameActive) return;
  // CPU: random move (poate fi îmbunătățit cu AI simplu)
  const empty = board.map((v, i) => v ? null : i).filter(i => i !== null);
  if (empty.length === 0) return;
  const idx = empty[Math.floor(Math.random() * empty.length)];
  board[idx] = cpuSign;
  renderBoard();
  if (checkGameOver()) return;
  currentTurn = playerSign;
}

function checkGameOver() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // linii
    [0,3,6],[1,4,7],[2,5,8], // coloane
    [0,4,8],[2,4,6]          // diagonale
  ];
  for (const [a,b,c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      showResult(board[a] === playerSign ? 'Ai câștigat!' : 'Ai pierdut!');
      stats[board[a]]++;
      updateStats();
      return true;
    }
  }
  if (board.every(cell => cell)) {
    gameActive = false;
    showResult('Egal!');
    stats.draws++;
    updateStats();
    return true;
  }
  return false;
}

function resetBoard() {
  board = Array(9).fill('');
  currentTurn = 'X';
  gameActive = true;
}

// --- Modale ---
function showResult(msg) {
  resultTitle.textContent = msg;
  resultModal.classList.add('active');
}
resultOk.addEventListener('click', () => {
  resultModal.classList.remove('active');
  boardDiv.classList.add('hidden');
  mainMenu.classList.remove('hidden');
});

restartBtn.addEventListener('click', () => {
  restartModal.classList.add('active');
});
restartConfirm.addEventListener('click', () => {
  restartModal.classList.remove('active');
  resetBoard();
  renderBoard();
  if (playerSign !== 'X') cpuMove();
});
restartCancel.addEventListener('click', () => {
  restartModal.classList.remove('active');
});

// --- Statistici ---
function updateStats() {
  xWins.textContent = stats.X;
  oWins.textContent = stats.O;
  draws.textContent = stats.draws;
}

// --- Inițializare ---
window.addEventListener('DOMContentLoaded', () => {
  renderBoard();
});
