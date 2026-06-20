import { useRef, useState, useEffect } from 'react'
import './CategorySelector.scss'
import IconVacuno from '../Icons/IconVacuno'
import IconPorcino from '../Icons/IconPorcino'
import IconApicola from '../Icons/IconApicola'
import IconOtros from '../Icons/IconOtros'
import IconPeces from '../Icons/IconPeces'
const categories = [
  {
    cat: 'all',
    label: 'Todo',
    icon: (
      <IconPeces />
    ),
  },
  {
    cat: 'vacuno',
    label: 'Vacuno',
    icon: (
      <IconVacuno />
    ),
  },
  {
    cat: 'cerdo',
    label: 'Cerdo',
    icon: (
      <IconPorcino />
    ),
  },
  {
    cat: 'pollo',
    label: 'Pollo',
    icon: (
      <IconApicola />
    ),
  },
  {
    cat: 'otros',
    label: 'Otros',
    icon: (
      <IconOtros />
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