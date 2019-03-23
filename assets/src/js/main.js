// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('.sidenav.collapsible'), {
  accordion: false
})
M.Collapsible.init(document.querySelectorAll('.padding-headers.collapsible'))

// Constants
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))

// Left and right effects from sidebar
let tr = false

if (sessionStorage.getItem('sideStatus') === 'true') {
  sidenav.options.outDuration = 0
  sideOut()
  animateOut(0)
}

function animateIn(delay = 250) {
  document.body.style.transition = `padding-left ${delay}ms`
  document.body.style.paddingLeft = '300px'
}

function animateOut(delay = 125) {
  document.body.style.transition = `padding-left ${delay}ms`
  document.body.style.paddingLeft = '0'
}

function sideIn() {
  sidenav._animateSidenavIn()
  tr = false
  sidenav.isOpen = true
}

function sideOut() {
  sidenav._animateSidenavOut()
  tr = true
  sidenav.isClose = true
}

document.querySelector('#menu').onclick = function () {
  if (innerWidth >= 993) {
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
  } else if (sidenav.options.outDuration === 0)
    sidenav.options.outDuration = 200
}

// Media Queries with pure JS
const maxWidth = window.matchMedia('(max-width: 992px)')
const minWidth = window.matchMedia('(min-width: 993px)')

function matchMax(maxWidth) {
  if (maxWidth.matches && !tr)
    animateOut()
  else if (maxWidth.matches && tr)
    sidenav.options.outDuration = 0
}

function matchMin(minWidth) {
  if (minWidth.matches) {
    sessionStorage.removeItem('sideStatus')
    animateIn(0)
    tr = false
  }
}

// Events
document.addEventListener('DOMContentLoaded', function () {
  const navMobileA = document.querySelectorAll('#nav-mobile a')
  for (let i = 0; i < navMobileA.length; i++) {
    if (navMobileA[i].getAttribute('href').split('/').filter(link => link !== '' && link !== '.').join('') === '') {
      navMobileA[i].parentElement.setAttribute('class', 'active waves-effect')
      return
    }
    const path = navMobileA[i].getAttribute('href').split('/').filter(link => link !== '')
    const pathName = location.pathname.split('/').filter(link => link !== '')
    if (path[path.length - 1] === pathName[pathName.length - 1]) {
      navMobileA[i].parentElement.setAttribute('class', 'active waves-effect')
      break;
    }
  }

  const paddingHeadersA = document.querySelectorAll('.active .active a')
  for (let i = 0; i < paddingHeadersA.length; i++) {
    const path = paddingHeadersA[i].getAttribute('href').split('/').filter(link => link !== '')
    const pathName = location.pathname.split('/').filter(link => link !== '')
    if (path[path.length - 1] === pathName[pathName.length - 1]) {
      paddingHeadersA[i].setAttribute('class', 'btn waves-effect grey lighten-2 black-text z-depth-2')
      break;
    }
  }
})

window.onload = function () {
  document.querySelector('#slide-out').classList.remove('hide')
  document.querySelector('header').classList.remove('hide')
  document.querySelector('main').classList.remove('hide')
  document.querySelector('footer').classList.remove('hide')
  document.querySelector('#spinner').remove()
  maxWidth.addListener(matchMax)
  minWidth.addListener(matchMin)
}