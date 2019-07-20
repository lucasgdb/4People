M.FormSelect.init(document.querySelectorAll('select'))
const txtSelect = document.querySelector('#selectNick')
const cardContainer = document.querySelector('#card-container')
//const txtName = document.querySelector('#name')

const lblTypeName = document.querySelector('#typeName')
const lblBlockAmount = document.querySelector('#blocksAmount')

const generate = () => {
    if ((txtSelect.value === '1' || txtSelect.value === '4' || txtSelect.value === '5') && txtName.value === '') {
        M.toast({
            html: 'Digite seu nome!.',
            classes: 'red accent-4'
        })
    } else {
        cardContainer.innerHTML = ''
        let cardNumber = lblBlockAmount.value,
            html = ''

        for (let i = 0; i < (cardNumber <= 0 ? 20 : cardNumber); i++) {
            const nick = generateNicks(txtName.value, txtSelect.value)
            html +=
                `<div class="col s12 l6">
					<div class="card mb-0 indigo white-text z-depth-1 center-align hoverable">
						<p>
							${nick}
							<i title="Copiar" data-clipboard-text="${nick}" class="material-icons right">content_copy</i>
						</p>
					</div>
				</div>`
        }

        cardContainer.innerHTML = html
        const clipboard = new ClipboardJS(document.querySelectorAll('.card i'))
        clipboard.on('success', () => {
            M.toast({
                html: 'Copiado para Área de Tranferência.',
                classes: 'green'
            })
        })

        clipboard.on('error', () => {
            M.toast({
                html: 'Ocorreu um erro inesperado.',
                classes: 'red accent-4'
            })
        })
    }
}

txtSelect.onchange = () => {
    if (txtSelect.value === '2') {
        txtName.classList.add('hide')
        lblTypeName.classList.add('hide')
        lblBlockAmount.classList.remove('hide')
    } else if (txtSelect.value === '3') {
        txtName.classList.add('hide')
        lblTypeName.classList.add('hide')
        lblBlockAmount.classList.remove('hide')
    } else {
        lblBlockAmount.classList.add('hide')
        txtName.classList.remove('hide')
        lblTypeName.classList.remove('hide')
    }
}