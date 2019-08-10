document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < paddingHeadersA.length; i++) {
		const path = paddingHeadersA[i].getAttribute('href').split('/').filter(link => link !== '')
		const pathName = location.pathname.split('/').filter(link => link !== '')
		if (path[path.length - 1] === pathName[pathName.length - 1]) {
			paddingHeadersA[i].classList.add('grey', 'lighten-4', 'black-text')
			paddingHeadersA[i].style.fontWeight = 'bold'
			paddingHeadersA[i].onclick = e => preventDefault(e)
			const icon = paddingHeadersA[i].querySelector('i')
			icon.innerHTML = 'radio_button_checked'
			icon.classList.add('indigo-text', 'text-darken-4')
			icon.style.fontSize = '20px'
			icon.style.marginLeft = '2.5px'

			header = paddingHeadersA[i].parentElement.parentElement.parentElement.parentElement.querySelector('.collapsible-header')
			if (header) header.click()

			return
		}
	}
})

const preventDefault = e => e.preventDefault()
