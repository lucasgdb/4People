// Materialize initalizations
M.Sidenav.init(document.querySelectorAll('.sidenav'))
M.Collapsible.init(document.querySelectorAll('.sidenav.collapsible'), {
    accordion: false
})
M.Collapsible.init(document.querySelectorAll('.padding-headers.collapsible'))

// Constants
const sidenav = M.Sidenav.getInstance(document.querySelector('#slide-out'))
const navMobileA = document.querySelectorAll('#nav-mobile a')
const paddingHeadersA = document.querySelectorAll('.active .active a')
const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

// Left and right effects from sidebar
let tr = false

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
    } else if (sidenav.options.outDuration === 0) {
        sidenav.options.outDuration = 200
    }
}

// Media Queries with pure JS
const maxWidth = window.matchMedia('(max-width: 992px)')
const minWidth = window.matchMedia('(min-width: 993px)')

function matchMax(maxWidth) {
    if (maxWidth.matches && !tr) {
        animateOut()
    } else if (maxWidth.matches && tr) {
        sidenav.options.outDuration = 0
    }
}

function matchMin(minWidth) {
    if (minWidth.matches) {
        sessionStorage.removeItem('sideStatus')
        animateIn(0)
        tr = false
    }
}

// Methods
function animateIn(delay = 250) {
    document.body.style.transition = `padding-left ${delay}ms, opacity 125ms`
    document.body.style.paddingLeft = '300px'
}

function animateOut(delay = 250) {
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

function updatePage(e, link) {
    e.preventDefault()
    header.style.opacity = '0'
    main.style.opacity = '0'
    footer.style.opacity = '0'
    if (innerWidth < 993) {
        sidenav.close()
    } else {
        sidenav.el.style.opacity = '0'
    }
    setTimeout(function () {
        location = link
    }, 125)
}

// Pave events
document.addEventListener('DOMContentLoaded', function () {
    const allAElements = document.querySelectorAll('a[href^="."]')
    for (let i = 0; i < allAElements.length; i++) {
        allAElements[i].onclick = function (event) {
            const link = allAElements[i].getAttribute('href')
            updatePage(event, link)
        }
    }

    if (sessionStorage.getItem('sideStatus') === 'true') {
        sidenav.options.outDuration = 0
        sideOut()
        animateOut(0)
    }

    for (let i = 0; i < navMobileA.length; i++) {
        if (navMobileA[i].getAttribute('href').split('/').filter(link => link !== '' && link !== '.').join('') === '') {
            navMobileA[i].parentElement.setAttribute('class', 'active waves-effect')
            return
        }

        const path = navMobileA[i].getAttribute('href').split('/').filter(link => link !== '')
        const pathName = location.pathname.split('/').filter(link => link !== '')
        if (path[path.length - 1] === pathName[pathName.length - 1]) {
            navMobileA[i].parentElement.setAttribute('class', 'active waves-effect')
            break
        }
    }

    for (let i = 0; i < paddingHeadersA.length; i++) {
        const path = paddingHeadersA[i].getAttribute('href').split('/').filter(link => link !== '')
        const pathName = location.pathname.split('/').filter(link => link !== '')
        if (path[path.length - 1] === pathName[pathName.length - 1]) {
            paddingHeadersA[i].setAttribute('class', 'btn waves-effect grey lighten-2 black-text z-depth-2')
            break
        }
    }
})

window.onload = function () {
    header.style.opacity = '1'
    main.style.opacity = '1'
    footer.style.opacity = '1'
    sidenav.el.style.opacity = '1'
    document.querySelector('#spinner').remove()
    maxWidth.addListener(matchMax)
    minWidth.addListener(matchMin)
}

document.onkeydown = function (e) {
    if (e.keyCode === 116) {
        updatePage(e, location)
    }
}