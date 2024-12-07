let nums = [];
let operator = "";
let previousInput = false; // false = previous input is operator, true = previous is number

let display = document.querySelector("#display");
let numberButtons = Array.from(document.querySelectorAll(".number"));
let operators = Array.from(document.querySelectorAll(".operator"));
let singleOperators = Array.from(document.querySelectorAll(".singleOperator"));
let clear = document.querySelector(".clear");

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
operators.forEach((item) => {
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
singleOperators.forEach((item) => {
    item.addEventListener("click", (e) => {
        let result = singleOperate(+display.textContent, e.currentTarget.textContent);
        display.textContent = result;
        nums = [];
        operator = "";
        previousInput = false;
    })
})

// clear
clear.addEventListener("click", () => {
    display.textContent = 0;
    nums = [];
    operator = "";
    previousInput = false;
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