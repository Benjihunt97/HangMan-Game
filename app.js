const wordDisplay = document.getElementById('word-display');

const randomWords = ['hello', 'icodethis', 'coding', 'javascript', 'tailwind', 'england', 'runescape', 'minecraft', 'cryptography', 'pokemon'];

let secretWord = '';
let guessedLetters = [];
let guesses = 0;
const maxGuesses = 5;

const generateWord = () => {
  let randomIndex = Math.floor(Math.random() * randomWords.length);
  secretWord = randomWords[randomIndex];
  
  let underscoreDisplay = '';
  for (let i = 0; i < secretWord.length; i++) {
    underscoreDisplay += '_ ';
  }
  wordDisplay.innerHTML = underscoreDisplay.trim();
}

generateWord();

const guessLetter = (letter) => {
  // Check if the letter is in the secretWord
  if (secretWord.includes(letter)) {
    guessedLetters.push(letter);
    displayGuessedWord();
    checkWin();
  } else {
    guesses++;
    alert('Wrong letter!');
    checkLoss();
  }
}

const displayGuessedWord = () => {
  wordDisplay.innerHTML = '';
  const displayedWord = secretWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_');
  wordDisplay.innerHTML = displayedWord.join(' ');
}

const checkWin = () => {
  const secretWordArray = secretWord.split('');
  const allGuessed = secretWordArray.every(letter => guessedLetters.includes(letter));

  if (allGuessed) {
    alert('Congratulations! You win!');
    disableAllButtons();
    resetGame();
    generateWord();
  }
}

const checkLoss = () => {
  if (guesses >= maxGuesses) {
    alert('Sorry, you lost. The word was: ' + secretWord);
    disableAllButtons();
    resetGame();
    generateWord();
  }
}

const disableAllButtons = () => {
  btns.forEach(btn => {
    btn.disabled = true;
  });
}

const resetGame = () => {
  btns.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('bg-gray-100');
    btn.classList.remove('text-gray-300');
  });
  guesses = 0;
  guessedLetters = [];
  let underscoreDisplay = '';
  for (let i = 0; i < secretWord.length; i++) {
    underscoreDisplay += '_ ';
  }
  wordDisplay.innerHTML = underscoreDisplay.trim();
}

const btns = document.querySelectorAll('#alphabet-buttons button');

btns.forEach(btn => {
  btn.classList.add('bg-gray-300');
  btn.addEventListener('click', () => {
    btn.classList.add('bg-gray-100');
    btn.classList.add('text-gray-300');
    btn.disabled = true;

    let btnValue = btn.getAttribute('value');
    guessLetter(btnValue);
  });
});
  
