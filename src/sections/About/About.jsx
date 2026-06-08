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
            Somo un pequeño enprendimiento especializado en el metodo de copsion ahomado al kamado.
          </p>
          <CircleButton to="/nosotros" text="SABER MAS" />
        </div>
        <div>
          <KamadoModel />

        </div>

      </div>
    </section>
  )
}

export default About