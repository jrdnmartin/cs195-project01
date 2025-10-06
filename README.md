# Hangman Game - CS195 Project 01

A classic Hangman word-guessing game built with HTML, CSS, and JavaScript. Players try to guess a randomly selected word by suggesting letters before running out of attempts.

## Features

- **Random Word Selection**: Game randomly chooses from 10 different words
- **Visual Feedback**: Body parts appear as incorrect guesses accumulate
- **Input Validation**: Prevents duplicate guesses and invalid characters
- **Custom Alert System**: Custom pop-up notifications for game end states
- **Responsive Design**: Mobile-friendly interface
- **Interactive Elements**: Click buttons or press Enter to submit guesses

## What I Learned

### Custom Modal/Alert System
Instead of using the browser's built-in `alert()` function, I implemented a custom alert card using:
- **CSS Classes for Show/Hide**: Used `.hidden` class with `display: none` to control visibility
- **CSS Specificity**: Learned how ID selectors override class selectors and used `:not(.hidden)` to solve conflicts
- **Event-Driven UI**: Implemented show/hide functionality through JavaScript event listeners

### Dynamic DOM Manipulation
- **Template Literals**: Used backticks and `${}` syntax for dynamic HTML generation
- **Array Methods**: Leveraged `.map()`, `.filter()`, and `.join()` for data transformation
- **Conditional Rendering**: Implemented logic to display different content based on game state

## Challenges Faced

### CSS Specificity Issues
**Problem**: The alert card was showing by default even with the `.hidden` class applied.

**Solution**: The `#game-alert` ID selector was overriding the `.hidden` class. Fixed by using `#game-alert:not(.hidden)` for styling and adding `!important` to the hidden class.

### Game State Management
**Problem**: Alert was disappearing immediately after showing because `resetGame()` was called right after `showGameAlert()`.

**Solution**: Separated the game reset logic from the alert display. Now the alert stays visible until the user clicks "Play Again".

### Win/Loss Logic
**Problem**: Game was showing "You lost!" even when the player correctly guessed the word.

**Solution**: Reordered the win/loss checks in `checkGameOver()` to check for wins before checking for losses.

## AI Usage

VSC's built-in CoPilot was occasionally used for debugging/generating ideas on how to solve issues I was encountering. Often, it suggested things that made sense but also ran in circles a couple of times — I avoided using it for generating new content because it bloated my code.
