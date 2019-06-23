const txtText = document.querySelector('#text')
const txtBinaryCode = document.querySelector('#binary')

const convertToBinary = () => {
	if (txtText.value !== '') txtBinaryCode.value = textToBinary(txtText.value)
}

const convertToText = () => {
	if (txtBinaryCode.value !== '') txtText.value = binaryToText(txtBinaryCode.value)
}

const copyResult = txt => {
	if (txt.value !== '') {
		txt.select()
		document.execCommand('copy')

		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Converta-o primeiro.',
			classes: 'red accent-4'
		})
	}
}
