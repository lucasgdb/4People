M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtFormulas = document.querySelectorAll('[name=formula]')
const lblFormula = document.querySelector('#formulasName')
const txtNumber = document.querySelector('#number')
const txtMedida = document.querySelector('#medida')
const txtDecimal = document.querySelector('#decimal')

const names = ['Raio', 'Diâmetro']
txtFormulas.forEach((txtFormula, index) => {
    txtFormula.onclick = function () {
        lblFormula.textContent = names[index]
    }
})

function calculate() {
    if (txtNumber.value !== '') {
        let area
        if (txtFormulas[0].checked) {
            area = calculateCircleAreaRadius(parseFloat(txtNumber.value))
        } else {
            area = calculateCircleAreaDiameter(parseFloat(txtNumber.value))
        }

        txtResult.value = `${txtDecimal.value === '-1' ? area : area.toFixed(parseInt(txtDecimal.value), 10)}${txtMedida.value}²`
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

txtNumber.onkeyup = function (e) {
    if (e.which === 13) {
        calculate()
    }
}