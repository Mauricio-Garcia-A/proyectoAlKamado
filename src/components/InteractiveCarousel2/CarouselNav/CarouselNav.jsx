function CarouselNav({ slides, current, onSelect }) {
  return (
    <div className="icarousel__nav">
      {slides.map((item, i) => (
        <button
          key={i}
          className={`icarousel__nav-btn ${current === i ? 'icarousel__nav-btn--active' : ''}`}
          onClick={() => onSelect(i)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}

export default CarouselNav
