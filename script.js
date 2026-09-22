const buttonOrder = ["X", "Y", "A", "B"];
const targetButton = document.querySelector("#targetButton");
const targetLetter = document.querySelector("#targetLetter");
const targetSign = document.querySelector("#targetSign");
const feedback = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const streakElement = document.querySelector("#streak");
const bestElement = document.querySelector("#best");
const resetButton = document.querySelector("#resetButton");
const toggleControllerButton = document.querySelector("#toggleControllerButton");
const toggleClueButton = document.querySelector("#toggleClueButton");
const practiceShell = document.querySelector(".practice-shell");
const controllerZone = document.querySelector("#controllerZone");
const modeButtons = document.querySelectorAll("[data-mode]");
const faceButtons = document.querySelectorAll(".face-button");
const arrowKeyMap = {
    ArrowUp: "X",
    ArrowLeft: "Y",
    ArrowRight: "A",
    ArrowDown: "B"
};

let currentTarget = "A";
let previousTarget = "";
let score = 0;
let streak = 0;
let best = Number(localStorage.getItem("switchButtonBest") || 0);
let cluesEnabled = localStorage.getItem("switchButtonClues") !== "off";
let mode = "normal";
let speedTimer = null;

bestElement.textContent = best;

function chooseTarget() {
    const choices = buttonOrder.filter((button) => button !== previousTarget);
    currentTarget = choices[Math.floor(Math.random() * choices.length)];
    previousTarget = currentTarget;
    targetLetter.textContent = currentTarget;
    targetSign.className = `target-sign sign-${buttonPosition(currentTarget)}`;
    targetButton.className = targetButtonClass(currentTarget);
    targetButton.setAttribute("aria-label", `${currentTarget}, ${buttonPosition(currentTarget)}`);
    targetButton.style.background = targetColor(currentTarget);

    faceButtons.forEach((button) => {
        button.classList.toggle("is-target", button.dataset.button === currentTarget);
    });
}

function targetButtonClass(button) {
    return `target-button button-${button.toLowerCase()}${cluesEnabled ? " clues-on" : ""}`;
}

function targetColor(button) {
    return {
        X: "#00a7c8",
        Y: "#f4be32",
        A: "#ff4f5e",
        B: "#2fb875"
    }[button];
}

function updateStats() {
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    bestElement.textContent = best;
    localStorage.setItem("switchButtonBest", String(best));
}

function clearSpeedTimer() {
    if (speedTimer) {
        clearTimeout(speedTimer);
        speedTimer = null;
    }
}

function startSpeedTimer() {
    clearSpeedTimer();

    if (mode !== "speed") {
        return;
    }

    speedTimer = setTimeout(() => {
        streak = 0;
        feedback.textContent = `${currentTarget} timed out.`;
        feedback.className = "feedback miss";
        chooseTarget();
        updateStats();
        startSpeedTimer();
    }, 1800);
}

function flashButton(button, className) {
    button.classList.remove("correct-flash", "miss-flash");
    button.classList.add(className);
    setTimeout(() => button.classList.remove(className), 220);
}

function handleGuess(guess) {
    const button = document.querySelector(`[data-button="${guess}"]`);

    if (!button) {
        return;
    }

    if (guess === currentTarget) {
        score += 1;
        streak += 1;
        best = Math.max(best, streak);
        feedback.textContent = `${guess} is right.`;
        feedback.className = "feedback correct";
        flashButton(button, "correct-flash");
        chooseTarget();
        startSpeedTimer();
    } else {
        streak = 0;
        feedback.textContent = `${guess} is ${buttonPosition(guess)}. Find ${currentTarget}.`;
        feedback.className = "feedback miss";
        flashButton(button, "miss-flash");
    }

    updateStats();
}

function buttonPosition(button) {
    return {
        X: "up",
        Y: "left",
        A: "right",
        B: "down"
    }[button];
}

function resetPractice() {
    score = 0;
    streak = 0;
    feedback.textContent = "Fresh round.";
    feedback.className = "feedback";
    chooseTarget();
    updateStats();
    startSpeedTimer();
}

function setControllerVisible(isVisible) {
    controllerZone.classList.toggle("is-hidden", !isVisible);
    practiceShell.classList.toggle("controller-hidden", !isVisible);
    toggleControllerButton.textContent = isVisible ? "Hide Joy-Con" : "Show Joy-Con";
    toggleControllerButton.setAttribute("aria-expanded", String(isVisible));
}

function setCluesEnabled(isEnabled) {
    cluesEnabled = isEnabled;
    targetButton.className = targetButtonClass(currentTarget);
    toggleClueButton.textContent = isEnabled ? "Hide clues" : "Show clues";
    toggleClueButton.classList.toggle("active", isEnabled);
    toggleClueButton.setAttribute("aria-pressed", String(isEnabled));
    localStorage.setItem("switchButtonClues", isEnabled ? "on" : "off");
}

faceButtons.forEach((button) => {
    button.addEventListener("click", () => handleGuess(button.dataset.button));
});

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        mode = button.dataset.mode;
        modeButtons.forEach((modeButton) => modeButton.classList.toggle("active", modeButton === button));
        feedback.textContent = mode === "speed" ? "Speed round is live." : "Practice at your pace.";
        feedback.className = "feedback";
        startSpeedTimer();
    });
});

resetButton.addEventListener("click", resetPractice);

toggleControllerButton.addEventListener("click", () => {
    setControllerVisible(controllerZone.classList.contains("is-hidden"));
});

toggleClueButton.addEventListener("click", () => {
    setCluesEnabled(!cluesEnabled);
});

window.addEventListener("keydown", (event) => {
    const guess = arrowKeyMap[event.key];

    if (guess) {
        event.preventDefault();
        handleGuess(guess);
    }
});

chooseTarget();
setCluesEnabled(cluesEnabled);
updateStats();