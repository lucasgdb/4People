const txtResult = document.querySelector('#result')
const txtNumbers = document.querySelector('#numbers')

const calculate = () => {
	if (txtNumbers.value !== '') {
		const primeNumbers = isPrimeNumber(txtNumbers.value.split(',').join(' ').split(' ').map(number => parseInt(number)).filter(number => number > 1))
		txtResult.textContent = `Números primos: ${primeNumbers.length === 0 ? 'Nenhum' : primeNumbers.join(', ')}`
	} else {
		M.toast({
			html: 'Valor não permitido.',
			classes: 'red accent-4'
		})
	}
}

const copyResult = () => {
	if (txtResult.value !== '') {
		txtResult.select()
		document.execCommand('copy')

		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Não foi possível copiar.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.value = ''
}

txtNumbers.onkeyup = e => {
	if (e.which === 13) {
		calculate()
	}
}
