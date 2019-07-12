// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('.collapsible'))

// Constants
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))
const navMobileA = document.querySelectorAll('#nav-mobile a')
const paddingHeadersA = document.querySelectorAll('.collapsible-body ul li a')
const mainCollButtons = document.querySelectorAll('#slide-out > li:not(:first-child) > .collapsible-header')
const secCollButtons = document.querySelectorAll('.padding-headers:not(.padding-buttons) > li > .collapsible-header')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const spinner = document.querySelector('#spinner')

// Methods
const animateIn = (delay = 250) => {
	document.body.style.transition = `padding-left ${delay}ms, opacity 150ms`
	document.body.style.paddingLeft = '300px'
}

const animateOut = (delay = 250) => {
	document.body.style.transition = `padding-left ${delay}ms`
	document.body.style.paddingLeft = '0'
}

const sideIn = () => {
	sidenav._animateSidenavIn()
	tr = false
	sidenav.isOpen = true
}

const sideOut = () => {
	sidenav._animateSidenavOut()
	tr = true
	sidenav.isClose = true
}

const updatePage = (e, link) => {
	e.preventDefault()
	nav.style.opacity = '0'
	main.style.opacity = '0'
	if (footer) footer.style.opacity = '0'

	if (innerWidth < 993) sidenav.close()
	else sidenav.el.style.opacity = '0'

	setTimeout(() => {
		location = link.includes('#') || link.includes('!') ? link.replace(/[#!]/g, '') : link
	}, 150)
}

// Left and right effects from sidebar
let tr = false

const sidenavEffect = () => {
	if (tr) {
		sidenav.options.outDuration = 150
		sideIn()
		animateIn()
		sessionStorage.removeItem('sideStatus')
	} else {
		sideOut()
		animateOut()
		sessionStorage.setItem('sideStatus', true)
	}
}

// Media Queries with pure JS
const maxWidth = window.matchMedia('(max-width: 992px)')
const minWidth = window.matchMedia('(min-width: 993px)')

const matchMax = maxWidth => {
	if (maxWidth.matches && !tr) animateOut()
	else if (maxWidth.matches && tr) sidenav.options.outDuration = 150
}

const matchMin = minWidth => {
	if (minWidth.matches) {
		setTimeout(() => {
			if (sessionStorage.getItem('sideStatus')) {
				animateOut(0)
				sideOut()
			} else animateIn(0)
		}, 0)
	}
}

// Pave events
document.addEventListener('DOMContentLoaded', () => {
	const allAElements = document.querySelectorAll('a[href^="."]')

	if (sessionStorage.getItem('sideStatus')) {
		sidenav.options.outDuration = 0
		sideOut()
		animateOut(0)
	}

	for (let i = 0; i < allAElements.length; i++) {
		allAElements[i].onclick = e => {
			const link = allAElements[i].getAttribute('href')
			updatePage(e, link)
		}
	}

	for (let i = 0; i < secCollButtons.length; i++) {
		secCollButtons[i].addEventListener('click', () => {
			const icon = secCollButtons[i].querySelector(':last-child')
			icon.style.transform =
				icon.style.transform === 'rotateZ(180deg)' ? 'rotateZ(0)' : 'rotateZ(180deg)'

			const containerButtons = secCollButtons[i].parentElement.parentElement.querySelectorAll('.collapsible > li > .collapsible-header')
			for (let j = 0; j < containerButtons.length; j++) {
				if (secCollButtons[i] !== containerButtons[j]) {
					const icon = containerButtons[j].querySelector(':last-child')
					icon.style.transform = 'rotateZ(0)'
				}
			}
		})
	}

	for (let i = 0; i < mainCollButtons.length; i++) {
		mainCollButtons[i].addEventListener('click', () => {
			const icon = mainCollButtons[i].querySelector(':last-child')
			icon.style.transform =
				icon.style.transform === 'rotateZ(180deg)' ? 'rotateZ(0)' : 'rotateZ(180deg)'

			for (let j = 0; j < mainCollButtons.length; j++) {
				if (mainCollButtons[i] !== mainCollButtons[j]) {
					const icon = mainCollButtons[j].querySelector(':last-child')
					icon.style.transform = 'rotateZ(0)'
				}
			}
		})
	}

	for (let i = 0; i < navMobileA.length; i++) {
		if (navMobileA[i].getAttribute('href').split('/').filter(link => link !== '' && link !== '.').join('') === '') {
			navMobileA[i].parentElement.classList.add('active')
			return
		}

		const path = navMobileA[i].getAttribute('href').split('/').filter(link => link !== '')
		const pathName = location.pathname.split('/').filter(link => link !== '')
		if (path[path.length - 1] === pathName[pathName.length - 1]) {
			navMobileA[i].parentElement.classList.add('active')
			return
		}
	}

	for (let i = 0; i < paddingHeadersA.length; i++) {
		const path = paddingHeadersA[i].getAttribute('href').split('/').filter(link => link !== '')
		const pathName = location.pathname.split('/').filter(link => link !== '')
		if (path[path.length - 1] === pathName[pathName.length - 1]) {
			paddingHeadersA[i].classList.add('grey', 'lighten-4', 'black-text')
			const icon = paddingHeadersA[i].querySelector('i')
			icon.innerHTML = 'radio_button_checked'
			icon.classList.add('indigo-text', 'text-darken-4')
			icon.style.fontSize = '20px'

			header = paddingHeadersA[i].parentElement.parentElement.parentElement.parentElement.querySelector('.collapsible-header')
			if (header) header.click()

			return
		}
	}
})

window.onload = () => {
	nav.style.opacity = '1'
	main.style.opacity = '1'
	if (footer) footer.style.opacity = '1'
	sidenav.el.style.opacity = '1'
	spinner.style.opacity = '0'
	maxWidth.addListener(matchMax)
	minWidth.addListener(matchMin)
	setTimeout(() => {
		spinner.remove()
	}, 200)
}

document.onkeydown = e => {
	if (e.keyCode === 116) updatePage(e, location.href)
}
