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

console.log(operate('+', 1, 2));