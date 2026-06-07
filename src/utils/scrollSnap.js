import gsap from 'gsap'
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SECTIONS = ['#inicio', '#nosotros', '#menu', '#proceso', '#contacto']

export function initScrollSnap() {
  const targets = () =>
    SECTIONS.map(id => document.querySelector(id))
             .filter(Boolean)

  let isAnimating = false
  let current     = 0

  const goTo = (index) => {
    const els = targets()
    if (!els[index] || isAnimating) return
    isAnimating = true
    current     = index

    gsap.to(window, {
      scrollTo: { y: els[index], autoKill: false },
      duration: 1.2,
      ease:     'power3.inOut',
      onComplete: () => {
        isAnimating = false
      }
    })
  }

  const getNearestIndex = () => {
    const els     = targets()
    const scrollY = window.scrollY
    let nearest   = 0
    let minDist   = Infinity

    els.forEach((el, i) => {
      const dist = Math.abs(el.offsetTop - scrollY)
      if (dist < minDist) {
        minDist = dist
        nearest = i
      }
    })
    return nearest
  }

  // inicializa current según la sección visible al cargar
  current = getNearestIndex()

  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    if (isAnimating) return

    const dir  = e.deltaY > 0 ? 1 : -1
    const next = Math.min(Math.max(current + dir, 0), targets().length - 1)
    goTo(next)
  }, { passive: false })

  window.addEventListener('keydown', (e) => {
    if (isAnimating) return
    if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1)
    if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1)
  })

  let touchStartY = 0
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY
  }, { passive: true })

  window.addEventListener('touchend', (e) => {
    if (isAnimating) return
    const diff = touchStartY - e.changedTouches[0].clientY
    if (Math.abs(diff) < 30) return
    const dir  = diff > 0 ? 1 : -1
    goTo(current + dir)
  }, { passive: true })
}