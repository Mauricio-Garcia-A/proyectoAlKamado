import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import './KamadoModel.scss'

function Model() {
  const { scene } = useGLTF('./kamado-3d.glb')
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  )
}

function Fallback() {
  return null
}

function KamadoModel() {
  return (
    <div className="kamado-viewer">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        //camera={{ position: [0, 2, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={<Fallback />}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            color="#ffddaa"
          />
          <directionalLight
            position={[-5, 2, -5]}
            intensity={0.4}
            color="#c8410a"
          />
          <Model />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={6}
            blur={2}
          />
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