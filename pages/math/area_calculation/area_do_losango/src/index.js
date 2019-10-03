M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtDiagonal1 = document.querySelector('#diagonal1')
const txtDiagonal2 = document.querySelector('#diagonal2')
const txtMeasure = document.querySelector('#measure')
const txtDecimal = document.querySelector('#decimal')

const calculate = () => {
	if (txtMeasure.value !== '') {
		const area = calculateDiamondArea(parseFloat(txtDiagonal1.value), parseFloat(txtDiagonal2.value))
		txtResult.value = `${txtDecimal.value === '-1' ? area : area.toFixed(parseInt(txtDecimal.value), 10)}${txtMeasure.value}²`
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

txtDiagonal1.onkeyup = e => {
	if (e.which === 13) txtDiagonal2.focus()
}

txtDiagonal2.onkeyup = e => {
	if (e.which === 13) calculate()
}
