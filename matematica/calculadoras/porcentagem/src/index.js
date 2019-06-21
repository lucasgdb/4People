const txtFirstResult = document.querySelector('#firstResult')
const txtSecondResult = document.querySelector('#secondResult')
const txtThirdResult = document.querySelector('#thirdResult')
const txtFourthResult = document.querySelector('#fourthResult')
const txtFifthResult = document.querySelector('#fifthResult')
const txtSixthResult = document.querySelector('#sixthResult')
const txtSeventhResult = document.querySelector('#seventhResult')
const txtEighthResult = document.querySelector('#eighthResult')
const txtNinethResult = document.querySelector('#ninethResult')
const txtFirstNumber = document.querySelector('#firstNumber')
const txtSecondNumber = document.querySelector('#secondNumber')
const txtThirdNumber = document.querySelector('#thirdNumber')
const txtFourthNumber = document.querySelector('#fourthNumber')
const txtFifthNumber = document.querySelector('#fifthNumber')
const txtSixthNumber = document.querySelector('#sixthNumber')
const txtSeventhNumber = document.querySelector('#seventhNumber')
const txtEighthNumber = document.querySelector('#eighthNumber')
const txtNinethNumber = document.querySelector('#ninethNumber')
const txtTenthNumber = document.querySelector('#tenthNumber')
const txtEleventhNumber = document.querySelector('#eleventhNumber')
const txtTwelfthNumber = document.querySelector('#twelfthNumber')
const txtThirteenthNumber = document.querySelector('#thirteenthNumber')
const txtFourteenthNumber = document.querySelector('#fourteenthNumber')
const txtFifteenthNumber = document.querySelector('#fifteenthNumber')
const txtSixteenthNumber = document.querySelector('#sixteenthNumber')
const txtSeventeenthNumber = document.querySelector('#seventeenthNumber')
const txtEighteenthNumber = document.querySelector('#eighteenthNumber')

function message() {
    M.toast({
        html: 'Valor não permitido!',
        classes: 'red accent-4'
    })
}

function calculateFirst() {
    if (txtFirstNumber.value !== '' && txtSecondNumber.value !== '') {
        txtFirstResult.value = firstOperation(parseFloat(txtFirstNumber.value), parseFloat(txtSecondNumber.value)).toFixed(2)
    } else {
        message()
    }
}

function calculateSecond() {
    if (txtThirdNumber.value !== '' && txtFourthNumber.value !== '' && txtFourthNumber.value !== '0') {
        txtSecondResult.value = `${secondOperation(parseFloat(txtThirdNumber.value), parseFloat(txtFourthNumber.value)).toFixed(2)}%`
    } else {
        message()
    }
}

function calculateThird() {
    if (txtFifthNumber.value !== '' && txtSixthNumber.value !== '' && txtFifthNumber.value !== '0') {
        txtThirdResult.value = `${thirdOperation(parseFloat(txtFifthNumber.value), parseFloat(txtSixthNumber.value)).toFixed(2)}%`
    } else {
        message()
    }
}

function calculateFourth() {
    if (txtSeventhNumber.value !== '' && txtEighthNumber.value !== '' && txtEighthNumber.value !== '0') {
        txtFourthResult.value = `${fourthOperation(parseFloat(txtSeventhNumber.value), parseFloat(txtEighthNumber.value)).toFixed(2)}%`
    } else {
        message()
    }
}

function calculateFifth() {
    if (txtNinethNumber.value !== '' && txtTenthNumber.value !== '' && txtTenthNumber.value !== '0') {
        txtFifthResult.value = `${fifthOperation(parseFloat(txtNinethNumber.value), parseFloat(txtTenthNumber.value)).toFixed(2)}%`
    } else {
        message()
    }
}

function calculateSixth() {
    if (txtEleventhNumber.value !== '' && txtTwelfthNumber.value !== '') {
        txtSixthResult.value = sixthOperation(parseFloat(txtEleventhNumber.value), parseFloat(txtTwelfthNumber.value)).toFixed(2)
    } else {
        message()
    }
}

function calculateSeventh() {
    if (txtThirteenthNumber.value !== '' && txtFourteenthNumber.value !== '') {
        txtSeventhResult.value = seventhOperation(parseFloat(txtThirteenthNumber.value), parseFloat(txtFourteenthNumber.value)).toFixed(2)
    } else {
        message()
    }
}

function calculateEighth() {
    if (txtFifteenthNumber.value !== '' && txtSixteenthNumber.value !== '') {
        txtEighthResult.value = eighthOperation(parseFloat(txtFifteenthNumber.value), parseFloat(txtSixteenthNumber.value)).toFixed(2)
    } else {
        message()
    }
}

function calculateNineth() {
    if (txtSeventeenthNumber.value !== '' && txtEighteenthNumber.value !== '') {
        txtNinethResult.value = ninethOperation(parseFloat(txtSeventeenthNumber.value), parseFloat(txtEighteenthNumber.value)).toFixed(2)
    } else {
        message()
    }
}

function copyResult(result) {
    if (result.value !== '') {
        result.select()
        document.execCommand('copy')

        M.toast({
            html: 'Copiado para a Área de Transferência.',
            classes: 'green'
        })
    } else {
        M.toast({
            html: 'Calcule o resultado primeiro.',
            classes: 'red accent-4'
        })
    }
}
