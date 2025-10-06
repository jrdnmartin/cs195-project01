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

    if (guess === '') {
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
        document.getElementById('incorrect-letters').textContent = guessedLetters.join(', ');
    }

    updateDisplay();
}

function checkGameOver() {
    if (incorrectGuesses >= maxIncorrectGuesses) {
        alert(`Game Over! The word was "${targetWord}".`);
        resetGame();
    } else if (targetWord.split('').every(letter => guessedLetters.includes(letter))) {
        alert('Congratulations! You guessed the word!');
        resetGame();
    }
}

function resetGame() {
    guessedLetters = [];
    incorrectGuesses = 0;
    targetWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    document.getElementById('incorrect-letters').textContent = '';
    const guessMessage = document.getElementById('guess-message');
    guessMessage.textContent = '';
    guessMessage.className = '';
    updateDisplay();
}

document.getElementById('guess-button').addEventListener('click', () => {
    handleGuess();
    checkGameOver();
});
updateDisplay();