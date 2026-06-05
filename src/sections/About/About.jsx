import './About.scss'
import KamadoModel from '../../components/KamadoModel/KamadoModel'
import FeatureCarousel from '../../components/FeatureCarousel/FeatureCarousel'

function About() {
  return (
    <section className="section-standar about" id="nosotros">
      <div className="about__inner">
        <div>
          <p className="section-label">Nuestra historia</p>
          <FeatureCarousel />
        </div>
        <div>
          <KamadoModel />

        </div>
        
      </div>
    </section>
  )
}

export default About