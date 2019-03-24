const txtResult = document.querySelector('#result')
const txtNum = document.querySelector('#number')

function factorize() {
    if (parseInt(txtNum.value) >= 1 && Number.isInteger(parseFloat(txtNum.value))) {
        const result = calculateFacorization(parseFloat(txtNum.value))
        txtResult.value =
            `${txtNum.value} = ${result.result.join(' * ')} => ${result.amount.map(item => `${item.number}${item.toThe === 1 ? '' : `^${item.toThe}`}`).join(' * ')}`
    } else {
        M.toast({
            html: 'Valor não permitido!',
            classes: 'red accent-4'
        })
    }
}

function copyResult() {
    if (txtResult.value !== '') {
        txtResult.select()
        document.execCommand('copy')

        M.toast({
            html: 'Copiado!',
            classes: 'green'
        })
    } else {
        M.toast({
            html: 'Fatore o número primeiro.',
            classes: 'red accent-4'
        })
    }
}