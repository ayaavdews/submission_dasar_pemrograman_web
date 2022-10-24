window.onload = () => {
  handleNavChange(document.querySelector('.navlink.active'))
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav')
  const navlinks = document.querySelectorAll('.navlink')
  const tabInd = document.querySelector('.tab-indicator')
  const menuBtn = document.querySelector('#menu-btn')

  menuBtn.addEventListener('click', () => {
    handleNavChange(document.querySelector('.navlink.active'))
    headerQueries()
  })

  for(let i=0; i<navlinks.length; i++) {
    navlinks[i].addEventListener('click', function(e) {
      if(window.matchMedia('(max-width: 768px)').matches) {
        headerQueries()
        menuBtn.checked = false
      }
      handleNavChange(this);
      e.preventDefault()
      fitScroll(this.getAttribute('href'))
    })
  }
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