M.FormSelect.init(document.querySelectorAll('select'))

const lblBlockAmount = document.querySelector('#blocksAmount')
const txtSelectName = document.querySelector('#selectNames')
const txtSelectSex = document.querySelector('#selectSex')
const cardContainer = document.querySelector('#card-container')

const generate = () => {
	const cardNumber = lblBlockAmount.value
	let html = ''

	for (let i = 0; i < (cardNumber <= 0 ? 20 : cardNumber); i += 1) {
		const nick = generateNames(txtSelectName.value, txtSelectSex.value)

		html += (
			`<div class="col s12 l6">
				<div class="card mb-0 dark-grey white-text z-depth-1 center-align hoverable">
					<p>
						${nick}<i title="Copiar" data-clipboard-text="${nick}" class="material-icons right">content_copy</i>
					</p>
				</div>
			</div>`
		)
	}

	cardContainer.innerHTML = html

	const clipboard = new ClipboardJS(document.querySelectorAll('.card i'))
	clipboard.on('success', () => {
		M.toast({
			html: 'Copiado para Área de Tranferência.',
			classes: 'green'
		})
	})
}

generate()
