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
const resultIcon = document.getElementById('result-icon');
const resultMessage = document.getElementById('result-message');
const resultNewGame = document.getElementById('result-new-game');
const resultQuit = document.getElementById('result-quit');
const restartModal = document.getElementById('restart-modal');
const restartConfirm = document.getElementById('restart-confirm');
const restartCancel = document.getElementById('restart-cancel');
const xWins = document.getElementById('x-wins');
const oWins = document.getElementById('o-wins');
const draws = document.getElementById('draws');
const playerSignDisplay = document.getElementById('player-sign');
const cpuSignDisplay = document.getElementById('cpu-sign');
const playerScoreDisplay = document.getElementById('player-score');
const cpuScoreDisplay = document.getElementById('cpu-score');
const turnText = document.getElementById('turn-text');

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
  updateGameInfo();
  gameActive = true;
  currentTurn = 'X';
  updateTurnIndicator();
  if (playerSign !== 'X') {
    setTimeout(cpuMove, 500);
  }
}

// --- Tabla de joc ---
function renderBoard() {
  boardGrid.innerHTML = '';
  board.forEach((cell, idx) => {
    const div = document.createElement('div');
    div.className = 'cell' + (cell ? ' filled ' + cell : '');
    div.textContent = cell;
    div.addEventListener('click', () => handleCellClick(idx));
    boardGrid.appendChild(div);
  });
}

function updateGameInfo() {
  playerSignDisplay.textContent = playerSign;
  cpuSignDisplay.textContent = cpuSign;
  playerScoreDisplay.textContent = stats[playerSign];
  cpuScoreDisplay.textContent = stats[cpuSign];
}

function updateTurnIndicator() {
  if (!gameActive) return;
  turnText.textContent = currentTurn === playerSign ? 'Tura ta' : 'Tura CPU';
}

function handleCellClick(idx) {
  if (!gameActive || board[idx] || currentTurn !== playerSign) return;
  board[idx] = playerSign;
  renderBoard();
  if (checkGameOver()) return;
  currentTurn = cpuSign;
  updateTurnIndicator();
  setTimeout(cpuMove, 600);
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
  updateTurnIndicator();
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
      const winner = board[a];
      const isPlayerWin = winner === playerSign;
      showResult(
        isPlayerWin ? 'Felicitări!' : 'Ai pierdut!',
        isPlayerWin ? '🎉' : '😔',
        isPlayerWin ? 'Ai câștigat această rundă!' : 'CPU-ul a câștigat această rundă.'
      );
      stats[winner]++;
      updateStats();
      updateGameInfo();
      return true;
    }
  }
  if (board.every(cell => cell)) {
    gameActive = false;
    showResult('Egal!', '🤝', 'Nimeni nu a câștigat această rundă.');
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
function showResult(title, icon, message) {
  resultTitle.textContent = title;
  resultIcon.textContent = icon;
  resultMessage.textContent = message;
  resultModal.classList.add('active');
}
resultNewGame.addEventListener('click', () => {
  resultModal.classList.remove('active');
  resetBoard();
  renderBoard();
  updateGameInfo();
  gameActive = true;
  currentTurn = 'X';
  updateTurnIndicator();
  if (playerSign !== 'X') {
    setTimeout(cpuMove, 500);
  }
});
resultQuit.addEventListener('click', () => {
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
  updateGameInfo();
  gameActive = true;
  currentTurn = 'X';
  updateTurnIndicator();
  if (playerSign !== 'X') {
    setTimeout(cpuMove, 500);
  }
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
