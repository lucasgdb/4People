const txtResult = document.querySelector('#result')
const txtNums = document.querySelector('#numbers')

const calculate = () => {
	const numbers = txtNums.value.split(',').join(' ').split(' ').map(number => parseInt(number.trim())).filter(number => number > 0 && number > 1)

	if (numbers.length !== 0) {
		const GCD = calculateGCD(numbers)
		txtResult.value = `${GCD.gcd} = ${GCD.result}`
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
			html: 'Não foi possível copiar o MDC.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.value = ''
}

txtNums.onkeyup = e => {
	if (e.which === 13) calculate()
}
