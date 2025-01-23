document.addEventListener("DOMContentLoaded", function() {
    const leftBox = document.getElementById("left-box");
    const optionsContainer = document.getElementById("options");
    const levelDisplay = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score");
    const feedbackDisplay = document.getElementById("feedback");
    const resetBtn = document.getElementById("reset-btn");

    let level = 1;
    let score = 0;
    let timer;
    let timeLeft;

    startLevel();

    function startLevel() {
        levelDisplay.textContent = `Level: ${level}`;
        feedbackDisplay.textContent = "";
        scoreDisplay.textContent = `Score: ${score}`;
        timeLeft = 30; // Reduced time for testing purposes
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        resetBtn.style.display = "none";
        generateLevel();
        startTimer();
    }

    function generateLevel() {
        const numColors = 12;
        const colors = generateRandomColors(numColors);

        const correctColor = colors[Math.floor(Math.random() * colors.length)];
        leftBox.style.backgroundColor = correctColor;

        optionsContainer.innerHTML = "";
        for (let color of colors) {
            const option = document.createElement("div");
            option.classList.add("option");
            option.style.backgroundColor = color;
            option.addEventListener("click", function() {
                if (color === correctColor) {
                    clearInterval(timer);
                    score += 10;
                    scoreDisplay.textContent = `Score: ${score}`;
                    feedbackDisplay.textContent = "Correct! You earned 10 points.";
                    resetBtn.textContent = "Next Level";
                    resetBtn.style.display = "block";
                } else {
                    feedbackDisplay.textContent = "Incorrect! Try again.";
                }
            });
            optionsContainer.appendChild(option);
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft === 0) {
                clearInterval(timer);
                feedbackDisplay.textContent = "Time's up! Try again.";
                resetBtn.textContent = "Try Again";
                resetBtn.style.display = "block";
            }
        }, 1000);
    }

    resetBtn.addEventListener("click", function() {
        if (resetBtn.textContent === "Next Level") {
            level++;
        } else {
            level = 1; // Restart to level 1
            score = 0; // Reset the score
        }
        startLevel();
    });

    function generateRandomColors(num) {
        const colors = [];
        for (let i = 0; i < num; i++) {
            colors.push(randomColor());
        }
        return colors;
    }

    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
});