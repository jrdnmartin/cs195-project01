const wordsList = ["coding", "javascript", "hangman", "project", "function", "variable", "array", "object", "string", "boolean"];
let targetWord = wordsList[Math.floor(Math.random() * wordsList.length)];

let bodyParts = ["😀", "👕", "👖", "👟", "🎩"];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = bodyParts.length;

function updateDisplay() {
    const wordDisplay = targetWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    document.getElementById('word-display').textContent = wordDisplay;
    document.getElementById('body-parts').innerHTML = bodyParts.slice(0, incorrectGuesses).map(part => `<div>${part}</div>`).join('');
    document.getElementById('incorrect-guesses').textContent = incorrectGuesses;
}

function handleGuess() {
    const guessInput = document.getElementById('letter-input');
    const guess = guessInput.value.toLowerCase();
    const guessMessage = document.getElementById('guess-message');
    guessInput.value = '';

    guessMessage.className = '';

    if (guessedLetters.includes(guess)) {
        guessMessage.textContent = `You already guessed the letter "${guess}".`;
        guessMessage.classList.add('warning');
        return;
    }

    if (guess === '' || !/^[a-z]$/.test(guess)) {
        guessMessage.textContent = 'Please enter a valid letter.';
        guessMessage.classList.add('warning');
        return;
    }

    guessedLetters.push(guess);

    if (targetWord.includes(guess)) {
        guessMessage.textContent = `Good job! The letter "${guess}" is in the word.`;
        guessMessage.classList.add('correct');
    } else {
        incorrectGuesses++;
        guessMessage.textContent = `Sorry, the letter "${guess}" is not in the word.`;
        guessMessage.classList.add('incorrect');
        
        const incorrectLetters = guessedLetters.filter(letter => !targetWord.includes(letter));
        document.getElementById('incorrect-letters').textContent = incorrectLetters.join(', ');
    }

    updateDisplay();
}

function checkGameOver() {
    if (targetWord.split('').every(letter => guessedLetters.includes(letter))) {
        showGameAlert('Congratulations! You won!', targetWord);
        return true;
    }
    
    if (incorrectGuesses >= maxIncorrectGuesses) {
        showGameAlert('Game Over! You lost!', targetWord);
        return true;
    }
    
    return false;
}

function showGameAlert(message, word) {
    const alert = document.getElementById('game-alert');
    const alertMessage = document.getElementById('alert-message');
    const alertWord = document.getElementById('alert-word');

    alertMessage.textContent = message;
    alertWord.textContent = word;

    alert.classList.remove('hidden');
}

function resetGame() {
    guessedLetters = [];
    incorrectGuesses = 0;
    targetWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    document.getElementById('incorrect-letters').textContent = '';
    
    const guessMessage = document.getElementById('guess-message');
    guessMessage.textContent = '';
    guessMessage.className = '';

    const alert = document.getElementById('game-alert');
    alert.classList.add('hidden');
    
    updateDisplay();
}

document.getElementById('play-again-button').addEventListener('click', () => {
    resetGame();
});

document.getElementById('guess-button').addEventListener('click', () => {
    handleGuess();
    checkGameOver();
});

document.getElementById('letter-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
        checkGameOver();
    }
});

updateDisplay();