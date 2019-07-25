const txtResult = document.querySelector('#result')
const titleCount = document.querySelector('#titleCount')
const descCount = document.querySelector('#descCount')
const keywordCount = document.querySelector('#keywordCount')
const txtSiteName = document.querySelector('#siteName')
const txtTitle = document.querySelector('#title')
const txtAuthor = document.querySelector('#author')
const txtDescription = document.querySelector('#description')
const txtKeywords = document.querySelector('#keywords')
const txtCopyright = document.querySelector('#copyright')
const txtLanguages = document.querySelector('#languages')
const nupInitialScale = document.querySelector('#initialScale')
const nupMinimumScale = document.querySelector('#minimumScale')
const nupMaximumScale = document.querySelector('#maximumScale')
const rbScalable = document.querySelector('[name=scalable]')
const rbShrinkToFit = document.querySelector('[name=shrinkToFit]')
const txtGenerator = document.querySelector('#generator')
const ddRating = document.querySelector('#rating')

M.FormSelect.init(document.querySelectorAll('select'))

const generate = () => {
	const metas = generateMetaTags(
		txtSiteName.value,
		txtTitle.value,
		txtAuthor.value,
		txtDescription.value,
		txtKeywords.value,
		txtCopyright.value,
		txtLanguages.value,
		nupInitialScale.value,
		nupMinimumScale.value,
		nupMaximumScale.value,
		rbScalable.checked ? 'yes' : 'no',
		rbShrinkToFit.checked ? 'yes' : 'no',
		txtGenerator.value,
		ddRating.value
	)

	txtResult.value =
		`${metas.title}\n${metas.standards}\n${metas.contentLanguage}\n${metas.author}\n${metas.description}\n${metas.keywords}\n${metas.copyright}\n${metas.viewport}\n${metas.generator}\n${metas.rating}\n${metas.siteName}`
}

const countCharacters = (e, input) => {
	input.textContent = e.target.value.length
}

const savePassword = () => {
	if (txtResult.value.trim()) {
		saveAs(new File(
			[
				`<!DOCTYPE html>\n<html lang="pt-br">\n\n<head>\n${txtResult.value.split('\n').map(line => `\t${line}\n`).join('')}</head>\n\n<body>\n\n</body>\n\n</html>`
			], "index.html", { type: "text/html;charset=utf-8" }))
		M.toast({
			html: 'Meta Tags salvas com sucesso.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Não foi possível salvar as Meta Tags.',
			classes: 'red accent-4'
		})
	}
}

const copyResult = () => {
	if (txtResult.value !== '') {
		txtResult.select()
		document.execCommand('copy')

		M.toast({
			html: 'Copiado para a Área de Transferência.',
			classes: 'green'
		})
	} else {
		M.toast({
			html: 'Não foi possível copiar as Meta Tags.',
			classes: 'red accent-4'
		})
	}
}

const clearInput = () => {
	txtResult.value = ''
}
