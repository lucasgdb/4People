M.FormSelect.init(document.querySelectorAll('select'))

const result = document.querySelector('#result')
const formula = document.querySelector('[name=formula]')
const raio = document.querySelector('#raio')
const medida = document.querySelector('#medida')
const decimal = document.querySelector('#decimal')

function calculateArea() {
    if (raio.value !== '') {
        let area
        if (formula.checked) {
            area = Math.PI * Math.pow(parseInt(raio.value, 10), 2)
        } else {
            area = (Math.PI * (2 * Math.pow(parseInt(raio.value), 2))) / 4
        }

        result.innerText = `Área: ${decimal.value === '-1' ? area : area.toFixed(parseInt(decimal.value), 10)}${medida.value}²`
    }
}