"use strict"

let presentNumber = '';
let previousNumber = '';
let operation = '';
let screen = document.querySelector('.top');

const numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(key => key.addEventListener('click', getNumber));
function getNumber(e) {
    let selectedNumber = e.target.textContent;
    presentNumber += selectedNumber;
    screen.textContent = presentNumber;
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
        screen.textContent = previousNumber;
        operation = e.target.textContent;
        presentNumber = '';
    } else {
        operation = e.target.textContent;
        previousNumber = presentNumber;
        presentNumber = '';
    }
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