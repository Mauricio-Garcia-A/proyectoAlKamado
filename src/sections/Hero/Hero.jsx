import { useEffect, useRef } from 'react'
import './Hero.scss'
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator'
import Logo from '../../components/Logo/Logo'

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 10
        this.size = Math.random() * 3 + 1
        this.speedY = -(Math.random() * 1.5 + 0.5)
        this.speedX = (Math.random() - 0.5) * 0.5
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
        this.type = Math.random() > 0.7 ? 'ember' : 'smoke'
      }
      update() {
        this.x += this.speedX + Math.sin(this.life * 0.03) * 0.3
        this.y += this.speedY
        this.life++
        if (this.life > this.maxLife) this.reset()
      }
      draw() {
        const progress = this.life / this.maxLife
        const alpha = progress < 0.1 ? progress * 10 : (1 - progress)

        if (this.type === 'ember') {
          ctx.save()
          ctx.globalAlpha = alpha * 0.9
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          grd.addColorStop(0, '#ff6b20')
          grd.addColorStop(0.5, '#c8410a')
          grd.addColorStop(1, 'transparent')
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          ctx.save()
          ctx.globalAlpha = alpha * 0.15
          const size = this.size * (1 + progress * 8)
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size)
          grd.addColorStop(0, '#8a7d72')
          grd.addColorStop(1, 'transparent')
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }
    }

    for (let i = 0; i < 120; i++) {
      const p = new Particle()
      p.life = Math.random() * p.maxLife
      particles.push(p)
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className="section-standar hero" id="inicio">
      <canvas className="hero__canvas" ref={canvasRef} />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">★ La Plata - Bs As - Argentina ★</p>
        <h1 className="hero__title">
           ALK<span>AMAD<Logo className='logo-titulo'/></span>
        </h1>
        <p className="hero__sub">
          Ahumados artesanales con fuego de quebracho y tiempo sin apuro.
        </p>
      </div>
      <div className="hero__scroll2">
        <ScrollIndicator />
      </div>
      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero