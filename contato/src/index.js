M.FormSelect.init(document.querySelectorAll('select'))
const form = document.querySelector('form')
const inputs = form.querySelectorAll('input')
const message = form.querySelector('textarea')

form.onsubmit = async e => {
	e.preventDefault()

	const data = await (await fetch('src/send_message.php', {
		method: 'POST',
		body: new FormData(form)
	})).json()

	if (data.result === '1') {
		M.toast({
			html: "Mensagem enviada com sucesso! Aguarde retorno.",
			classes: "green"
		})

		for (let i = 0; i < inputs.length - 1; i += 1) {
			inputs[i].value = ''
			inputs[i].classList.remove('valid')
		}

		message.value = ''
	} else {
		M.toast({
			html: "Não foi possível enviar a mensagem.",
			classes: "red accent-4"
		})
	}
}
