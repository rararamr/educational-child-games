// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Define an array of words with their types (verb or noun) by level
const wordsByLevel = {
  easy: [
    { word: "bake", type: "verb" },
    { word: "knife", type: "noun" },
    { word: "stir", type: "verb" },
    { word: "spoon", type: "noun" },
    { word: "mix", type: "verb" },
    { word: "pan", type: "noun" },
  ],
  medium: [
    { word: "cook", type: "verb" },
    { word: "plate", type: "noun" },
    { word: "grill", type: "verb" },
    { word: "fork", type: "noun" },
    { word: "baste", type: "verb" },
    { word: "bowl", type: "noun" },
  ],
  hard: [
    { word: "slice", type: "verb" },
    { word: "pot", type: "noun" },
    { word: "fry", type: "verb" },
    { word: "oven", type: "noun" },
  ],
};

// Define initial level
let currentLevel = "easy";

// Get words for the current level
let words = getWordsByLevel(currentLevel);

// Shuffle the words in the easy mode only
if (currentLevel === "easy") {
  words = shuffleArray(words);
}

console.log(words); // Display the array in the console

let currentWordIndex = 0;
let score = 0;
let timeLeft = 30; // Set initial time left to 30 seconds
let timerInterval; // Variable to store the interval reference

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(updateTimer, 1750); // Update timer every second
}

// Function to update the timer display
function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = "Time Left: " + timeLeft + " seconds";
  timeLeft--; // Decrement time left

  if (timeLeft < 0) {
    clearInterval(timerInterval); // Stop the timer when time runs out
    timerDisplay.innerText = "Time's up!";
    timerDisplay.style.color = "red"; // Change text color to red for emphasis
    timerDisplay.style.fontWeight = "bold"; // Make text bold for emphasis
    // Reset the game after the user clicks OK
    resetGame();
    // Clear the result message after the alert is dismissed
    document.getElementById("result").innerText = "";
  }
}

// Function to reset the game
function resetGame() {
  clearInterval(timerInterval); // Stop the timer interval
  timeLeft = 30; // Reset the time left to 30 seconds (or any initial time you want)
  score = 0; // Reset the score
  currentWordIndex = 0; // Reset the current word index
  document.getElementById("score").innerText = "Score: " + score; // Update the score display
  document.getElementById("timer").innerText = "Time Left: " + timeLeft + " seconds"; // Reset the timer display
  document.getElementById("timer").style.color = "black"; // Reset text color to black
  document.getElementById("timer").style.fontWeight = "normal"; // Reset text weight to normal
  startTimer(); // Start the timer again

  if (currentLevel === "easy") {
    words = shuffleArray(words); // Shuffle the words again if the current level is easy
  }
}

// Function to check the user's answer
function checkAnswer(answer) {
  const correctAnswer = words[currentWordIndex].type;
  if (answer === correctAnswer) {
    document.getElementById("result").innerText = "Correct!";
    score++;
    document.getElementById("score").innerText = "Score: " + score; // Update score display
    nextWord(); // Move to the next word
  } else {
    score = 0; // Reset score to zero
    resetGame(); // Reset game to the beginning
    // Show Game Over alert and restart the game
    gameOver();
  }

  // If the user completes all words in the current level, move to the next level
  if (currentWordIndex === words.length - 1) {
    if (currentLevel === "easy") {
      // Alert to notify the user that they have completed the easy level
      alert("Congratulations! You have completed the Easy level. Click OK to continue to the Medium level.");
      currentLevel = "medium"; // Move to medium level
    } else if (currentLevel === "medium") {
      // Alert to notify the user that they have completed the medium level
      alert("Congratulations! You have completed the Medium level. Click OK to continue to the Hard level.");
      currentLevel = "hard"; // Move to hard level
    } else {
      // If all levels are completed, you can handle it accordingly (e.g., end the game)
      alert("Congratulations! You have completed all levels."); 
      // Automatically restart the game
      autoRestartGame();
      return; // Exit the function
    }
    // Update the level display
    document.getElementById("level").innerText = "Level: " + currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    // Get words for the new level
    words = getWordsByLevel(currentLevel);
    // Reset the game for the new level
    resetGame();
  }
}

