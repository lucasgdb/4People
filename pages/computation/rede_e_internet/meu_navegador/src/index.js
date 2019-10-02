const lblBrowser = document.querySelector('#browser')
const lblLanguage = document.querySelector('#language')

document.addEventListener('DOMContentLoaded', () => {
	const information = myWebBrowser()
	lblBrowser.textContent = information.browser
	lblLanguage.textContent = information.language
})
