"use strict"

let presentNumber = '';
let previousNumber = '';
let operation = '';
let equalActive = false;
const screen = document.querySelector('.top');

const numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(key => key.addEventListener('click', getNumber));
function getNumber(e) {
    let selectedNumber = e.target.textContent;
    if (equalActive) {
        previousNumber = '';
        equalActive = false;
        presentNumber += selectedNumber;
        screen.textContent = presentNumber;
    } else {
        presentNumber += selectedNumber;
        screen.textContent = presentNumber;
    }
}

const periodKey = document.querySelector('.period');
periodKey.addEventListener('click', getPeriod);
function getPeriod(e) {
    if (presentNumber.includes('.')) return;
    presentNumber += '.';
    screen.textContent = presentNumber;
}

const operationKeys = document.querySelectorAll('.symbols');
operationKeys.forEach(key => key.addEventListener('click', getOperation));
function getOperation(e) {
    if (previousNumber && presentNumber && operation) {
        previousNumber = operate(previousNumber, presentNumber, operation);
        if (previousNumber === Infinity) {
            alert("Can't divide by zero");
            clearAll();
        } else {
            screen.textContent = previousNumber;
            operation = e.target.textContent;
            presentNumber = '';
        }
    } else if (equalActive) {
        operation = e.target.textContent;
        equalActive = false;
    } else {
        operation = e.target.textContent;
        previousNumber = presentNumber;
        presentNumber = '';
    }
}

const equalKey = document.querySelector('.equal');
equalKey.addEventListener('click', getEqual);
function getEqual(e) {
    if (previousNumber && presentNumber && operation) {
        previousNumber = operate(previousNumber, presentNumber, operation);
        if (previousNumber === Infinity) {
            alert("Can't divide by zero");
            clearAll();
        } else {
            screen.textContent = previousNumber;
            operation = '';
            presentNumber = '';
            equalActive = true;
        }
    }
}

const clearKey = document.querySelector('.btn-clear');
clearKey.addEventListener('click', clearAll);
function clearAll() {
    presentNumber = '';
    previousNumber = '';
    operation = '';
    equalActive = false;
    screen.textContent = '0';
}

function operate(firstNumber, secondNumber, operator) {
    let obj =  {
        '+' : +firstNumber + +secondNumber,
        '-' : +firstNumber - +secondNumber,
        '/' : +firstNumber / +secondNumber,
        'x' : +firstNumber * +secondNumber,
    };
    return obj[operator];
}