const txtResult = document.querySelector('#result')
const txtHeight = document.querySelector('#height')
const txtWeight = document.querySelector('#weight')

function calculate() {
    if (txtHeight.value !== '' && txtWeight.value !== '') {
        const imcResult = calculateBMI(parseFloat(txtHeight.value), parseFloat(txtWeight.value))
        txtResult.value = `IMC: ${imcResult.bmi.toFixed(2)} Descrição: ${imcResult.description}`
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
            html: 'Calcule o IMC primeiro!',
            classes: 'red accent-4'
        })
    }
}