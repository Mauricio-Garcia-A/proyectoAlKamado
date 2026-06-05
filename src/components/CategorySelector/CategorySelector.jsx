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

function CategorySelector({ active, onChange }) {
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