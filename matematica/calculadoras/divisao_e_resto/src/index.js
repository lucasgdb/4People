const txtResult = document.querySelector('#result')
const txtDividend = document.querySelector('#dividend')
const txtDivider = document.querySelector('#divider')

function calculate() {
    if (txtDividend.value !== '' && txtDivider.value !== '' && txtDivider.value !== '0') {
        const result = calculateDivision(parseFloat(txtDividend.value), parseFloat(txtDivider.value))
        txtResult.value =
            `Divisão: ${Number.isInteger(result.coeficient) ? result.coeficient : result.coeficient.toFixed(2)}, divisão inteira: ${result.integerCoeficient}, resto: ${result.rest}`
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
            html: 'Copiado para a Área de Transferência.',
            classes: 'green'
        })
    } else {
        M.toast({
            html: 'Calcule a equação primeiro.',
            classes: 'red accent-4'
        })
    }
}

txtDividend.onkeyup = function (e) {
    if (e.which === 13) {
        txtDivider.select()
    }
}

txtDivider.onkeyup = function (e) {
    if (e.which === 13) {
        calculate()
    }
}
