// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('.collapsible'))

// Constants
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))
const navMobileA = document.querySelectorAll('#nav-mobile a')
const mainCollButtons = document.querySelectorAll('#slide-out > li:not(:first-child) > .collapsible-header')
const secCollButtons = document.querySelectorAll('.padding-headers:not(.padding-buttons) > li > .collapsible-header')
const body = document.body
const container = document.querySelector('.container')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const spinner = document.querySelector('#spinner')

// Methods
const animateIn = (delay = 250) => {
	body.style.transition = `padding-left ${delay}ms, opacity 150ms`
	body.style.paddingLeft = '300px'
	container.style.transition = `width ${delay}ms`
	container.style.width = '92.5%'
}

const animateOut = (delay = 250) => {
	body.style.transition = `padding-left ${delay}ms`
	body.style.paddingLeft = '0'
	container.style.transition = `width ${delay}ms`
	container.style.width = '80%'
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
	if (sessionStorage.getItem('sideStatus')) {
		sidenav.options.outDuration = 0
		sideOut()
		animateOut(0)
	}

	for (let i = 0; i < secCollButtons.length; i++) {
		secCollButtons[i].addEventListener('click', () => {
			const icon = secCollButtons[i].querySelector(':last-child')
			icon.style.transform =
				icon.style.transform === 'rotateZ(-180deg)' ? 'rotateZ(0)' : 'rotateZ(-180deg)'

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
				icon.style.transform === 'rotateZ(-180deg)' ? 'rotateZ(0)' : 'rotateZ(-180deg)'

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
			break
		}

		const path = navMobileA[i].getAttribute('href').split('/').filter(link => link !== '')
		const pathName = location.pathname.split('/').filter(link => link !== '')
		if (path[path.length - 1] === pathName[pathName.length - 1]) {
			navMobileA[i].parentElement.classList.add('active')
			break
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
