import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import './KamadoModel.scss'

// ── Constantes de humo ──────────────────────────────────────
const PARTICLE_COUNT = 120
const ORIGIN_Y = 0.2     // altura donde "sale" el humo (tapa del kamado)
const SPREAD_XZ = 0.4    // dispersión radial inicial
const RISE_SPEED = 0.003   // velocidad de subida
const FADE_START = -7    // a qué altura empieza a desvanecerse
const FADE_END = 1.5     // a qué altura desaparece del todo
const DRIFT = 0.0006       // deriva lateral suave


// ── Constantes de chispas ───────────────────────────────────
const EMBER_COUNT = 40
const EMBER_ORIGIN_Y = 0     // salen desde la base/tapa
const EMBER_SPREAD = 0.2      // aparecen concentradas
const EMBER_RISE = 0.008        // más rápidas que el humo
const EMBER_FADE_END = 0.7     // vida corta, se apagan pronto
const EMBER_DRIFT = 0.001      // movimiento errático


// ── Constantes de luz de fuego ──────────────────────────────
const FIRE_LIGHT_Y = 0.3     // p4osición vertical dentro del kamado
const FIRE_LIGHT_BASE_INT = 2  // intensidad base de la llama
const FIRE_LIGHT_FLICKER = 1.8   // cuánto varía la itensidad (flickering)
const FIRE_LIGHT_DISTANCE = 0.8  // alcance de la luz sobre el modelo
const FIRE_COLOR_HOT = new THREE.Color(0xff6010)   // naranja-fuego
const FIRE_COLOR_COOL = new THREE.Color(0xff2200)  // rojo más frío

function SmokeParticles() {
  const meshRef = useRef()

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * SPREAD_XZ,
      y: ORIGIN_Y + Math.random() * (FADE_END - ORIGIN_Y),
      z: (Math.random() - 0.5) * SPREAD_XZ,
      vx: (Math.random() - 0.5) * DRIFT,
      vz: (Math.random() - 0.5) * DRIFT,
      speed: RISE_SPEED * (0.6 + Math.random() * 0.8),
      scale: 0.04 + Math.random() * 0.06,
    }))
  }, [])

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), [])
  const material = useMemo(() =>
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xc8c0b8),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    }), [])

  useFrame(({ camera }) => {
    if (!meshRef.current) return
    particles.forEach((p, i) => {
      const mesh = meshRef.current.children[i]
      if (!mesh) return
      p.y += p.speed
      p.x += p.vx
      p.z += p.vz
      if (p.y > FADE_END) {
        p.y = ORIGIN_Y
        p.x = (Math.random() - 0.5) * SPREAD_XZ
        p.z = (Math.random() - 0.5) * SPREAD_XZ
        p.vx = (Math.random() - 0.5) * DRIFT
        p.vz = (Math.random() - 0.5) * DRIFT
      }
      mesh.quaternion.copy(camera.quaternion)
      mesh.position.set(p.x, p.y, p.z)
      const t = (p.y - ORIGIN_Y) / (FADE_END - ORIGIN_Y)
      const expandedScale = p.scale * (1 + t * 2.5)
      mesh.scale.setScalar(expandedScale)
      let opacity = 0
      if (p.y < FADE_START) {
        opacity = (p.y - ORIGIN_Y) / (FADE_START - ORIGIN_Y)
      } else {
        opacity = 1 - (p.y - FADE_START) / (FADE_END - FADE_START)
      }
      mesh.material.opacity = Math.max(0, Math.min(0.35, opacity * 0.35))
    })
  })

  return (
    <group ref={meshRef}>
      {particles.map((_, i) => (
        <mesh key={i} geometry={geometry} material={material.clone()} />
      ))}
    </group>
  )
}

// ── Ember / Chispas ─────────────────────────────────────────
const EMBER_COLORS = [
  new THREE.Color(0xff6a00), // naranja
  new THREE.Color(0xff3300), // rojo-naranja
  new THREE.Color(0xffaa00), // ámbar
  new THREE.Color(0xff1a00), // rojo vivo
]

