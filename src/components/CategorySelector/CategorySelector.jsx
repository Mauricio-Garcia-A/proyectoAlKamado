import { useRef, useState, useEffect } from 'react'
import './CategorySelector.scss'

const categories = [
  {
    cat: 'all',
    label: 'Todo',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="14" cy="14" r="5" />
        <line x1="14" y1="2"  x2="14" y2="6"  />
        <line x1="14" y1="22" x2="14" y2="26" />
        <line x1="2"  y1="14" x2="6"  y2="14" />
        <line x1="22" y1="14" x2="26" y2="14" />
        <line x1="5.5"  y1="5.5"  x2="8.5"  y2="8.5"  />
        <line x1="19.5" y1="19.5" x2="22.5" y2="22.5" />
        <line x1="5.5"  y1="22.5" x2="8.5"  y2="19.5" />
        <line x1="19.5" y1="8.5"  x2="22.5" y2="5.5"  />
      </svg>
    ),
  },
  {
    cat: 'vacuno',
    label: 'Vacuno',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 20 C6 20 8 10 14 10 C20 10 22 20 22 20" />
        <path d="M6 8 C4 5 2 6 3 9 C4 11 7 11 8 9" />
        <path d="M22 8 C24 5 26 6 25 9 C24 11 21 11 20 9" />
        <line x1="14" y1="10" x2="14" y2="6" />
        <circle cx="14" cy="5" r="1.5" />
      </svg>
    ),
  },
  {
    cat: 'cerdo',
    label: 'Cerdo',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M7 18 C7 12 10 9 14 9 C18 9 21 12 21 18" />
        <path d="M22 12 C25 11 26 13 25 15 C24 17 22 16 22 14" />
        <ellipse cx="12" cy="16" rx="1" ry="1.5" />
        <ellipse cx="16" cy="16" rx="1" ry="1.5" />
        <path d="M11 20 C11 22 9 23 9 23" />
        <path d="M17 20 C17 22 19 23 19 23" />
        <path d="M12 13 C12 12 13 11.5 14 11.5 C15 11.5 16 12 16 13" />
      </svg>
    ),
  },
  {
    cat: 'pollo',
    label: 'Pollo',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="14" cy="14" r="9" />
        <line x1="5" y1="14" x2="23" y2="14" />
        <line x1="6.5" y1="19" x2="21.5" y2="19" />
      </svg>
    ),
  },
  {
    cat: 'otros',
    label: 'Otros',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="14" cy="14" r="9" />
        <ellipse cx="14" cy="14" rx="3.5" ry="9" />
        <line x1="5" y1="14" x2="23" y2="14" />
        <line x1="6.5" y1="9"  x2="21.5" y2="9"  />
        <line x1="6.5" y1="19" x2="21.5" y2="19" />
      </svg>
    ),
  },
]

const ITEM_WIDTH = 80  // ancho de cada ítem en mobile
const GAP        = 20  // gap entre ítems

function CategorySelectorMobile({ active, onChange }) {
  const [offset, setOffset]       = useState(0)
  const [dragging, setDragging]   = useState(false)
  const startXRef                 = useRef(0)
  const startOffsetRef            = useRef(0)
  const containerRef              = useRef(null)

  const activeIndex = categories.findIndex(c => c.cat === active)

  // centrar el ítem activo
  const getOffsetForIndex = (index) => {
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
    return containerWidth / 2 - index * (ITEM_WIDTH + GAP) - ITEM_WIDTH / 2
  }

  useEffect(() => {
    setOffset(getOffsetForIndex(activeIndex))
  }, [activeIndex])

  const snapToNearest = (currentOffset) => {
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
    const center         = containerWidth / 2

    let nearest    = 0
    let minDist    = Infinity

    categories.forEach((_, i) => {
      const itemCenter = currentOffset + i * (ITEM_WIDTH + GAP) + ITEM_WIDTH / 2
      const dist       = Math.abs(itemCenter - center)
      if (dist < minDist) {
        minDist = dist
        nearest = i
      }
    })

    setOffset(getOffsetForIndex(nearest))
    onChange(categories[nearest].cat)
  }

  const handleTouchStart = (e) => {
    setDragging(true)
    startXRef.current      = e.touches[0].clientX
    startOffsetRef.current = offset
  }

  const handleTouchMove = (e) => {
    if (!dragging) return
    const dx = e.touches[0].clientX - startXRef.current
    setOffset(startOffsetRef.current + dx)
  }

  const handleTouchEnd = () => {
    setDragging(false)
    snapToNearest(offset)
  }

  return (
    <div
      className="category-selector category-selector--mobile"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* línea guía de puntos */}
      <div className="category-selector__track-dots" />

      <div
        className="category-selector__mobile-track"
        style={{
          transform:  `translateX(${offset}px)`,
          transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {categories.map((item, i) => {
          const isActive  = active === item.cat
          const dist      = Math.abs(i - categories.findIndex(c => c.cat === active))
          const scale     = isActive ? 1 : Math.max(0.6, 1 - dist * 0.15)
          const opacity   = isActive ? 1 : Math.max(0.2, 1 - dist * 0.3)

          return (
            <div
              key={item.cat + i}
              className={`cat-btn-mobile ${isActive ? 'cat-btn-mobile--active' : ''}`}
              style={{
                transform:  `scale(${scale})`,
                opacity,
                transition: dragging ? 'none' : 'transform 0.4s ease, opacity 0.4s ease',
              }}
              onClick={() => !dragging && onChange(item.cat)}
            >
              <div className="cat-btn-mobile__ring" />
              <span className="cat-btn-mobile__icon">{item.icon}</span>
              {isActive && (
                <span className="cat-btn-mobile__label">{item.label}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CategorySelector({ active, onChange }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return <CategorySelectorMobile active={active} onChange={onChange} />
  }

  return (
    <div className="category-selector">
      {categories.map(item => (
        <button
          key={item.cat}
          className={`cat-btn ${active === item.cat ? 'cat-btn--active' : ''}`}
          onClick={() => onChange(item.cat)}
        >
          <span className="cat-btn__icon">{item.icon}</span>
          <span className="cat-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default CategorySelector