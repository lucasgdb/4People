const txtResult = document.querySelector('#result')
const txtCPF = document.querySelector('#text')

const reverse = () => {
	if (txtCPF.value !== '') {
		const reversed = reverseText(txtCPF.value)

		txtResult.value = reversed
	} else {
		M.toast({
			html: 'Digite um texto válido.',
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

txtCPF.onkeyup = e => {
	if (e.which === 13) reverse()
}
