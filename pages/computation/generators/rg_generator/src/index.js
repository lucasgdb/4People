M.FormSelect.init(document.querySelectorAll('select'))
M.Modal.init(document.querySelectorAll('.modal'), {
	dismissible: false
})

const txtResult = document.querySelector('#result')
const rbPonctuation = document.querySelector('[name=punctuation]')
const agreeModal = M.Modal.getInstance(document.querySelector('#agreeModal'));

const generate = () => {
	const RG = generateRG(rbPonctuation.checked)
	txtResult.value = RG
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
