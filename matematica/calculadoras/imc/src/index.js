const txtResult = document.querySelector('#result')
const txtHeight = document.querySelector('#height')
const txtWeight = document.querySelector('#weight')
const sex = document.querySelector('[name=sex]')

function calculate() {
    if (txtHeight.value !== '' && txtWeight.value !== '') {
        const imcResult =
            calculateBMI(parseFloat(txtHeight.value), parseFloat(txtWeight.value), sex.checked ? 'M' : 'W')
        txtResult.value =
            `IMC: ${Number.isInteger(imcResult.bmi) ? imcResult.bmi.toFixed(1) : imcResult.bmi.toFixed(2)}! Resultado: ${imcResult.description}. Peso ideal: ${imcResult.idealWeight.toFixed(2)}kg`
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
            html: 'Calcule o IMC primeiro.',
            classes: 'red accent-4'
        })
    }
}