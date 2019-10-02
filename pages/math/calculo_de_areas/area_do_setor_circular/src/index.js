M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtRadius = document.querySelector('#radius')
const txtAngle = document.querySelector('#angle')
const txtMeasure = document.querySelector('#measure')
const txtDecimal = document.querySelector('#decimal')

const calculate = () => {
	if (txtMeasure.value !== '') {
		const area = calculateCircularSectorArea(parseFloat(txtRadius.value), parseFloat(txtAngle.value))
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

txtRadius.onkeyup = e => {
	if (e.which === 13) txtAngle.focus()
}

txtAngle.onkeyup = e => {
	if (e.which === 13) calculate()
}
