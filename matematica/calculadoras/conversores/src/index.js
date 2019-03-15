M.FormSelect.init(document.querySelectorAll('select'))

const txtResult = document.querySelector('#result')
const txtFirst = document.querySelector('#txtFirst')
const txtSecond = document.querySelector('#txtSecond')
const ddConvertType = document.querySelector('#ddConvertType')
const ddFirst = document.querySelector('#ddFirst')
const ddSecond = document.querySelector('#ddSecond')

function copyResult(txtComponent) {
    if (txtComponent.value !== '') {
        txtComponent.select()
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

function calculateFirst() {
    const temperature = calculateTemperature(ddFirst.value, ddSecond.value, parseFloat(txtFirst.value))
    txtSecond.value = Number.isInteger(temperature) ? temperature : temperature.toFixed()
}

function calculateSecond() {
    const temperature = calculateTemperature(ddSecond.value, ddFirst.value, parseFloat(txtSecond.value)).toFixed(2)
    txtFirst.value = Number.isInteger(temperature) ? temperature : temperature.toFixed()
}

txtFirst.oninput = calculateFirst
txtSecond.oninput = calculateSecond
ddFirst.onchange = calculateFirst
ddSecond.onchange = calculateSecond