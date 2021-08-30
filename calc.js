let blackScreenText = "0";
let commandButton = null;
let totalResult = 0;

const screen = document.querySelector(".screen");

const buttonsArea = document.querySelector(".calc-buttons");
buttonsArea.addEventListener("click", handleButtonsClick);

function handleButtonsClick(event) {
    const currentButtonText = event.target.innerText;
    if (isNaN(parseInt(currentButtonText))) {
        handleControlClick(currentButtonText);
    } else {
        handleNumberClick(currentButtonText);
    }
    render();
}

function handleControlClick(currentControl) {
    if (currentControl === "C") {
        blackScreenText = "0";
        commandButton = null;
        totalResult = 0;
    } else if (currentControl === "←") {
        blackScreenText = blackScreenText.substr(0, blackScreenText.length - 1);
        if (blackScreenText.length === 0) {
            blackScreenText = "0";
        }
    } else if (currentControl === "=") {
        handleMathOperation();
    } else {
        totalResult = parseInt(blackScreenText);
        blackScreenText = "0";
        commandButton = currentControl;
    }
}

function handleMathOperation() {
    const onscreen = parseInt(blackScreenText);
    switch (commandButton) {
        case "÷":
            blackScreenText = totalResult / onscreen;
            break;
        case "×":
            blackScreenText = totalResult * onscreen;
            break;
        case "-":
            blackScreenText = totalResult - onscreen;
            break;
        case "+":
            blackScreenText = totalResult + onscreen;
        default:
            break;
    }
}

function handleNumberClick(currentNumber) {
    if (blackScreenText === "0") {
        blackScreenText = currentNumber;
    } else {
        blackScreenText = `${blackScreenText}${currentNumber}`;
    }
}

function render() {
    screen.innerText = blackScreenText;
}
