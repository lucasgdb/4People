M.FormSelect.init(document.querySelectorAll('select'))

const result = document.querySelector('#result')
const formulas = document.querySelectorAll('[name=formula]')
const formulasName = document.querySelector('#formulasName')
const radius = document.querySelector('#radius')
const medida = document.querySelector('#medida')
const decimal = document.querySelector('#decimal')

const names = ['Raio', 'Diâmetro']
formulas.forEach((formula, index) => {
    formula.onclick = function () {
        formulasName.textContent = names[index]
    }
})

function calculate() {
    if (radius.value !== '') {
        let area
        if (formulas[0].checked) {
            area = calculateCircleArea(radius.value)
        } else {
            area = calculateCircleArea(radius.value, 1)
        }

        result.value = `${decimal.value === '-1' ? area : area.toFixed(parseInt(decimal.value), 10)}${medida.value}²`
    } else {
        M.toast({
            html: 'Valor não permitido!',
            classes: 'red accent-4'
        })
    }
}

function copyResult() {
    if (result.value !== '') {
        result.select()
        document.execCommand('copy')

        M.toast({
            html: 'Copiado!',
            classes: 'green'
        })
    } else {
        M.toast({
            html: 'Calcule a área primeiro!',
            classes: 'red accent-4'
        })
    }
}