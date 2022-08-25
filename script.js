"use strict"

const screen = document.querySelector('.top');
let numResult = '';
let num1 = '';
let num2 = '';
let activeOperation = '';
let nextOperation = '';
let operatorActive = false;
//screen.textContent = numResult;

document.addEventListener('click', main);

function main(e) {
    const input = e.target;
    if (input.nodeName !== "BUTTON") return;
    listenForClear(input);
    listenForNumber(input);
    listenForOperator(input);
    //listenForEquals(input);
}
/*
function listenForEquals(userInput) {
    let result = 0;
    if (userInput.id) {
        if (activeOperation, num2, num1) {
            numResult = operate(activeOperation, +num2, +num1);
        }
    }
    screen.textContent = numResult;
}
*/
function listenForOperator(userInput) {    
    if (userInput.className === 'symbols') {
        nextOperation = userInput.textContent;
        operatorActive = true;

        if (!num2) {
            num2 = num1;
            num1 = '';
            activeOperation = nextOperation;
        } else if (num1 && num2 && nextOperation) {
            numResult = operate(activeOperation, num1, num2);
            screen.textContent = numResult;
            num2 = numResult;
            numResult = ''
            num1 = '';
            activeOperation = nextOperation;
        }
    }
}

function listenForNumber(userInput) {
    if (userInput.className !== 'num') return;
    if (operatorActive) {
        screen.textContent = userInput.textContent;
        operatorActive = false;
    } else {
        if (screen.textContent === '0' && userInput.textContent === '0') return;
        if (screen.textContent.includes('.') && userInput.textContent === '.' ) return;
        if (screen.textContent === '0' && userInput.textContent !== '0' ) {
            screen.textContent = userInput.textContent;
        } else {
            screen.textContent += userInput.textContent;
        }
     }
     num1 = screen.textContent;
}

function listenForClear(userInput) {
    if (userInput.className === 'btn-clear') {
        numResult = '';
        num1 = '';
        num2 = '';
        activeOperation = '';
        nextOperation = '';
        operatorActive = false;
        screen.textContent = '0';
    }
}

function operate(operator, num1, num2) {    
    let obj =  {
        '+' : +num2 + +num1,
        '-' : +num2 - +num1,
        '/' : +num2 / +num1,
        'x' : +num2 * +num1,
    };
    return obj[operator];
}