// Function to handle game over
function gameOver() {
  // Show Game Over alert
  alert("Game Over! Click OK to restart.");
  // Automatically restart the game
  autoRestartGame();
}


// Function to display the current word
function displayWord() {
  document.getElementById("word").innerText = words[currentWordIndex].word;
}

// Call the displayWord function whenever you need to display the word again
displayWord(); // Call this wherever you want to display the word again


// Function to auto restart the game after completing all levels
function autoRestartGame() {
  currentLevel = "easy"; // Move back to easy level
  words = getWordsByLevel(currentLevel);
  resetGame();
  displayWord();
  document.getElementById("level").innerText = "Level: " + currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

  // Hide game elements and display the start button without delay
  document.getElementById("buttons").style.display = "none"; // Hide answer buttons
  document.getElementById("word").style.display = "none"; // Hide word display
  document.getElementById("score").style.display = "none"; // Hide score display
  document.getElementById("timer").style.display = "none"; // Hide timer display
  document.getElementById("level").style.display = "none"; // Hide level display
  document.getElementById("startButton").style.display = "block"; // Show the start button

  // Reset currentLevel to "easy" to ensure the game starts from the beginning when "Start Game" button is clicked
  currentLevel = "easy";
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval); // Stop the timer interval
  timeLeft = 30; // Reset the time left to 30 seconds (or any initial time you want)
  startTimer(); // Start the timer again
}

// Function to move to the next word
function nextWord() {
  currentWordIndex++; // Move to the next word

  if (currentWordIndex >= words.length) {
    // If all words have been shown, check the current level and move to the next level
    if (currentLevel === "easy") {
      currentLevel = "medium"; // Move to the medium level
      currentWordIndex = 0; // Reset the word index for the medium level
    } else if (currentLevel === "medium") {
      currentLevel = "hard"; // Move to the hard level
      currentWordIndex = 0; // Reset the word index for the hard level
    } else {
      // If all levels have been completed, you can handle it accordingly (e.g., end the game)
      alert("Congratulations! You have completed all levels."); 
      // Automatically restart the game
      autoRestartGame();
      return; // Exit the function
    }
    // Display the first word of the new level
    displayWord();
    // Update the level display
    document.getElementById("level").innerText = "Level: " + currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
  }

  document.getElementById("result").innerText = "Correct!"; // Display "Correct!" text
  displayWord(); // Display the next word
  
  // Hide the "Correct!" text after 500 milliseconds
  setTimeout(() => {
    document.getElementById("result").innerText = "";
  }, 400);
}

// Function to set the game level
function setLevel(level) {
  currentLevel = level;
  words = getWordsByLevel(currentLevel);
  resetGame();
  document.getElementById("level").innerText = "Level: " + level.charAt(0).toUpperCase() + level.slice(1); // Update displayed level
}

// Function to get words for the current level
function getWordsByLevel(level) {
  return wordsByLevel[level];
}

// Function to hide the word
function hideWord() {
  document.getElementById("word").style.display = "none";
}

// Function to show the word
function showWord() {
  document.getElementById("word").style.display = "block";
}

// Call the hideWord function to hide the word initially
hideWord();

// Call the showWord function when starting the game
function startGame() {
  resetGame(); // Reset the game
  document.getElementById("buttons").style.display = "block"; // Display the answer buttons
  document.getElementById("score").style.display = "block"; // Display the score
  document.getElementById("timer").style.display = "block"; // Display the timer
  document.getElementById("level").style.display = "block"; // Display the level
  document.getElementById("startButton").style.display = "none"; // Hide the start button
  showWord(); // Show the word
  displayWord(); // Display the word
  setTimeout(() => {
    startTimer(); // Start the timer after a delay
  }, 1000); // Delay timer start by 1 second
}


// Call the startTimer function when the page loads or when you want to start the timer
startTimer();
