import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Billboard } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import './InteractiveCarousel.scss'
import IconVacuno from '../Icons/IconVacuno'
import IconChef from '../Icons/IconChef'
import IconKmd from '../Icons/IconKmd'
import IconAstillas from '../Icons/IconAstillas'
import IconCarnes from '../Icons/IconCarnes'


const slides = [
  {
    num: '01',
    icon: (
      <IconChef />
    ),
    title: 'Sabores unicos',
    desc: 'En ALKAMADO somos especialistas con años de experiencia en el arte del ahumado. Dominamos la cocción en el kamado para lograr sabores y aromas únicos que no vas a conseguir con ningún otro método.',
    image: './Images/s1-slide-1.png',
  },
  {
    num: '02',
    icon: (
      <IconKmd />
    ),
    title: 'Que es un Kamado',
    desc: 'Es un asador de origen Japonés, con la capacidad de absorción, retención y emisión de calor, controlada con presicion que lo vuelve muy versátil para asar, ahumar, hornear o grillar alimentos.',
    image: './Images/s1-slide-2.png',
  },
  {
    num: '03',
    icon: (
      <IconCarnes />
    ),
    title: 'Opciones de Ahumados',
    desc: 'Nuestra propuesta abarca desde cortes vacunos, porcinos y de ave, hasta opciones más sutiles como pescados selectos, vegetales asados y pizzas artesanales.',
    image: './Images/s1-slide-3.png',
  },
  {
    num: '04',
    icon: (
      <IconAstillas />
    ),
    title: 'Tipo de astillas',
    desc: 'Utilizamos diferentes tipos de astillas dependiendo del corte y el tipo de carne seleccionados, controlando la intensidad del ahumado para no invadir la delicadeza de su sabor. El tipo de astilla define el carácter de cada plato, aportándole aromas y sabores únicos.',
    image: './Images/s1-slide-4.png',
  },

]


// ── NODOS ORBITALES ──
function OrbitalRing({ current, onSelect }) {
  const groupRef = useRef()
  const nodesRef = useRef([])
  const scalesRef = useRef(slides.map(() => 1))
  const pulseRef = useRef(slides.map(() => 0))
  const [hovered, setHovered] = useState(-1)
  const total = slides.length
  const RADIUS = 2.5

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.003
    const my = state.mouse.y * 0.08
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.05

    slides.forEach((_, i) => {
      const isActive = current === i
      const isHovered = hovered === i
      const target = isActive ? 1.4 : isHovered ? 1.15 : 1
      scalesRef.current[i] += (target - scalesRef.current[i]) * 0.1

      if (nodesRef.current[i]) {
        const s = scalesRef.current[i]
        nodesRef.current[i].scale.set(s, s, s)
      }

      if (isActive) {
        pulseRef.current[i] = (pulseRef.current[i] + delta * 0.8) % 1
      } else {
        pulseRef.current[i] = 0
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.25, 0]} rotation={[3.5, 3.5, 0]}>
      {/* anillo punteado */}
      {Array.from({ length: 100 }).map((_, i) => {
        const angle = (i / 100) * Math.PI * 2
        const x = Math.cos(angle) * RADIUS
        const z = Math.sin(angle) * RADIUS
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#8a7d72" opacity={0.25} transparent />
          </mesh>
        )
      })}

      {/* nodos */}
      {slides.map((_, i) => {
        const angle = (i / total) * Math.PI * 2
        const x = Math.cos(angle) * RADIUS
        const z = Math.sin(angle) * RADIUS
        const isActive = current === i
        const isHover = hovered === i

        const nodeInner = (
          <group ref={el => nodesRef.current[i] = el}>
            {isActive && <PulseRing offset={0} />}
            {isActive && <PulseRing offset={0.5} />}

            <mesh>
              <torusGeometry args={[0.12, 0.008, 8, 32]} />
              <meshBasicMaterial
                color={isActive || isHover ? '#e8ddd0' : '#8a7d72'}
                opacity={isActive ? 1 : isHover ? 0.8 : 0.5}
                transparent
              />
            </mesh>

            <mesh>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial
                color={isActive || isHover ? '#e8ddd0' : '#8a7d72'}
                opacity={isActive ? 1 : isHover ? 0.7 : 0.4}
                transparent
              />
            </mesh>

            <mesh
              onClick={(e) => { e.stopPropagation(); onSelect(i) }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(i); document.body.style.cursor = 'pointer' }}
              onPointerOut={(e) => { e.stopPropagation(); setHovered(-1); document.body.style.cursor = 'default' }}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </group>
        )

        return (
          <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            {isActive
              ? <Billboard>{nodeInner}</Billboard>
              : nodeInner
            }
          </group>
        )
      })}
    </group>
  )
}



// ── PULSO RADAR ──
function PulseRing({ offset }) {
  const ref = useRef()
  const progress = useRef(offset)

  useFrame((_, delta) => {
    if (!ref.current) return
    progress.current = (progress.current + delta * 0.6) % 1

    const scale = 0.12 + progress.current * 0.2
    const opacity = (1 - progress.current) * 0.4

    ref.current.scale.set(scale, scale, scale)
    ref.current.material.opacity = opacity
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.015, 8, 32]} />
      <meshBasicMaterial
        color="#e8ddd0"
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}
// ── MODELO 3D ──
function KamadoModel({ current }) {
  const { scene } = useGLTF('./3D/kamado-carousel.glb')
  const ref = useRef()
  const prevRef = useRef(current)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
    const mx = state.mouse.x * 0.1
    const my = state.mouse.y * 0.1
    ref.current.rotation.x += (my - ref.current.rotation.x) * 0.05
  })

  useEffect(() => {
    if (!ref.current || current === prevRef.current) return
    prevRef.current = current

    // animación de cámara al cambiar slide
    gsap.to(ref.current.rotation, {
      // y: ref.current.rotation.y + Math.PI * 0.25,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [current])

  return (
    // KamadoModel

    <primitive
      ref={ref}
      object={scene}
      scale={2}
      position={[0, 0, 0]}
    />
  )
}

// ── LUCES ──
function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffddaa" />
      <directionalLight position={[-5, 2, -5]} intensity={0.4} color="#c8410a" />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#c8410a" />
    </>
  )
}

// ── COMPONENTE PRINCIPAL ──
function InteractiveCarousel() {
  const [current, setCurrent] = useState(0)
  const contentRef = useRef()


  const handleSelect = (index) => {
    if (index === current) return

    // fade out
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        // fade in
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        )
      }
    })
  }

  const slide = slides[current]


  useEffect(() => {
    const timer = setInterval(() => {
      handleSelect((current + 1) % slides.length)
    }, 8000) // cada 4 segundos

    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="icarousel">
      <div className='container-controsls'>
        <Canvas
          className="icarousel__canvas"
          camera={{ position: [0, 2, 10], fov: 25 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Lights />
          <KamadoModel current={current} />
          <OrbitalRing current={current} onSelect={handleSelect} />
        </Canvas>

        <div className="icarousel__nav">
          {slides.map((item, i) => (
            <button
              key={i}
              className={`icarousel__nav-btn ${current === i ? 'icarousel__nav-btn--active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              {item.icon}
            </button>
          ))}
        </div>

      </div>


      <div className="icarousel__content">
        <div className="icarousel__slide" ref={contentRef}>
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
      </div>
    </div>
  )
}

export default InteractiveCarousel