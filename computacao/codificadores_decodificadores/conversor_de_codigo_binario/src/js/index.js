const txtText = document.querySelector('#text')
const txtBinaryCode = document.querySelector('#binary')

function convertToBinary() {
    txtBinaryCode.value = textToBinary(txtText.value)
}

function convertToText() {
    txtText.value = binaryToText(txtBinaryCode.value)
}