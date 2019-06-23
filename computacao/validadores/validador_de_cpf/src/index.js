M.FormSelect.init(document.querySelectorAll('select'))
const txtResult = document.querySelector('#result')
const txtCPF = document.querySelector('#cpf')
const lblFrom = document.querySelector('#from')

function validate() {
	const CPF = txtCPF.value.split('').filter(item => Number.isInteger(parseInt(item))).map(item => parseInt(item))

	if (txtCPF.value !== '' && CPF.length >= 11) {
		const isCPF = validateCPF(CPF)

		if (isCPF.isCPF) lblFrom.textContent = isCPF.from
		else lblFrom.textContent = 'Aguardando...'

		txtResult.value = `${isCPF.CPF} é um CPF ${isCPF.isCPF ? 'válido' : 'inválido'}.`
	} else {
		M.toast({
			html: 'CPF inválido.',
			classes: 'red accent-4'
		})
	}
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
			html: 'Valide seu CPF primeiro.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	lblFrom.textContent = 'Aguardando...'
	txtResult.value = ''
}

txtCPF.onkeyup = function (e) {
	if (e.which === 13) {
		validate()
	}
}
