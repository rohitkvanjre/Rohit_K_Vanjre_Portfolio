// Add the .scrolled class to the header once the page is scrolled past 16px.
// The header is transparent at the top of the page and gains its background,
// blur and bottom border only after you start scrolling.

const header = document.querySelector('header')

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 16)
}

updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

// Mobile menu: the button controls a panel that is hidden by default.
// aria-expanded tells assistive technology whether it is open, and CSS
// uses that same attribute to animate the hamburger into a cross.

const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu')
  mobileMenu.hidden = isOpen
})

// Close the menu after tapping any link in it.
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'Open menu')
    mobileMenu.hidden = true
  })
})

// Scroll progress: drives the right-hand rail and the back-to-top button.
// JavaScript only writes numbers into CSS custom properties; CSS does the
// drawing. That keeps all the appearance decisions in the stylesheet.

const rail = document.querySelector('.scroll-rail')
const railThumb = document.querySelector('.scroll-rail-thumb')
const backToTop = document.querySelector('.back-to-top')

function updateScrollProgress() {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
  const clamped = Math.min(100, Math.max(0, progress))

  // Thumb height mirrors how much of the page fits on screen at once.
  const ratio = (window.innerHeight / doc.scrollHeight) * 100
  const thumbHeight = Math.max(12, Math.min(42, ratio))

  railThumb.style.setProperty('--thumb-height', thumbHeight + '%')
  railThumb.style.setProperty(
    '--thumb-offset',
    (clamped / 100) * ((100 - thumbHeight) / thumbHeight) * 100 + '%'
  )
  rail.setAttribute('aria-valuenow', String(Math.round(clamped)))

  backToTop.classList.toggle('is-visible', window.scrollY > 360)
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

updateScrollProgress()
window.addEventListener('scroll', updateScrollProgress, { passive: true })
window.addEventListener('resize', updateScrollProgress)
