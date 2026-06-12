import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame }            from '@react-three/fiber'
import { useGLTF, Environment }        from '@react-three/drei'
import gsap                            from 'gsap'
import './TapaKamadoModel.scss'

function Model({ isOpen }) {
  const { scene } = useGLTF('./3D/kamado-tapa-2.glb')
  const pivotRef   = useRef()

  useFrame((state) => {
    if (!pivotRef.current || isOpen) return
    //const my = state.mouse.y * 0.05
    //pivotRef.current.rotation.x += (my - pivotRef.current.rotation.x) * 0.03
  })

  useEffect(() => {
    if (!pivotRef.current) return
    gsap.to(pivotRef.current.rotation, {
      x:        isOpen ? -0.3 : 1.1,
      duration: 1.5,
      ease:     isOpen ? 'power2.out' : 'power2.inOut',
    })
  }, [isOpen])

  return (
    <group ref={pivotRef}>
      <primitive
        object={scene}
        scale={2.56}
        position={[0, 0, 0]}
      />
    </group>
  )
}

function TapaKamadoModel({ isOpen }) {
  return (
    <div className="tapa-viewer">
      {/*
        <img src='/proyectoAlKamado/Images/kamado-bg-menu-v2.png' className='image-bg-orbital'/>
      */}
      <Canvas
        camera={{ position: [0,1, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]}   intensity={1.2} color="#ffddaa" />
          <directionalLight position={[-5, 2, -5]}  intensity={0.4} color="#c8410a" />
          <Environment preset="sunset" />
          <Model isOpen={isOpen} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default TapaKamadoModel