function EmberParticles() {
  const meshRef = useRef()

  const embers = useMemo(() => {
    return Array.from({ length: EMBER_COUNT }, () => ({
      x: (Math.random() - 0.5) * EMBER_SPREAD,
      y: EMBER_ORIGIN_Y + Math.random() * (EMBER_FADE_END - EMBER_ORIGIN_Y),
      z: (Math.random() - 0.5) * EMBER_SPREAD,
      vx: (Math.random() - 0.5) * EMBER_DRIFT,
      vz: (Math.random() - 0.5) * EMBER_DRIFT,
      speed: EMBER_RISE * (0.7 + Math.random() * 1.2),
      scale: 0.008 + Math.random() * 0.012,  // muy pequeñas
      colorIndex: Math.floor(Math.random() * EMBER_COLORS.length),
      // oscilación lateral para movimiento errático de chispa
      oscFreq: 2 + Math.random() * 4,
      oscAmp: 0.001 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), [])

  // Un material por color
  const materials = useMemo(() =>
    EMBER_COLORS.map(color =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    ), [])

  useFrame(({ camera, clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    embers.forEach((e, i) => {
      const mesh = meshRef.current.children[i]
      if (!mesh) return

      e.y += e.speed
      // oscilación errática horizontal (simula que la chispa tiembla)
      e.x += e.vx + Math.sin(t * e.oscFreq + e.phase) * e.oscAmp
      e.z += e.vz + Math.cos(t * e.oscFreq + e.phase + 1) * e.oscAmp

      if (e.y > EMBER_FADE_END) {
        e.y = EMBER_ORIGIN_Y
        e.x = (Math.random() - 0.5) * EMBER_SPREAD
        e.z = (Math.random() - 0.5) * EMBER_SPREAD
        e.vx = (Math.random() - 0.5) * EMBER_DRIFT
        e.vz = (Math.random() - 0.5) * EMBER_DRIFT
        e.phase = Math.random() * Math.PI * 2
      }

      mesh.quaternion.copy(camera.quaternion)
      mesh.position.set(e.x, e.y, e.z)
      mesh.scale.setScalar(e.scale)

      // Fade: brillan fuerte al nacer, se apagan al subir
      const progress = (e.y - EMBER_ORIGIN_Y) / (EMBER_FADE_END - EMBER_ORIGIN_Y)
      // pico de brillo al 20% del recorrido, luego se apagan
      const rawOpacity = progress < 0.2
        ? progress / 0.2
        : 1 - (progress - 0.2) / 0.8
      mesh.material.opacity = Math.max(0, Math.min(1, rawOpacity * 0.9))
    })
  })

  return (
    <group ref={meshRef}>
      {embers.map((e, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={materials[e.colorIndex].clone()}
        />
      ))}
    </group>
  )
}

// ── FireLight / Luz interior de fuego ───────────────────────
function FireLight() {
  const lightRef = useRef()
  const light2Ref = useRef()

  // Color interpolado para animar entre naranja y rojo
  const lerpColor = useMemo(() => new THREE.Color(), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (lightRef.current) {
      // Flickering principal: combinación de frecuencias para irregularidad natural
      // (suma de senos a distintas frecuencias = ruido orgánico barato)
      const flicker =
        Math.sin(t * 7.3) * 0.4 +
        Math.sin(t * 13.7) * 0.3 +
        Math.sin(t * 3.1) * 0.3

      // Intensidad oscila alrededor de la base con el flicker
      lightRef.current.intensity = FIRE_LIGHT_BASE_INT + flicker * FIRE_LIGHT_FLICKER

      // Color oscila entre naranja caliente y rojo más frío
      const colorT = (Math.sin(t * 5.2) + 1) / 2  // 0..1
      lerpColor.lerpColors(FIRE_COLOR_COOL, FIRE_COLOR_HOT, colorT)
      lightRef.current.color.copy(lerpColor)

      // Micro-movimiento de posición: la llama "se mueve" levemente
      lightRef.current.position.x = Math.sin(t * 4.1) * 0.04
      lightRef.current.position.z = Math.cos(t * 3.7) * 0.04
    }

    if (light2Ref.current) {
      // Segunda luz desfasada: refuerza el efecto de volumen en el modelo
      // Va en contrafase para que cuando una baja la otra sube levemente
      const flicker2 =
        Math.sin(t * 9.1 + 1.5) * 0.35 +
        Math.sin(t * 6.3 + 0.8) * 0.25

      light2Ref.current.intensity = (FIRE_LIGHT_BASE_INT * 0.5) + flicker2 * (FIRE_LIGHT_FLICKER * 0.6)
    }
  })

  return (
    <>
      {/* Luz principal: naranja-roja desde el centro del kamado */}
      <pointLight
        ref={lightRef}
        position={[0, FIRE_LIGHT_Y, 0]}
        intensity={FIRE_LIGHT_BASE_INT}
        distance={FIRE_LIGHT_DISTANCE}
        decay={2}
        color={FIRE_COLOR_HOT}
      />

      {/* Luz secundaria: más suave, ligeramente desplazada hacia arriba
          para iluminar el borde superior/tapa del kamado */}
      <pointLight
        ref={light2Ref}
        position={[0, FIRE_LIGHT_Y + 0.3, 0]}
        intensity={FIRE_LIGHT_BASE_INT * 0.5}
        distance={FIRE_LIGHT_DISTANCE * 0.7}
        decay={2}
        color="#ff4400"
      />
    </>
  )
}

// ── Model ───────────────────────────────────────────────────
function Model() {
  const { scene } = useGLTF('./kamado-3d.glb')
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15
  })
  return <primitive ref={ref} object={scene} scale={1} position={[0, 0, 0]} />
}

function Fallback() { return null }

// ── KamadoModel ─────────────────────────────────────────────
function KamadoModel() {
  return (
    <div className="kamado-viewer">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={<Fallback />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffddaa" />
          <directionalLight position={[-5, 2, -5]} intensity={0.4} color="#c8410a" />
          <Model />
          <SmokeParticles />
          <EmberParticles />
          {/* Luz animada de fuego interior — flickering orgánico */}
          <FireLight />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={6} blur={2} />
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default KamadoModel