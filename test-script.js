// Test script pentru jocul X și O
// Rulează acest script în consola browser-ului pentru testare automată

console.log('🧪 Începe testarea funcționalității jocului X și O...\n');

// Funcție helper pentru logging
function logTest(testName, success, details = '') {
  const icon = success ? '✅' : '❌';
  console.log(`${icon} ${testName}: ${details}`);
}

// Test 1: Verifică existența elementelor DOM
function testDOMElements() {
  console.log('\n📋 Test 1: Verificare elemente DOM');
  
  const elements = {
    'Register Modal': document.getElementById('register-modal'),
    'Register Form': document.getElementById('register-form'),
    'Main Menu': document.getElementById('main-menu'),
    'Game Board': document.getElementById('game-board'),
    'Board Grid': document.querySelector('.board-grid'),
    'Result Modal': document.getElementById('result-modal'),
    'Restart Modal': document.getElementById('restart-modal')
  };
  
  let allPresent = true;
  for (const [name, element] of Object.entries(elements)) {
    const exists = element !== null;
    logTest(name, exists);
    if (!exists) allPresent = false;
  }
  
  return allPresent;
}

// Test 2: Simulare înregistrare
function testRegistration() {
  console.log('\n👤 Test 2: Formular de înregistrare');
  
  const nameInput = document.getElementById('player-name');
  const errorDiv = document.getElementById('register-error');
  const form = document.getElementById('register-form');
  
  // Test nume prea scurt
  nameInput.value = 'ab';
  const event1 = new Event('submit');
  form.dispatchEvent(event1);
  
  setTimeout(() => {
    const hasError = errorDiv.textContent.includes('3 și 16 caractere');
    logTest('Validare nume prea scurt', hasError, errorDiv.textContent);
  }, 100);
  
  // Test nume valid
  setTimeout(() => {
    nameInput.value = 'TestPlayer';
    document.querySelector('input[name="sign"][value="X"]').checked = true;
    const event2 = new Event('submit');
    form.dispatchEvent(event2);
    
    setTimeout(() => {
      const menuVisible = !document.getElementById('main-menu').classList.contains('hidden');
      const modalHidden = !document.getElementById('register-modal').classList.contains('active');
      logTest('Înregistrare validă', menuVisible && modalHidden, 'Redirecționare către meniu');
    }, 100);
  }, 200);
}

// Test 3: Simulare joc
function testGameplay() {
  console.log('\n🎮 Test 3: Logica jocului');
  
  // Simulare click pe "Joc nou"
  setTimeout(() => {
    const newGameBtn = document.getElementById('new-game-btn');
    newGameBtn.click();
    
    setTimeout(() => {
      const boardVisible = !document.getElementById('game-board').classList.contains('hidden');
      logTest('Pornire joc nou', boardVisible, 'Tabla de joc afișată');
      
      // Test mutare jucător
      const cells = document.querySelectorAll('.cell');
      if (cells.length === 9) {
        logTest('Generare tablă 3x3', true, '9 celule generate');
        
        // Simulare click pe prima celulă
        cells[0].click();
        
        setTimeout(() => {
          const cellFilled = cells[0].classList.contains('filled');
          logTest('Mutare jucător', cellFilled, 'Celula se umple la click');
          
          // Verifică mutarea CPU
          setTimeout(() => {
            const filledCells = document.querySelectorAll('.cell.filled').length;
            logTest('Mutare CPU', filledCells >= 2, `${filledCells} celule umplute`);
          }, 1000);
        }, 100);
      } else {
        logTest('Generare tablă 3x3', false, `${cells.length} celule în loc de 9`);
      }
    }, 100);
  }, 500);
}

// Test 4: Verificare UI elements
function testUIElements() {
  console.log('\n🎨 Test 4: Elemente UI');
  
  setTimeout(() => {
    const playerScore = document.getElementById('player-score');
    const cpuScore = document.getElementById('cpu-score');
    const turnText = document.getElementById('turn-text');
    const playerSign = document.getElementById('player-sign');
    const cpuSign = document.getElementById('cpu-sign');
    
    logTest('Afișare scor jucător', playerScore !== null, playerScore?.textContent);
    logTest('Afișare scor CPU', cpuScore !== null, cpuScore?.textContent);
    logTest('Indicator tură', turnText !== null, turnText?.textContent);
    logTest('Afișare semn jucător', playerSign !== null, playerSign?.textContent);
    logTest('Afișare semn CPU', cpuSign !== null, cpuSign?.textContent);
  }, 1000);
}

// Test 5: Test modale
function testModals() {
  console.log('\n🎯 Test 5: Modale');
  
  setTimeout(() => {
    const resultModal = document.getElementById('result-modal');
    const resultNewGame = document.getElementById('result-new-game');
    const resultQuit = document.getElementById('result-quit');
    const resultIcon = document.getElementById('result-icon');
    const resultMessage = document.getElementById('result-message');
    
    logTest('Modal rezultat existent', resultModal !== null);
    logTest('Buton "Joc nou"', resultNewGame !== null);
    logTest('Buton "Quit"', resultQuit !== null);
    logTest('Icoanã rezultat', resultIcon !== null);
    logTest('Mesaj rezultat', resultMessage !== null);
    
    // Test restart modal
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.click();
      
      setTimeout(() => {
        const restartModal = document.getElementById('restart-modal');
        const modalVisible = restartModal.classList.contains('active');
        logTest('Modal restart', modalVisible, 'Se afișează la click pe restart');
        
        // Închide modalul
        const cancelBtn = document.getElementById('restart-cancel');
        if (cancelBtn) cancelBtn.click();
      }, 100);
    }
  }, 1500);
}

// Test 6: Simulare joc complet
function testCompleteGame() {
  console.log('\n🏁 Test 6: Joc complet (simulare victorie)');
  
  setTimeout(() => {
    // Resetează jocul
    if (typeof resetBoard === 'function') {
      resetBoard();
      renderBoard();
    }
    
    // Simulare secvență de victorie pentru jucător
    const cells = document.querySelectorAll('.cell');
    if (cells.length >= 3) {
      // Jucătorul pune pe 0, 1
      cells[0].click();
      
      setTimeout(() => {
        cells[1].click();
        
        setTimeout(() => {
          cells[2].click(); // Linie câștigătoare
          
          setTimeout(() => {
            const resultModal = document.getElementById('result-modal');
            const modalVisible = resultModal.classList.contains('active');
            logTest('Detectare victorie', modalVisible, 'Modal rezultat se afișează');
            
            const resultTitle = document.getElementById('result-title');
            logTest('Mesaj victorie', resultTitle?.textContent.includes('Felicitări'), resultTitle?.textContent);
          }, 500);
        }, 700);
      }, 700);
    }
  }, 2000);
}

// Rulare toate testele
async function runAllTests() {
  console.log('🚀 Rulare teste complete...\n');
  
  const domTest = testDOMElements();
  
  if (domTest) {
    testRegistration();
    testGameplay();
    testUIElements();
    testModals();
    testCompleteGame();
    
    setTimeout(() => {
      console.log('\n📊 Testare completă finalizată! Verifică rezultatele de mai sus.');
      console.log('💡 Pentru teste interactive, deschide DevTools și urmărește comportamentul.');
    }, 5000);
  } else {
    console.log('❌ Testele nu pot continua - elemente DOM lipsă');
  }
}

// Auto-start testare
runAllTests();
