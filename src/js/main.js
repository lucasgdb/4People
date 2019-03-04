// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('.sidenav.collapsible'), {
  accordion: false
})
M.Collapsible.init(document.querySelectorAll('.padding-headers.collapsible'))

// Left and right effects from sidebar
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))
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

function animateOut(delay = 200) {
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

document.addEventListener('DOMContentLoaded', function () {
  let itens = document.querySelectorAll('#nav-mobile a[href^="/"]')

  itens.forEach(item => {
    if (item.getAttribute('href') === location.pathname)
      item.parentElement.setAttribute('class', 'active waves-effect')
  })

  itens = document.querySelectorAll('.active .padding-headers a')

  itens.forEach(item => {
    if (item.getAttribute('href') === location.pathname)
      item.setAttribute('class', 'btn waves-effect grey lighten-2 black-text z-depth-2')
  })
})

window.onload = function () {
  document.querySelector('header').className = ''
  document.querySelector('main').className = 'grey lighten-5'
  document.querySelector('footer').className = 'page-footer grey lighten-3'
  document.querySelector('#spinner').remove()
  maxWidth.addListener(matchMax)
  minWidth.addListener(matchMin)
}