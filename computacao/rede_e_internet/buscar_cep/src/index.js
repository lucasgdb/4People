const txtResult = document.querySelector('#result')
const txtCEP = document.querySelector('#cep')

async function search() {
	txtResult.value = await cep(txtCEP.value)
		.then(data =>
			`CEP: ${data.cep}\nEstado: ${data.state}\nCidade: ${data.city}\nRua: ${data.street}\nBairro: ${data.neighborhood}`
		)
		.catch(err => err.message)
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
			html: 'Busque seu CEP primeiro.',
			classes: 'red accent-4'
		})
	}
}

txtCEP.onkeyup = function (e) {
	if (e.which === 13) {
		search()
	}
}
