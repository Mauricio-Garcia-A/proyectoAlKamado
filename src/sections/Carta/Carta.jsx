import { useState } from 'react'
import './Carta.scss'
import CircleButton    from '../../components/CircleButton/CircleButton'
import TapaModeloPrueba from '../../components/TapaKamadoModel/ModeloPrueba/TapaModelsPrueba'
import FullscreenModal from '../../components/FullscreenModal/FullscreenModal'
import CartaPage       from '../../pages/CartaPage'

function Carta() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="section-standar carta" id="carta">
        <div className="carta__overlay" />
        <div className="carta__inner">
          <div className="carta__left">
            <p className="section-label">Lo que ofrecemos</p>
            <h2 className="carta__title">LA CARTA</h2>
            <p className="carta__desc">
              Cortes seleccionados, rubs artesanales y entre 6 y 18 horas
              de humo de quebracho.
            </p>
            <CircleButton text="VER\nCARTA" onClick={() => setIsOpen(true)} />
          </div>

          <div className="carta__right">
            <img src='/proyectoAlKamado/Images/carta-portada-front.png' alt="Carta" />
          </div>
        </div>
      </section>

      <FullscreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        layoutId="carta-modal"
      >
        <CartaPage />
      </FullscreenModal>
    </>
  )
}

export default Carta