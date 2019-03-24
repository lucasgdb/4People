const txtText = document.querySelector('#text')
const txtBinaryCode = document.querySelector('#binary')

function convertToBinary() {
    if (txtText.value !== '') {
        txtBinaryCode.value = textToBinary(txtText.value)
    }
}

function convertToText() {
    if (txtBinaryCode.value !== '') {
        txtText.value = binaryToText(txtBinaryCode.value)
    }
}

function copyResult(txt) {
    if (txt.value !== '') {
        txt.select()
        document.execCommand('copy')

        M.toast({
            html: 'Copiado!',
            classes: 'green'
        })
    } else {
        M.toast({
            html: 'Converta-o primeiro.',
            classes: 'red accent-4'
        })
    }
}