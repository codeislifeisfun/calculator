"use strict"

let presentNumber = '';
let previousNumber = '';
let operation = '';
let equalActive = false;
const screen = document.querySelector('.top');

const numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(key => key.addEventListener('click', e => getNumber(e.target.textContent)));
function getNumber(e) {
    let selectedNumber = e;
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
function getPeriod() {
    if (!presentNumber.includes('.')) {
        presentNumber += '.';
        screen.textContent = presentNumber;
    }
};

const operationKeys = document.querySelectorAll('.symbols');
operationKeys.forEach(key => key.addEventListener('click', e => getOperation(e.target.textContent)));
function getOperation(e) {
    if (previousNumber && presentNumber && operation) {
        previousNumber = operate(previousNumber, presentNumber, operation);
        if (previousNumber === Infinity) {
            alert("Can't divide by zero");
            clearAll();
        } else if (previousNumber.toString().length > 10) {
            screen.textContent = previousNumber.toExponential(3);
            operation = e;
            presentNumber = '';
        } else {
            screen.textContent = previousNumber;
            operation = e;
            presentNumber = '';
        }
    } else if (equalActive) {
        operation = e;
        equalActive = false;
    } else {
        operation = e;
        previousNumber = presentNumber;
        presentNumber = '';
    }
}

const equalKey = document.querySelector('.equal');
equalKey.addEventListener('click', getEqual);
function getEqual() {
    if (previousNumber && presentNumber && operation) {
        previousNumber = operate(previousNumber, presentNumber, operation);
        if (previousNumber === Infinity) {
            alert("Can't divide by zero");
            clearAll();
        } else if (previousNumber.toString().length > 10) {
            screen.textContent = previousNumber.toExponential(3);
            operation = '';
            presentNumber = '';
            equalActive = true;
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

window.addEventListener('keydown', keyboardEntry);
function keyboardEntry(e) {
    e.preventDefault();
    if (+e.key >=0 || +e.key<=9) {
        getNumber(e.key);
    } else if (e.key === '.') {
        getPeriod();
    } else if (e.key ==='+' || e.key ==='-' || e.key ==='/') {
        getOperation(e.key);
    } else if (e.key === '*') {
        getOperation('x')
    } else if (e.key === 'Enter') {
        getEqual();
    }
}

function operate(firstNumber, secondNumber, operator) {
    let obj =  {
        '+' : +firstNumber + +secondNumber,
        '-' : +firstNumber - +secondNumber,
        '/' : +firstNumber / +secondNumber,
        'x' : +firstNumber * +secondNumber,
        '*' : +firstNumber * +secondNumber,
    };
    return obj[operator];
}