M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtFirst = document.querySelector('#txtFirst')
const txtSecond = document.querySelector('#txtSecond')
const ddFirst = document.querySelector('#ddFirst')
const ddSecond = document.querySelector('#ddSecond')
const txtDecimal = document.querySelector('#decimal')

const calculateFirst = () => {
	const temperature = calculateTemperature(ddFirst.value, ddSecond.value, parseFloat(txtFirst.value))
	txtSecond.value = Number.isInteger(temperature) || txtDecimal.value === '-1' ? temperature : temperature.toFixed(txtDecimal.value)
}

const calculateSecond = () => {
	const temperature = calculateTemperature(ddSecond.value, ddFirst.value, parseFloat(txtSecond.value))
	txtFirst.value = Number.isInteger(temperature) || txtDecimal.value === '-1' ? temperature : temperature.toFixed(txtDecimal.value)
}

const copyResult = txtComponent => {
	if (txtComponent.value !== '') {
		txtComponent.select()
		document.execCommand('copy')

		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Calcule a área primeiro.',
			classes: 'red accent-4'
		})
	}
}

txtFirst.oninput = ddFirst.onchange = txtDecimal.onchange = calculateFirst
txtSecond.oninput = ddSecond.onchange = calculateSecond
