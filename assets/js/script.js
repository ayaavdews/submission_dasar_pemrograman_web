window.onload = () => handleNavChange(document.querySelector('.navlink.active'))
window.onresize = () => handleNavChange(document.querySelector('.navlink.active'));

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header')
  const nav = document.querySelector('nav')
  const navlinks = document.querySelectorAll('.navlink')
  const tabInd = document.querySelector('.tab-indicator')
  const menuBtn = document.querySelector('#menu-btn')
  let sections     = document.querySelectorAll('section')

  let HomeHeigt = document.querySelector('.home-title').offsetHeight
  window.onscroll = () => {
    (window.scrollY > HomeHeigt-50) ? header.classList.add('shadow') : header.classList.remove('shadow');
    const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - convertRemToPixels(5)) - 1
    console.log(current)
  }

  menuBtn.addEventListener('click', () => {
    handleNavChange(document.querySelector('.navlink.active'))
    headerQueries()
  })

  for(let i=0; i<navlinks.length; i++) {
    navlinks[i].addEventListener('click', function(e) {
      handleNavChange(this);
      e.preventDefault()
      fitScroll(this.getAttribute('href'))
    })
  }

  tabInd.addEventListener('transitionend', function(e) {
    if(window.matchMedia('(max-width: 768px)').matches && nav.classList.contains('active')) {
      if(e.propertyName === 'top') {
        headerQueries()
        menuBtn.checked = false
      }
    }
  })
})

function handleNavChange(navlink) {
  for(let sibling of  navlink.parentNode.children) {
    if (sibling !== navlink) sibling.classList.remove('active')
  }
  navlink.classList.add('active')
  document.querySelector('.tab-indicator').style.cssText = `
    height: ${navlink.offsetHeight}px;
    width: ${navlink.offsetWidth}px;
    left: ${navlink.offsetLeft}px;
    top: ${navlink.offsetTop}px;
  `
}

function headerQueries() {
  document.querySelector('nav').classList.toggle('active')
  document.querySelector('header').classList.toggle('header-queries')
  document.body.style.overflowY = (document.querySelector('header').classList.contains('header-queries')) ? 'hidden' : 'visible'
}

let convertRemToPixels = rem => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
let fitScroll = sectId =>  window.scrollTo({ top: document.querySelector(`${sectId}`).offsetTop - convertRemToPixels(5)});