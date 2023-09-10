const buttons = document.querySelectorAll('button');
const screen = document.getElementById('screen');
let inputNumber = null
let operator = null
let answerNumber = null
let newNumber = true

function input(e) {
    if (e != null) {
        if (e.getAttribute('data-key') == 'negative') {
            newNumber = true;
            updateInput(parseFloat(screen.innerText) * -1);
        }
        if (e.getAttribute('data-key') == 'Backspace') {
            if (screen.innerText.length == 1) { screen.innerText = 0 }
            else { screen.innerText = screen.innerText.slice(0, -1) }
            inputNumber = screen.innerText
        }
        if (e.getAttribute('data-key') == 'Delete') { screen.innerText = '0'; inputNumber = null; answerNumber = null; operator = null; newNumber = true };
        if (e.classList == 'digit') {
            updateInput(e.innerText)
        };
        if (e.classList == 'operator') {
            operator = e.innerText == '=' ? operator : e.innerText;
            operate(operator)
        };
        clickedButton(e);
        setTimeout(clickedButton, 100, e);
    }
}

window.addEventListener('keydown', keyboard)

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        input(e.currentTarget)
    })
    button.addEventListener('keydown', keyboard)
})
function keyboard(e) {
    input(document.querySelector(`[data-key=${e.code}]`))
}

function clickedButton(button) {
    button.classList.toggle('clicked')
}

function updateInput(e) {
    if (newNumber) { screen.innerText = e; newNumber = false; console.log(e) }
    else {
        screen.insertAdjacentText('beforeend', e)
    }
}

function operate(e) {
    if (answerNumber == null) { answerNumber = screen.innerText }
    else { inputNumber = screen.innerText }
    if (inputNumber != null && e != '+/-') {
        switch (operator) {
            case '+':
                answerNumber = parseFloat(answerNumber) + parseFloat(inputNumber);
                screen.innerText = answerNumber;
                break;
            case '-':
                answerNumber = parseFloat(answerNumber) - parseFloat(inputNumber);
                screen.innerText = answerNumber;
                break;
            case 'x':
                answerNumber = parseFloat(answerNumber) * parseFloat(inputNumber);
                screen.innerText = answerNumber;
                break;
            case '÷':
                answerNumber = parseFloat(answerNumber) / parseFloat(inputNumber);
                screen.innerText = answerNumber;
                break;
            case '%':
                answerNumber = parseFloat(answerNumber) / parseFloat(inputNumber);
                screen.innerText = answerNumber;
                break;
            default:
                screen.innerText = answerNumber
                break;
        }
    }
    newNumber = true
    inputNumber = null
    operator = e
}