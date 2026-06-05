import { useState } from 'react'
import './FeatureCarousel.scss'

const slides = [
  {
    num: '01',
    title: 'Fuego de Quebracho',
    desc: 'Usamos exclusivamente leña de quebracho colorado, la madera más densa de Argentina. Arde lento, da calor parejo y un humo que perfuma la carne desde adentro.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },
  {
    num: '02',
    title: 'Cortes de Primera',
    desc: 'Seleccionamos cada pieza directamente con productores locales. Solo trabajamos con animales de pastoreo, criados sin apuro, igual que nuestro proceso.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  },
  {
    num: '03',
    title: 'Rubs Artesanales',
    desc: 'Nuestras mezclas de especias se tuestan y muelen a mano cada semana. Sin conservantes, sin mezclas industriales. Solo sabor real.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  },
  {
    num: '04',
    title: 'Tiempo Sin Apuro',
    desc: 'Entre 6 y 18 horas de cocción a baja temperatura. No hay atajos. La paciencia es el ingrediente principal de cada corte que servimos.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
  },
]

function FeatureCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length)
  const next = () => setCurrent(i => (i + 1) % slides.length)

  return (
    <div className="carousel">
      <div className="carousel__slides">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="carousel__slide" key={i}>
              <div className="carousel__image">
                <img src={slide.image} alt={slide.title} />
                <div className="carousel__image-overlay" />
              </div>
              <div className="carousel__content">
                <span className="carousel__num">{slide.num}</span>
                <h3 className="carousel__title">{slide.title}</h3>
                <p className="carousel__desc">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel__controls">
        <div className="carousel__arrows">
          <button className="carousel__arrow" onClick={prev}>←</button>
          <button className="carousel__arrow" onClick={next}>→</button>
        </div>
        <div className="carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${current === i ? 'carousel__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <span className="carousel__counter">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default FeatureCarousel