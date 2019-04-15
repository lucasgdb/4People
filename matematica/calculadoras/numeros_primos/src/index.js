const txtResult = document.querySelector('#result')
const txtNumbers = document.querySelector('#numbers')

function calculate() {
    if (txtNumbers.value !== '') {
        const primeNumbers = isPrimeNumber(txtNumbers.value.split(',').map(number => parseInt(number)).filter(number => number > 1))
        txtResult.textContent = `Números primos: ${primeNumbers.length === 0 ? 'Nenhum' : primeNumbers.join(', ')}`
    } else {
        M.toast({
            html: 'Valor não permitido!',
            classes: 'red accent-4'
        })
    }
}