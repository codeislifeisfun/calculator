"use strict"

function operate(operator, num1, num2) {    
    let obj =  {
        '+' : num1 + num2,
        '-' : num1 - num2,
        '/' : num1 / num2,
        '*' : num1 * num2,
    };
    return obj[operator];
}

const screen = document.querySelector('.top');
let numResult = 0;
let temp = '';
let num2 = '';
let operator = '';
screen.textContent = numResult;

document.addEventListener('click', main);

function main(e) {
    const input = e.target;
    if (input.nodeName !== "BUTTON") return;
    getNumber(input);
    getOperator(input);
}

function getOperator(userInput) {
    if (userInput.className === 'symbols' && !userInput.id) {
        
    }
}

function getNumber(userInput) {
    if (userInput.className !== 'num') {
        return;
     } else {
        if (screen.textContent === '0' && userInput.textContent === '0') return;
        if (screen.textContent.includes('.') && userInput.textContent === '.') return;
        if (screen.textContent === '0' && userInput.textContent !== '0') {
            screen.textContent = userInput.textContent;
        } else {
            screen.textContent += userInput.textContent;
        }
     }
     temp = screen.textContent;
}