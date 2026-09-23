# rohit.dev — portfolio

My personal portfolio site. Hand-written HTML, CSS and JavaScript —
no frameworks, no build step, no dependencies.

**Live:** https://rohit-k-vanjre-portfolio.vercel.app

![Portfolio homepage](images/og-image.png)

---

## Features

- **Fluid across every screen size** — `clamp()` scales type and layout
  continuously from a 375px phone to an ultrawide, rather than jumping at
  fixed breakpoints
- **Scroll-reveal animations** using `IntersectionObserver`
- **Active nav highlighting** that tracks the section you are reading
- **Scroll-aware header** — transparent over the hero, frosted once you scroll
- **Custom scroll progress rail** and a back-to-top control
- **Category filtering** on the project grid
- **Accessible mobile menu** driven by `aria-expanded`
- **Click-to-copy** email in the contact section
- **Respects `prefers-reduced-motion`** — all animation is disabled for
  visitors who ask for it

---

## Built with

| | |
|---|---|
| Markup | Semantic HTML5, validated against the W3C checker |
| Styling | CSS custom properties, Flexbox, Grid, `clamp()`, `oklch()` colours |
| Behaviour | Vanilla JavaScript — `IntersectionObserver`, Clipboard API |
| Fonts | Geist and Geist Mono |
| Hosting | Vercel, deployed from `main` on every push |
| Analytics | Microsoft Clarity |

No npm, no bundler, no CSS framework.

---

## Contact

- **Email:** rohitvanjre@gmail.com
- **LinkedIn:** [rohit-k-vanjre](https://linkedin.com/in/rohit-k-vanjre-742432372)
- **GitHub:** [@rohitkvanjre](https://github.com/rohitkvanjre)
