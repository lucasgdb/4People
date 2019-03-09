const txtResult = document.querySelector('#result')
const txtNums = document.querySelector('#numbers')

function calculate() {
    const numbers = txtNums.value.split(',').join(' ').split(' ').map(number => parseInt(number.trim())).filter(number => number > 0 && number > 1)

    if (numbers.length !== 0) {
        const LCM = calculateLCM(numbers)
        txtResult.value = `${LCM.lcm} = ${LCM.result}`
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
            html: 'Ache o MMC primeiro.',
            classes: 'red accent-4'
        })
    }
}