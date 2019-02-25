// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('ul.collapsible'), {
  accordion: false
})

// Left and right effects from sidebar
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))
let tr = false

function animateIn(delay = 200) {
  document.body.animate([{
      paddingLeft: '0',
    },
    {
      paddingLeft: '300px',
    }
  ], {
    duration: delay,
    fill: 'forwards'
  })
}

function animateOut() {
  document.body.animate([{
      paddingLeft: '300px',
    },
    {
      paddingLeft: '0',
    }
  ], {
    duration: 150,
    fill: 'forwards'
  })
}

document.querySelector('#menu').onclick = function () {
  if (innerWidth >= 993) {
    if (tr) {
      sidenav._animateSidenavIn()
      tr = false
      sidenav.isOpen = true
      animateIn()
    } else {
      sidenav._animateSidenavOut()
      tr = true
      sidenav.isClose = true
      animateOut()
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
    animateIn(0)
    tr = false
  }
}

window.onload = function () {
  maxWidth.addListener(matchMax)
  minWidth.addListener(matchMin)

  document.body.style.display = 'flex'
}