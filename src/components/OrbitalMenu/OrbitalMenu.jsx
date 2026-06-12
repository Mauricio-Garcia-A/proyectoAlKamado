import { useState, useEffect, useRef } from 'react'
import './OrbitalMenu.scss'
import TapaKamadoModel from '../TapaKamadoModel/TapaKamadoModel'


const RADIUS = 200

function OrbitalMenu({ items = [] }) {
  const TOTAL = items.length

  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [activeId, setActiveId] = useState(null)
  const rotationRef = useRef(0)
  const animRef = useRef(null)
  const lastTimeRef = useRef(null)

  // Animación con requestAnimationFrame para rotación suave
  useEffect(() => {
    if (!autoRotate) {
      cancelAnimationFrame(animRef.current)
      return
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current !== null) {
        const delta = timestamp - lastTimeRef.current
        rotationRef.current = (rotationRef.current + delta * 0.018) % 360
        setRotation(rotationRef.current)
      }
      lastTimeRef.current = timestamp
      animRef.current = requestAnimationFrame(animate)
    }

    lastTimeRef.current = null
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [autoRotate])

  const getPosition = (index) => {
    const angle = ((index / TOTAL) * 360 + rotation) % 360
    const radian = (angle * Math.PI) / 180
    const x = RADIUS * Math.cos(radian)
    const y = RADIUS * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  }

  // ángulo 270° = top del círculo (12 en punto) ----- // Centra el nodo seleccionado en la posición derecha (ángulo 0 = posición 3 en punto)
  const centerOnNode = (index) => {
    const targetAngle = (index / TOTAL) * 360
    const targetRotation = (270 - targetAngle + 360) % 360
    rotationRef.current = targetRotation
    setRotation(targetRotation)
  }

  const handleNodeClick = (e, item, index) => {
    e.stopPropagation()
    if (activeId === item.id) {
      setActiveId(null)
      setAutoRotate(true)
    } else {
      setActiveId(item.id)
      setAutoRotate(false)
      centerOnNode(index)
    }
  }

  const handleBgClick = () => {
    setActiveId(null)
    setAutoRotate(true)
  }

  return (
    <div className="orbital" onClick={handleBgClick}>
      <div className='image-bg-orbital'>
        <img src='/proyectoAlKamado/Images/kamado-bg-menu-v2.png' className='image-bg-orbital__img1'/>
        <img src='/proyectoAlKamado/Images/kamado-bg-menu-v2-part2.png' className='image-bg-orbital__img2'/>
      </div>

      <div className='tapa-kamado'>
          <TapaKamadoModel isOpen={true} />
      </div>
      <div className="orbital__orbit" />

      <div className="orbital__center">
        <div className="orbital__center-dot" />
      </div>

      {items.map((item, index) => {
        const { x, y, zIndex, opacity } = getPosition(index)
        const isActive = activeId === item.id

        return (
          <div
            key={item.id}
            className="orbital__node"
            style={{
              transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
              zIndex: isActive ? 200 : zIndex,
              opacity: isActive ? 1 : opacity,
              transition: autoRotate
                ? 'opacity 0.3s ease'
                : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
            }}
            onClick={(e) => handleNodeClick(e, item, index)}
          >
            {/* Glow por energía */}
            <div
              className="orbital__node-glow"
              style={{
                width: `${item.energy * 0.4 + 30}px`,
                height: `${item.energy * 0.4 + 30}px`,
                opacity: isActive ? 0.4 : 0.15,
              }}
            />

            <div className={`orbital__node-inner ${isActive ? 'orbital__node-inner--active' : ''}`}>
              🔥
            </div>

            <div className={`orbital__node-label ${isActive ? 'orbital__node-label--active' : ''}`}>
              {item.name}
            </div>

            {isActive && (
              <div className="orbital__card" onClick={e => e.stopPropagation()}>
               
                <div className="orbital__card-name">{item.name}</div>
                <img src='/proyectoAlKamado/Images/img-asado-prueba.png' />
                <p className="orbital__card-desc">{item.desc}</p>
                <div className="orbital__card-energy">
                  <div className="orbital__card-energy-label">
                    <span>Intensidad</span>
                    <span>{item.energy}%</span>
                  </div>
                  <div className="orbital__card-energy-bar">
                    <div
                      className="orbital__card-energy-fill"
                      style={{ width: `${item.energy}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OrbitalMenu