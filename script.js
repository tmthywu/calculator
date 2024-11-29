let nums = [];
let operator = "";
let previousInput = false; // false = previous input is operator, true = previous is number

let display = document.querySelector("#display");
let numberButtons = Array.from(document.querySelectorAll(".number"));
let operators = Array.from(document.querySelectorAll(".operator"));
let clear = document.querySelector(".clear")

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

// adding eventlisteners to operators
operators.forEach((item) => {
    item.addEventListener("click", (e) => {
        // update previousInput
        previousInput = false;
        
        // one number available
        if (nums[0] === undefined) {
            nums[0] = +display.textContent;
            display.textContent = +display.textContent;
            operator = e.currentTarget.textContent;
        } 
        
        // two numbers available
        else {
            nums[1] = +display.textContent;
            let result = operate(nums[0], nums[1], operator);
            display.textContent = result;
            // reset
            nums[0] = result;
            nums[1] = undefined;
            operator = e.currentTarget.textContent;
        }
    })
});

clear.addEventListener("click", (e) => {
    nums = [];
    operator = "";
    previousInput = false;
    display.textContent = "0";
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