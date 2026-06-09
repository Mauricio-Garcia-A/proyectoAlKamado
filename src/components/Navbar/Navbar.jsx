import { useState, useEffect, useRef } from 'react'
import './Navbar.scss'

const links = [
  { href: 'nosotros', label: 'Nosotros' },
  { href: 'menu',     label: 'Menú'     },
  { href: 'carta',  label: 'Carta'  },
  { href: 'proceso',  label: 'Proceso'  },
  { href: 'contacto', label: 'Contacto' },
]

const CIRCUMFERENCE = 75.4
const CIRCUMFERENCE_MOBILE = 163.4 // r=26 → 2π×26

function useNavState() {
  const [active, setActive]             = useState('')
  const [visibleLabel, setVisibleLabel] = useState('')
  const [hoveredItem, setHoveredItem]   = useState('')
  const [wasVisible, setWasVisible]     = useState({})
  const timerRef                        = useRef(null)

  const showLabelTemporarily = (href) => {
    setVisibleLabel(href)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setWasVisible(prev => ({ ...prev, [href]: true }))
      setVisibleLabel('')
    }, 3000)
  }

  useEffect(() => {
    const observers = links.map(link => {
      const el = document.getElementById(link.href)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(link.href)
            showLabelTemporarily(link.href)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach(o => o?.disconnect())
      clearTimeout(timerRef.current)
    }
  }, [])

  const handleClick = (href) => {
    setActive(href)
    showLabelTemporarily(href)
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    active, visibleLabel, hoveredItem, wasVisible,
    setHoveredItem, setWasVisible, handleClick,
    showLabelTemporarily
  }
}

// ── DESKTOP ──
function NavbarDesktop() {
  const {
    active, visibleLabel, hoveredItem, wasVisible,
    setHoveredItem, setWasVisible, handleClick
  } = useNavState()

  const isVisible = (href) => visibleLabel === href || hoveredItem === href

  const getLabelOpacity = (href) => {
    if (visibleLabel === href) return 1
    if (hoveredItem === href) return 0.5
    return 0
  }

  const getLabelTransform = (href) => {
    if (isVisible(href)) return 'translateX(0)'
    if (wasVisible[href]) return 'translateX(8px)'
    return 'translateX(-8px)'
  }

  const getLabelTransition = (href) => {
    if (isVisible(href)) return 'opacity 0.3s ease, transform 0.3s ease'
    return 'opacity 1.2s ease, transform 1.2s ease'
  }

  return (
    <nav className="navbar navbar--desktop">
      <a href="#inicio" className="navbar__logo">
        ALK<span>A</span>MADO
      </a>
      <ul className="navbar__links">
        {links.map(link => (
          <li key={link.href}>
            <div className={`nav-item ${active === link.href ? 'nav-item--active' : ''}`}>
              <span
                className="nav-item__label"
                style={{
                  opacity:    getLabelOpacity(link.href),
                  transform:  getLabelTransform(link.href),
                  transition: getLabelTransition(link.href),
                }}
              >
                {link.label}
              </span>
              <div
                className="nav-item__dot-wrap"
                onClick={() => handleClick(link.href)}
                onMouseEnter={() => {
                  setWasVisible(prev => ({ ...prev, [link.href]: false }))
                  setHoveredItem(link.href)
                }}
                onMouseLeave={() => {
                  setWasVisible(prev => ({ ...prev, [link.href]: true }))
                  setHoveredItem('')
                }}
              >
                <svg className="nav-item__svg" viewBox="0 0 28 28">
                  <circle className="circle-track" cx="14" cy="14" r="12" />
                  <circle
                    className="circle-progress"
                    cx="14"
                    cy="14"
                    r="12"
                    style={{
                      strokeDashoffset: active === link.href ? 0 : CIRCUMFERENCE
                    }}
                  />
                </svg>
                <div className="nav-item__dot" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ── MOBILE ──
function NavbarMobile() {
  const { active, visibleLabel, showLabelTemporarily, handleClick } = useNavState()
  const [isScrolling, setIsScrolling]   = useState(false)
  const [labelVisible, setLabelVisible] = useState(false)
  const scrollTimerRef                  = useRef(null)
  const labelTimerRef                   = useRef(null)

  const activeIndex   = links.findIndex(l => l.href === active)
  const progress      = activeIndex >= 0 ? (activeIndex + 1) / links.length : 0
  const dashOffset    = CIRCUMFERENCE_MOBILE - (CIRCUMFERENCE_MOBILE * progress)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      setLabelVisible(true)
      clearTimeout(scrollTimerRef.current)
      clearTimeout(labelTimerRef.current)
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 800)
      labelTimerRef.current  = setTimeout(() => setLabelVisible(false), 3000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeLabel = links.find(l => l.href === active)?.label || ''

  return (
    <div className="navbar navbar--mobile">
      <a href="#inicio" className="navbar__logo">
        ALK<span>A</span>MADO
      </a>
      <div className="mobile-nav">
        <div className="mobile-nav__circle-wrap">
          <svg className="mobile-nav__svg" viewBox="0 0 60 60">
            <circle className="circle-track" cx="30" cy="30" r="26" />
            <circle
              className="circle-progress"
              cx="30"
              cy="30"
              r="26"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <div className="mobile-nav__dot" />
        </div>
        <span
          className="mobile-nav__label"
          style={{
            opacity:    labelVisible ? 1 : 0,
            transform:  labelVisible ? 'translateX(0)' : 'translateX(8px)',
            transition: labelVisible
              ? 'opacity 0.3s ease, transform 0.3s ease'
              : 'opacity 1.2s ease, transform 1.2s ease'
          }}
        >
          {activeLabel}
        </span>
      </div>
    </div>
  )
}

// ── EXPORT ──
function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />
}

export default Navbar