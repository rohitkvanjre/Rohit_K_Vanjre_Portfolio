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

// --- 1. Scroll reveal ---------------------------------------------------
// IntersectionObserver tells us when an element enters the viewport. It is
// far cheaper than checking positions on every scroll event, because the
// browser does the work natively instead of running our code 60 times a
// second.

const revealTargets = document.querySelectorAll('[data-reveal]')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
        // Once revealed, stop watching it — the animation only plays once.
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
)

revealTargets.forEach((el) => revealObserver.observe(el))

// --- 2. Active nav link -------------------------------------------------
// Highlight the nav link matching whichever section is currently on screen.

const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('header nav a[href^="#"]')

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const id = entry.target.id
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
      })
    })
  },
  // Only count a section as "current" when it crosses the middle of the screen.
  { rootMargin: '-45% 0px -45% 0px' }
)

sections.forEach((section) => sectionObserver.observe(section))

// --- 3. Copy email ------------------------------------------------------
// The email row in Contact copies the address instead of opening a mail app.

const copyButton = document.querySelector('.copy-email')

if (copyButton) {
  const label = copyButton.querySelector('.copy-email-text')
  const address = copyButton.dataset.email

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address)
      label.textContent = 'Copied to clipboard'
      copyButton.classList.add('is-copied')
      setTimeout(() => {
        label.textContent = address
        copyButton.classList.remove('is-copied')
      }, 2000)
    } catch {
      // Clipboard access can be refused on older browsers or insecure origins.
      label.textContent = 'Press Ctrl+C to copy'
    }
  })
}


// --- 4. Project filtering -----------------------------------------------

const filterChips = document.querySelectorAll('.filter-chip')
const projectCards = document.querySelectorAll('.project-card')

filterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter

    filterChips.forEach((c) => c.classList.toggle('is-active', c === chip))

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter
      card.classList.toggle('is-filtered-out', !matches)
    })
  })
})

// --- 5. Animated counters -----------------------------------------------
// Count from 0 up to the target when the stat scrolls into view.

const counters = document.querySelectorAll('[data-count-to]')

function runCounter(el) {
  const target = Number(el.dataset.countTo)
  const suffix = el.dataset.suffix || ''
  const duration = 1200
  const start = performance.now()

  function tick(now) {
    const elapsed = now - start
    const progress = Math.min(1, elapsed / duration)
    // easeOutCubic — fast at first, settling gently at the end.
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.round(target * eased) + suffix
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      runCounter(entry.target)
      counterObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.5 }
)

counters.forEach((el) => counterObserver.observe(el))
