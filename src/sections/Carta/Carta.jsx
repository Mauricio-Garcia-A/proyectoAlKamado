import './Carta.scss'
import CircleButton from '../../components/CircleButton/CircleButton'
import TapaModeloPrueba from '../../components/TapaKamadoModel/ModeloPrueba/TapaModelsPrueba'

function Carta() {
  return (
    <section className="section-standar carta" id="carta">
      <div className="carta__inner">
        <div className="carta__left">
          <p className="section-label">Lo que ofrecemos</p>
          <h2 className="carta__title">LA CARTA</h2>
          <p className="carta__desc">
            Cortes seleccionados, rubs artesanales y entre 6 y 18 horas
            de humo de quebracho.
          </p>
          <CircleButton to="/carta" text="VER CARTA" />

        </div>

        <div className="carta__right">
          <img src='/proyectoAlKamado/Images/carta-portada-front.png' />
        </div>
      </div>
    </section>
  )
}

export default Carta