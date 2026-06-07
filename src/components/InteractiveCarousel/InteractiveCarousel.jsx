import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import './InteractiveCarousel.scss'

const slides = [
  {
    num: '01',
    title: 'Fuego de\nQuebracho',
    desc: 'Usamos exclusivamente leña de quebracho colorado, la madera más densa de Argentina. Arde lento, da calor parejo y un humo que perfuma la carne desde adentro.',
  },
  {
    num: '02',
    title: 'Cortes de\nPrimera',
    desc: 'Seleccionamos cada pieza directamente con productores locales. Solo trabajamos con animales de pastoreo, criados sin apuro, igual que nuestro proceso.',
  },
  {
    num: '03',
    title: 'Rubs\nArtesanales',
    desc: 'Nuestras mezclas de especias se tuestan y muelen a mano cada semana. Sin conservantes, sin mezclas industriales. Solo sabor real.',
  },
  {
    num: '04',
    title: 'Tiempo Sin\nApuro',
    desc: 'Entre 6 y 18 horas de cocción a baja temperatura. No hay atajos. La paciencia es el ingrediente principal de cada corte que servimos.',
  },
]

// ── NODOS ORBITALES ──
function OrbitalRing({ current, onSelect }) {
  const groupRef = useRef()
  const nodesRef = useRef([])
  const { camera } = useThree()
  const total = slides.length
  // OrbitalRing - RADIUS
  const RADIUS = 2.5

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.003

    // mouse tracking sutil
    const mx = state.mouse.x * 0.15
    const my = state.mouse.y * 0.08
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.05
  })

  return (

    // OrbitalRing - posición vertical del anillo
    // en el group del anillo agregá:
    <group ref={groupRef} position={[0, 0.25, 0]}>
      {/* anillo punteado */}
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = (i / 80) * Math.PI * 2
        const x = Math.cos(angle) * RADIUS
        const z = Math.sin(angle) * RADIUS
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#8a7d72" opacity={0.4} transparent />
          </mesh>
        )
      })}

      {/* nodos interactivos */}
      {slides.map((_, i) => {
        const angle = (i / total) * Math.PI * 2
        const x = Math.cos(angle) * RADIUS
        const z = Math.sin(angle) * RADIUS
        const isActive = current === i

        return (
          <group key={i} position={[x, 0, z]}>
            {/* anillo exterior del nodo */}
            <mesh
              ref={el => nodesRef.current[i] = el}
              onClick={() => onSelect(i)}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <torusGeometry args={[0.12, 0.008, 8, 32]} />
              <meshBasicMaterial
                color={isActive ? '#e8ddd0' : '#8a7d72'}
                opacity={isActive ? 1 : 0.5}
                transparent
              />
            </mesh>
            {/* punto central */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.045 : 0.025, 12, 12]} />
              <meshBasicMaterial
                color={isActive ? '#e8ddd0' : '#8a7d72'}
                opacity={isActive ? 1 : 0.4}
                transparent
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// ── MODELO 3D ──
function KamadoModel({ current }) {
  const { scene } = useGLTF('./kamado-3d.glb')
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
      y: ref.current.rotation.y + Math.PI * 0.25,
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
          {slides.map((_, i) => (
            <button
              key={i}
              className={`icarousel__nav-btn ${current === i ? 'icarousel__nav-btn--active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>


      <div className="icarousel__content">
        <div className="icarousel__slide" ref={contentRef}>
          <p className="icarousel__slide-num">{slide.num}</p>
          <h3 className="icarousel__slide-title">
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