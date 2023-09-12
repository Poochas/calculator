const buttons = document.querySelectorAll('button');
const screen = document.getElementById('screen');
const decimal = document.querySelector('[data-key="NumpadDecimal');

let secondNumber = null
let firstOperator = null
let firstNumber = null
let secondOperator = null
let newNumber = true
let dashCounter = 0

let checkDecimal = () => screen.innerText.split('.').length - 1 < '1'

function input(e) {
    if (e != null) {
        if (e.getAttribute('data-key') == 'negative') {
            newNumber = true;
            updateInput(parseFloat(screen.innerText) * -1);
        }
        if (e.getAttribute('data-key') == 'Backspace') {
            if (screen.innerText.length == 1) { screen.innerText = 0 }
            else { screen.innerText = screen.innerText.slice(0, -1) }
        }
        if (e.getAttribute('data-key') == 'Delete') {
            reset()
            screen.innerText = '0';
        }
        if (e.classList == 'digit') {
            if (e.getAttribute('data-key') == 'NumpadDecimal') {
                if (checkDecimal()) { updateInput(e.innerText) }
            } else { updateInput(e.innerText) }
        }
        if (e.classList == 'operator') {
            if (firstOperator == null) { firstOperator = e.innerText }
            else { secondOperator = e.innerText }
            assignNumber()
            operate(e)
        }
        clickedButton(e);
        setTimeout(clickedButton, 100, e);
    }
}

window.addEventListener('keydown', keyboard)

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        input(e.currentTarget)
    })
})
function keyboard(e) {
    input(document.querySelector(`[data-key=${e.code}]`))
}

function clickedButton(button) {
    button.classList.toggle('clicked')
}



function updateInput(e) {
    if (newNumber) {
        if (e == '.') { screen.innerText = '0.' }
        else { screen.innerText = e; }
        newNumber = false
    }
    else {
        if (screen.innerText.length == 10) { screen.innerText = screen.innerText.slice(1) }
        screen.insertAdjacentText('beforeend', e)
    }
}

function assignNumber() {
    if (firstOperator != null && secondOperator == null) { firstNumber = screen.innerText }
    else { secondNumber = screen.innerText }
}
function reset() {
    secondNumber = null;
    firstNumber = null;
    firstOperator = null;
    secondOperator = null;
    newNumber = true
}

function operate(e) {
    if (secondNumber != null && e != '+/-') {
        switch (firstOperator) {
            case '+':
                firstNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
                screen.innerText = Math.round(firstNumber * 1000) / 1000;
                break;
            case '-':
                firstNumber = parseFloat(firstNumber) - parseFloat(secondNumber);
                screen.innerText = Math.round(firstNumber * 1000) / 1000;
                break;
            case 'x':
                firstNumber = parseFloat(firstNumber) * parseFloat(secondNumber);
                screen.innerText = Math.round(firstNumber * 1000) / 1000;
                break;
            case '÷':
                if (secondNumber == '0') { screen.innerText = 'Joking ?!'; reset() }
                else {
                    firstNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
                    screen.innerText = Math.round(firstNumber * 1000) / 1000;
                }
                break;
            default:
                screen.innerText = firstNumber
                break;
        }
        secondNumber = null;
    }
    if (secondOperator != null) { firstOperator = secondOperator; secondOperator = null }
    newNumber = true;
}