const txtResult = document.querySelector('#result')
const txtNum = document.querySelector('#number')
const type = document.querySelector('[name=type]')

const calculate = () => {
	if (txtNum.value !== '' && Number.isInteger(parseFloat(txtNum.value))) {
		txtResult.value = calculateFibonacci(BigInt(txtNum.value), !type.checked)
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

txtNum.onkeyup = e => {
	if (e.which === 13) calculate()
}
