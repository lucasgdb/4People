M.FormSelect.init(document.querySelectorAll('select'))

const result = document.querySelector('#result')
const formulas = document.querySelectorAll('[name=formula]')
const formulaName = document.querySelector('#formulaName')
const raio = document.querySelector('#raio')
const medida = document.querySelector('#medida')
const decimal = document.querySelector('#decimal')

const formulasNames = ['Raio', 'Diâmetro']
formulas.forEach((formula, index) => {
    formula.onclick = function () {
        formulaName.textContent = formulasNames[index]
    }
})

function calculateArea() {
    if (raio.value !== '') {
        let area
        if (formulas[0].checked) {
            area = Math.PI.toFixed(48) * Math.pow(parseFloat(raio.value, 10), 2)
        } else {
            area = (Math.PI.toFixed(48) * (2 * Math.pow(parseFloat(raio.value), 2))) / 4
        }

        result.innerText = `Área: ${decimal.value === '-1' ? area : area.toFixed(parseInt(decimal.value), 10)}${medida.value}²`
    } else {
        M.toast({
            html: 'Valor não permitido!',
            classes: 'red accent-4'
        })
    }
}