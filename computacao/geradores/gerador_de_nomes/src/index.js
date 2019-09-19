M.FormSelect.init(document.querySelectorAll('select'))
lblBlockAmount = document.querySelector('#blocksAmount')
txtSelectName = document.querySelector('#selectNames')
txtSelectSex = document.querySelector('#selectSex')
cardContainer = document.querySelector('#card-container')

const generate = () => {
    let cardNumber = lblBlockAmount.value,
        html = ''
    for (let i = 0; i < (cardNumber <= 0 ? 20 : cardNumber); i += 1) {
        const nick = generateNames(txtSelectName.value, txtSelectSex.value)
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
            html: 'Ocorreu um erro inesperado!.',
            classes: 'red accent-4'
        })
    })
}