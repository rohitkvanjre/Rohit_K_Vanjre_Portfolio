// Add the .scrolled class to the header once the page is scrolled past 16px.
// The header is transparent at the top of the page and gains its background,
// blur and bottom border only after you start scrolling.

const header = document.querySelector('header')

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 16)
}

updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })
