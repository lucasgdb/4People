M.FormSelect.init(document.querySelectorAll('select'))
const txtResult = document.querySelector('#result')
const rbPonctuation = document.querySelector('[name=punctuation]')
const ddState = document.querySelector('select')

function generate() {
	const CPF = generateCPF(rbPonctuation.checked, ddState.value)
	txtResult.value = CPF
}

function copyResult() {
	if (txtResult.value !== '') {
		txtResult.select()
		document.execCommand('copy')

		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Gere seu CPF primeiro.',
			classes: 'red accent-4'
		})
	}
}
