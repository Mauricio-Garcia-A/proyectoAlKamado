function CarouselSlide({ slide, slideRef }) {
  return (
    <div className="icarousel__slide" ref={slideRef}>
      {slide.image && (
        <div className="icarousel__slide-cover">
          <img src={slide.image} alt={slide.title} />
        </div>
      )}

      <h3 className="icarousel__slide-title">
        <span className="icarousel__slide-num">{slide.icon}</span>
        {slide.title.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </h3>

      <p className="icarousel__slide-desc">{slide.desc}</p>
    </div>
  )
}

export default CarouselSlide
