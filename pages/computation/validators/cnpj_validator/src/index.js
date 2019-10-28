M.FormSelect.init(document.querySelectorAll('select'))
const txtResult = document.querySelector('#result')
const txtCNPJ = document.querySelector('#cnpj')

const validate = () => {
	const CNPJ = txtCNPJ.value.split('').filter(item => Number.isInteger(parseInt(item))).map(item => parseInt(item))

	if (txtCNPJ.value !== '' && CNPJ.length >= 14) {
		const isCNPJ = validateCNPJ(CNPJ)

		txtResult.value = `${isCNPJ.CNPJ} é um CNPJ ${isCNPJ.isCNPJ ? 'Válido' : 'Inválido'}.`
	} else {
		M.toast({
			html: 'CNPJ inválido.',
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

txtCNPJ.onkeyup = e => {
	if (e.which === 13) validate()
}
