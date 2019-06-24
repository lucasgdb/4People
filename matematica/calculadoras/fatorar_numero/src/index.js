const txtResult = document.querySelector('#result')
const txtNum = document.querySelector('#number')

const factorize = () => {
	if (parseInt(txtNum.value) >= 1 && Number.isInteger(parseFloat(txtNum.value))) {
		const result = calculateFacorization(parseFloat(txtNum.value))
		txtResult.innerHTML =
			`${txtNum.value} = ${result.result.join(' x ')} => ${result.amount.map(item => `${item.number}${item.toThe === 1 ? '' : `<sup>${item.toThe}</sup>`}`).join(' x ')}`
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
