const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        clickedButton(e.currentTarget)
        setTimeout(clickedButton, 100, e.currentTarget);
    })

})

function clickedButton(button) {
    console.log(button)
    button.classList.toggle('clicked')
}