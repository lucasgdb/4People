const txtResult = document.querySelector('#result')
const txtNum = document.querySelector('#number')
const btnSave = document.querySelector('#save')

const factorize = () => {
	if (parseInt(txtNum.value) >= 1 && Number.isInteger(parseFloat(txtNum.value))) {
		const result = calculateFacorization(parseFloat(txtNum.value))

		btnSave.setAttribute('data-clipboard-text', `${txtNum.value} = ${result.result.join(' x ')} => ${result.amount.map(item => `${item.number}${item.toThe === 1 ? '' : `^${item.toThe}`}`).join(' x ')}`)
		txtResult.innerHTML = `${txtNum.value} = ${result.result.join(' x ')} => ${result.amount.map(item => `${item.number}${item.toThe === 1 ? '' : `<sup>${item.toThe}</sup>`}`).join(' x ')}`
	} else {
		M.toast({
			html: 'Valor não permitido.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.innerHTML = ''
}

txtNum.onkeyup = e => {
	if (e.which === 13) factorize()
}

document.addEventListener('DOMContentLoaded', () => {
	new ClipboardJS(btnSave).on('success', () => {
		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	})
})
