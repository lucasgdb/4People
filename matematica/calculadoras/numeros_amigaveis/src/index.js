const txtResult = document.querySelector('#result')
const txtNumber1 = document.querySelector('#number1')
const txtNumber2 = document.querySelector('#number2')

function calculate() {
    if (txtNumber1.value !== '' && txtNumber2.value !== '') {
        const primeNumbers = areFriendlyNumber(parseInt(txtNumber1.value, 10), parseInt(txtNumber2.value, 10))
        txtResult.textContent = `${txtNumber1.value} e ${txtNumber2.value} ${primeNumbers ? 'são números amigáveis!' : 'não são números amigáveis!'}`
    } else {
        M.toast({
            html: 'Valor não permitido!',
            classes: 'red accent-4'
        })
    }
}