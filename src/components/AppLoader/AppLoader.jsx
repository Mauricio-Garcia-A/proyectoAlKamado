import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import LogoLoader from '../LogoLoader/LogoLoader'

// Precargar los modelos a nivel módulo
useGLTF.preload('/3D/kamado-3d.glb')
useGLTF.preload('/3D/kamado-carousel.glb')
useGLTF.preload('/3D/kamado-tapa-1.glb')
useGLTF.preload('/3D/kamado-tapa-2.glb')

const VIDEOS = [
  '/Videos/bg-Hero-2.mp4',
  '/Videos/contact-bg.mp4',
]

function preloadVideo(src) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.src = src
    video.addEventListener('canplaythrough', resolve, { once: true })
    video.addEventListener('error', resolve, { once: true }) // no bloquear si falla
    video.load()
  })
}

function AppLoader({ children }) {
  const [isLeaving, setIsLeaving] = useState(false)
  const [isDone, setIsDone]       = useState(false)

  useEffect(() => {
    const videoPromises = VIDEOS.map(preloadVideo)

    Promise.all(videoPromises).then(() => {
      setIsLeaving(true)
    })
  }, [])

  return (
    <>
      <LogoLoader
        isLeaving={isLeaving}
        onExitComplete={() => setIsDone(true)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ visibility: isDone ? 'visible' : 'hidden' }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default AppLoader