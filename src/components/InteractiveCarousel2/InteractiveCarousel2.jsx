import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import slides from './slides'
import KamadoScene from './KamadoScene/KamadoScene'
import CarouselSlide from './CarouselSlide/CarouselSlide'
import CarouselNav from './CarouselNav/CarouselNav'
import './InteractiveCarousel2.scss'

function InteractiveCarousel2() {
  const [current, setCurrent] = useState(0)
  const contentRef = useRef()

  const handleSelect = (index) => {
    if (index === current) return

    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        )
      },
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleSelect((current + 1) % slides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="icarousel">
      <div className="container-controsls">
        <KamadoScene current={current} onSelect={handleSelect} />
        <CarouselNav slides={slides} current={current} onSelect={handleSelect} />
      </div>

      <div className="icarousel__content">
        <CarouselSlide slide={slides[current]} slideRef={contentRef} />
      </div>
    </div>
  )
}

export default InteractiveCarousel2
