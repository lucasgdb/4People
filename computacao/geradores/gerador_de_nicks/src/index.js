M.FormSelect.init(document.querySelectorAll('select'))
const txtName = document.querySelector('#name')
const txtSelect = document.querySelector('#selectNick')
const cardBlock = document.querySelector('.row.card-blocks')
const icon = document.querySelector('.nick-icon')
const resultNick = document.querySelector('.nick-card p')
const nickOption = document.querySelector('span')
const txtInput = document.querySelector('.text-input')
const txtblockNumber = document.querySelector('#blockNumber')

const generate = () => {
    if (txtName.value === '') {
        M.toast({
            html: 'Insira um nome primeiro!!',
            classes: 'red'
        })
    } else {
        cardBlock.innerHTML = ""
        cardNumber = 20;
        if (txtSelect.value === '2' || txtSelect.value === '3') {
            cardNumber = txtblockNumber.value;
        }
        for (let i = 0; i < cardNumber; i++) {
            txtResult = document.createElement('div')
            txtResult.className = 'nick-card card col l4 s12 m3  indigo hoverable white-text'
            iconResult = document.createElement('i')
            iconResult.className = 'material-icons right nick-icon'
            iconText = document.createTextNode('content_copy');
            textResult = document.createElement('p')
            textResult.setAttribute('id', 'nameNick')
            let nicks = generateNicks(txtName.value, txtSelect.value)
            textP = document.createTextNode(nicks)
            iconResult.setAttribute('data-clipboard-text', `${nicks}`)
            iconResult.appendChild(iconText)
            textResult.appendChild(textP)
            textResult.appendChild(iconResult)
            txtResult.appendChild(textResult)
            cardBlock.appendChild(txtResult)
            let clipboard = new ClipboardJS(iconResult);
            clipboard.on('success', function(e) {
                M.toast({
                    html: 'Copiado para area de tranferência!!',
                    classes: 'green'
                })
            });
            clipboard.on('error', function(e) {
                M.toast({
                    html: 'Ocorreu um erro inesperado!!',
                    classes: 'red'
                })
            });
        }
        cardBlock.style.height = 'auto';
    }
}
txtSelect.onchange = () => {
    if (txtSelect.value === '2') {
        txtName.className = 'hide'
        txtName.innerHTML = ''
        txtInput.className = 'hide'
        txtblockNumber.className = ''
    } else if (txtSelect.value === '3') {
        txtName.className = 'hide'
        txtName.innerHTML = ''
        txtInput.className = 'hide'
        txtblockNumber.className = ''
    } else {
        txtName.className = ''
        txtInput.className = ''
        txtblockNumber.className = 'hide'
    }
}