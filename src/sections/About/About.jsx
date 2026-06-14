import './About.scss'
import KamadoModel from '../../components/KamadoModel/KamadoModel'
//import FeatureCarousel from '../../components/FeatureCarousel/FeatureCarousel'
import CircleButton from '../../components/CircleButton/CircleButton'
import FullscreenModal from '../../components/FullscreenModal/FullscreenModal'
import AboutPage from '../../pages/AboutPage'
import { useState } from 'react'

function About() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="section-standar about" id="nosotros">
        <div className="about__overlay" />
        <div className="about__inner">

          <div>
            <p className="section-label">Nuestra historia</p>
            <h2 className="menu__title">QUIENES SOMOS</h2>
            <p className="menu__desc">
              Somo un pequeño enprendimiento especializado en el metodo de copsion ahomado al kamado.
            </p>
            <div className='conteiner_button'> 
              <CircleButton onClick={() => setIsOpen(true)} text="SABER MAS" />
            </div>
          </div>
          <div>
            <KamadoModel />

          </div>

        </div>
      </section>

      <FullscreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        layoutId="about-modal"
      >
        <AboutPage />
      </FullscreenModal>

    </>
  )
}

export default About