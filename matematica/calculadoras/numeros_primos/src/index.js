const txtResult = document.querySelector('#result')
const txtNumbers = document.querySelector('#numbers')

function calculate() {
    const primeNumbers = isPrimeNumber(txtNumbers.value.split(',').map(number => parseInt(number)).filter(number => number > 1))
    txtResult.textContent = `Números primos: ${primeNumbers.length === 0 ? 'Nenhum' : primeNumbers.join(', ')}`
}