M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtFormulas = document.querySelectorAll('[name=formula]')
const lblFormula = document.querySelector('#formulasName')
const txtNumber = document.querySelector('#number')
const txtMeasure = document.querySelector('#measure')
const txtDecimal = document.querySelector('#decimal')

const names = ['Raio', 'Diâmetro']
txtFormulas.forEach((txtFormula, index) => {
	txtFormula.onclick = () => {
		lblFormula.textContent = `${names[index]}:`
		txtNumber.setAttribute('placeholder', `Digite aqui o ${names[index]}.`)
	}
})

const calculate = () => {
	if (txtNumber.value !== '') {
		let area
		if (txtFormulas[0].checked) {
			area = calculateCircleAreaRadius(parseFloat(txtNumber.value))
		} else {
			area = calculateCircleAreaDiameter(parseFloat(txtNumber.value))
		}

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

txtNumber.onkeyup = e => {
	if (e.which === 13) calculate()
}
