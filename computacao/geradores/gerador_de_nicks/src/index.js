M.FormSelect.init(document.querySelectorAll('select'))
const txtName = document.querySelector('#name')
const txtSelect = document.querySelector('select')
const cardBlock = document.querySelector('.row.card-blocks')

let blocks = false;
const generate = () => {
    if (txtName.value === '' || txtName.value === null && txtSelect.value === 1) {
        M.toast({
            html: 'Insira um nome primeiro!!',
            classes: 'red'
        })

    } else {
        cardBlock.innerHTML = ""
        for (let i = 0; i < 20; i++) {
            txtResult = document.createElement('div')
            txtResult.className = 'nick-card card	 col l4 s12  indigo hoverable white-text'
            iconResult = document.createElement('i')
            iconResult.className = 'material-icons right nick-icon'
            iconText = document.createTextNode('content_copy');
            textResult = document.createElement('p')
            let nicks = generateNicks(txtName.value, txtSelect.value)
            textP = document.createTextNode(nicks)
            iconResult.appendChild(iconText)
            textResult.appendChild(textP)
            textResult.appendChild(iconResult)
            txtResult.appendChild(textResult)
            cardBlock.appendChild(txtResult)
        }
    }
}
cardBlock.style.height = 'auto';
/*if (blocks === true) {
            for (let i = 0; i <= textP.lenght; i++) {
                let nicks
                nicks = generateNicks(txtName.value, txtSelect.value)
                textP[i].innerHTML = `${nicks}`
            }


				}*/