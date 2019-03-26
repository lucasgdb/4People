M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtSide = document.querySelector('#side')
const txtMeasure = document.querySelector('#measure')
const txtDecimal = document.querySelector('#decimal')

function calculate() {
    if (txtMeasure.value !== '') {
        const area = calculateSquareArea(parseFloat(txtSide.value))
        txtResult.value = `${txtDecimal.value === '-1' ? area : area.toFixed(parseInt(txtDecimal.value), 10)}${txtMeasure.value}²`
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
            html: 'Calcule a área primeiro.',
            classes: 'red accent-4'
        })
    }
}

txtSide.onkeyup = function (e) {
    if (e.which === 13) {
        calculate()
    }
}