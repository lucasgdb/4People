M.FormSelect.init(document.querySelectorAll('select'))
M.Modal.init(document.querySelectorAll('.modal'), {
	dismissible: false
})

const txtResult = document.querySelector('#result')
const rbPonctuation = document.querySelector('[name=punctuation]')
const ddState = document.querySelector('select')
const agreeModal = M.Modal.getInstance(document.querySelector('#agreeModal'));

const generate = () => {
	const CPF = generateCPF(rbPonctuation.checked, ddState.value)
	txtResult.value = CPF
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
			html: 'Não foi possível copiar o CPF.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.value = ''
}

window.addEventListener('load', () => {
	agreeModal.open()
})
