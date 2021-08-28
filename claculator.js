let runingTotal = 0;
let buffer = "0";
let previousOperator = null; //  number, string, null, undefined, NaN + Not a Number ,boolean, object, array, function

const screen = document.querySelector(".screen");

document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        console.log(value);
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runingTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runingTotal;
            runingTotal = 0;
            break;
        case "←":
            if (buffer.lenght === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runingTotal === 0) {
        runingTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runingTotal += intBuffer;
    } else if (previousOperator === "-") {
        runingTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runingTotal *= intBuffer;
    } else {
        runingTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}
