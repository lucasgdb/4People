M.FormSelect.init(document.querySelectorAll('select'))
const txtResult = document.querySelector('#result')
const txtCPF = document.querySelector('#cpf')
const lblFrom = document.querySelector('#from')

const validate = () => {
	const CPF = txtCPF.value.split('').filter(item => Number.isInteger(parseInt(item))).map(item => parseInt(item))

	if (txtCPF.value !== '' && CPF.length >= 11) {
		const isCPF = validateCPF(CPF)

		if (isCPF.isCPF) lblFrom.innerHTML = `<i class="material-icons left green-text">done</i>${isCPF.from}`
		else lblFrom.innerHTML = '<i class="material-icons left red-text">close</i>CPF Inválido.'

		txtResult.value = `${isCPF.CPF} é um CPF ${isCPF.isCPF ? 'Válido' : 'Inválido'}.`
	} else {
		M.toast({
			html: 'CPF inválido.',
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
	lblFrom.textContent = 'Aguardando...'
	txtResult.value = ''
}

txtCPF.onkeyup = e => {
	if (e.which === 13) validate()
}
