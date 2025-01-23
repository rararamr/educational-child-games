var targetNumber = 0; // Variable to store the target number
var targetItem = ""; // Variable to store the target item
var puzzleContainer = document.getElementById("puzzleContainer");
var buttonContainer = document.getElementById("buttonContainer");
var totalScoreDisplay = document.getElementById("totalScore"); // Get the total score element
var livesDisplay = document.getElementById("lives"); // Get the lives display element

// Mapping of fruits to emojis
var fruitEmojis = {
    "apples": "🍎",
    "bananas": "🍌",
    "oranges": "🍊",
    "pears": "🍐",
    "grapes": "🍇",
    "strawberries": "🍓",
    "blueberries": "🔵",
    "cherries": "🍒",
    "kiwis": "🥝",
    "mangoes": "🥭"
};

var totalScore = 0; // Variable to store the total score
var lives = 3; // Variable to store the number of lives

window.onload = function() {
    // Generate the "Start Game" button
    generateStartButton();
}

function generateStartButton() {
    var startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.onclick = startGame;
    buttonContainer.appendChild(startButton);
}

function startGame() {
    // Clear the button container
    buttonContainer.innerHTML = "";
    
    // Reset total score and lives
    totalScore = 0;
    lives = 3;

    // Show the total score and lives only after starting the game
    totalScoreDisplay.style.display = "block";
    livesDisplay.style.display = "block";

    // Display lives count
    updateLivesDisplay();

    // Show puzzle word
    puzzleContainer.style.display = "block";

    // Generate new question
    generateNewQuestion();
}



function generateNewQuestion() {
    // Clear the puzzle container
    puzzleContainer.innerHTML = "";

    // Clear the button container before generating new buttons
    buttonContainer.innerHTML = "";

    // Clear the previous target number and item
    targetNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    targetItem = getRandomItem();

    // Display the puzzle to the user
    var puzzleText = document.createElement("div");
    puzzleText.className = "puzzle-text";
    puzzleText.textContent = "If I have " + targetNumber + " " + targetItem + fruitEmojis[targetItem] + ", how many is it?"; // Append emoji
    puzzleContainer.appendChild(puzzleText);

    // Generate buttons for guessing
    for (var i = 1; i <= 10; i++) {
        var button = document.createElement("button");
        button.textContent = i;
        button.onclick = function() {
            checkAnswer(parseInt(this.textContent));
        };
        buttonContainer.appendChild(button);
    }
}


function getRandomItem() {
    var items = ["apples", "bananas", "oranges", "pears", "grapes", "strawberries", "blueberries", "cherries", "kiwis", "mangoes"];
    return items[Math.floor(Math.random() * items.length)];
}

function checkAnswer(guess) {
    if (guess === targetNumber) {
        displayResult("Correct!");
        updateTotalScore(); // Sync total score after correct answer
    } else {
        displayResult("Incorrect guess. Please try again.");
        loseLife(); // Decrease life count after incorrect answer
    }
}

function displayResult(result) {
    if (result === "Correct!") {
        alert(result);
    } else {
        document.getElementById('result').innerText = result;
    }
}

function updateTotalScore() {
    totalScore++; // Increment the total score for correct answer
    totalScoreDisplay.innerText = "Total Score: " + totalScore; // Update total score display
    // Generate new question only after updating the total score
    generateNewQuestion();
}

function loseLife() {
    lives--; // Decrease the number of lives

    if (lives === 0) {
        alert("Game Over! Try again next time.");
        buttonContainer.innerHTML = ""; // Clear button container
        generateStartButton(); // Show the "Start Game" button

        // Hide puzzle word, result, total score, and lives
        puzzleContainer.style.display = "none";
        document.getElementById('result').style.display = "none";
        totalScoreDisplay.style.display = "none";
        livesDisplay.style.display = "none";
    } else {
        updateLivesDisplay(); // Update the lives display
    }
}



function updateLivesDisplay() {
    livesDisplay.innerText = "Lives: " + lives; // Update the lives display
}
