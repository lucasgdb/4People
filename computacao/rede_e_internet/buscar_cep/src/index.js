const txtResult = document.querySelector('#result')
const txtCEP = document.querySelector('#cep')

const search = async () => {
	txtResult.value = await cep(txtCEP.value)
		.then(data =>
			`CEP: ${data.cep}\nEstado: ${data.state}\nCidade: ${data.city}${data.street ? `\nRua: ${data.street}` : ''}${data.neighborhood ? `\nBairro: ${data.neighborhood}` : ''}`
		)
		.catch(err => err.message)
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

const saveCEP = () => {
	if (txtResult.value.trim() !== '') {
		saveAs(new File([txtResult.value], "CEP.txt", { type: "text/plain;charset=utf-8" }))
		M.toast({
			html: 'Resultado salvo com sucesso.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Não foi possível salvar o resultado.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.value = ''
}

txtCEP.onkeyup = e => {
	if (e.which === 13) search()
}
