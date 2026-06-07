import './About.scss'
import KamadoModel from '../../components/KamadoModel/KamadoModel'
//import FeatureCarousel from '../../components/FeatureCarousel/FeatureCarousel'
import CircleButton from '../../components/CircleButton/CircleButton'

function About() {
  return (
    <section className="section-standar about" id="nosotros">
      <div className="about__inner">

        <div>
          <p className="section-label">Nuestra historia</p>
          <h2 className="menu__title">QUIENES SOMOS</h2>
          <p className="menu__desc">
            Cortes seleccionados, rubs artesanales y entre 6 y 18 horas
            de humo de quebracho.
          </p>
          <CircleButton to="/nosotros" text="VER MAS" />
        </div>
        <div>
          <KamadoModel />

        </div>

      </div>
    </section>
  )
}

export default About