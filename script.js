let nums = [];
let operator = "";
let previousInput = false; // false = previous input is operator, true = previous is number

let display = document.querySelector("#display");
let numberButtons = Array.from(document.querySelectorAll(".number"));
let operatorButtons = Array.from(document.querySelectorAll(".operator"));
let singleOperatorButtons = Array.from(document.querySelectorAll(".singleOperator"));
let clearButton = document.querySelector(".clear");

// adding numbers to the display when they're clicked
numberButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        // previous input was number
        if (previousInput) {
            display.textContent += e.currentTarget.textContent;
        } 
        
        // previous input was operator
        else {
            display.textContent = e.currentTarget.textContent;
        }
        
        // update previousInput
        previousInput = true;
    })
});

// adding eventlisteners to operators; two-number operators
operatorButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        // one number available
        if (nums[0] === undefined) {
            nums[0] = +display.textContent;
            display.textContent = +display.textContent;
        } 
        
        // two numbers available
        else {
            nums[1] = +display.textContent;
            let result = operate(nums[0], nums[1], operator);
            display.textContent = result;
            // reset
            nums[0] = result;
            nums[1] = undefined;
        }

        // reset operator
        operator = e.currentTarget.textContent;
        // update previousInput
        previousInput = false;
    })
});

// single-number operators
singleOperatorButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        let result = singleOperate(+display.textContent, e.currentTarget.textContent);
        display.textContent = result;
        nums = [];
        operator = "";
        previousInput = false;
    })
})

// clear
clearButton.addEventListener("click", () => {
    display.textContent = 0;
    nums = [];
    operator = "";
    previousInput = false;
})

// keyboard input
window.addEventListener("keypress", (e) => {
    console.log("key=" + e.key + " code=" + e.code);
    let event = new Event("click");
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    let operators = ["+", "-", "*", "/", "="];
    let singleOperators = ["±", "%"];
    let clear = "Escape";
    if (numbers.includes(e.key)) {
        console.log("it's a number!");
        numberButtons.forEach((item) => {
            if (item.textContent === e.key) {
                item.dispatchEvent(event);
                return;
            }
        })
    } else if (operators.includes(e.key) || e.key === "Enter") {
        console.log("it's an operator!");
        operatorButtons.forEach((item) => {
            if (item.textContent === e.key || (item.textContent === "=" && e.key === "Enter")) {
                item.dispatchEvent(event);
                return;
            }
        })
    } else if (singleOperators.includes(e.key)) {
        console.log("it's a single operator!");
        singleOperatorButtons.forEach((item) => {
            if (item.textContent === e.key || item.textContent === "+/-" && e.key === "±") {
                item.dispatchEvent(event);
                return;
            }
        })
    } else if (clear === e.key) {
        console.log("it's a clear");
        clearButton.dispatchEvent(event);
    } else {
        console.log("wtf");
    }
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else if (operator === "=") {
        return b;
    }
}

function singleOperate(a, operator) {
    if (operator === "+/-") {
        return -a;
    } else if (operator === "%") {
        return a/100;
    }
}