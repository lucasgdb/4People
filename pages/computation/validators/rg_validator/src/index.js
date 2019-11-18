M.FormSelect.init(document.querySelectorAll('select'))
const txtResult = document.querySelector('#result')
const txtRG = document.querySelector('#rg')

const validate = () => {
	const RG = txtRG.value.split('').filter(item => Number.isInteger(parseInt(item)) || item === 'X' || item === 'x')

	if (txtRG.value !== '' && RG.length >= 9) {
		const isRG = validateRG(RG)

		txtResult.value = `${isRG.RG} é um RG ${isRG.isRG ? 'Válido' : 'Inválido'}.`
	} else {
		M.toast({
			html: 'RG inválido.',
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

txtRG.onkeyup = e => {
	if (e.which === 13) validate()
}
