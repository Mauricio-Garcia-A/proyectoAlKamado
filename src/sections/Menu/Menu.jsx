import { useState } from 'react'
import './Menu.scss'
import CircleButton from '../../components/CircleButton/CircleButton'
import TapaModeloPrueba from '../../components/TapaKamadoModel/ModeloPrueba/TapaModelsPrueba'
import FullscreenModal from '../../components/FullscreenModal/FullscreenModal'
import MenuPage from '../../pages/MenuPage'

function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="section-standar menu" id="menu">
        <div className="menu__overlay" />
        <div className="menu__inner">
          <div className="menu__left">
            <p className="section-label">Lo que hacemos</p>
            <h2 className="menu__title">EL MENÚ</h2>
            <p className="menu__desc">
              Cortes seleccionados, rubs artesanales y entre 6 y 18 horas
              de humo de quebracho. Cada plato es el resultado de un proceso
              sin atajos.
            </p>
            <div className='conteiner_button'>
              <CircleButton text="VER\nMENÚ" onClick={() => setIsOpen(true)} />
            </div>
          </div>

          <div className="menu__right">
            <TapaModeloPrueba Open={false} />
          </div>
        </div>
      </section>

      <FullscreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        layoutId="menu-modal"
      >
        <MenuPage />
      </FullscreenModal>
    </>
  )
}

export default Menu