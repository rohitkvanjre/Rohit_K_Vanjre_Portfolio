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
