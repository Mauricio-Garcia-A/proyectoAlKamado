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
            <h2 className="menu__title">Nuestros Ahumados</h2>
            <p className="menu__desc">
              No solo ofrecemos una cuidada selección de cortes vacunos, porcinos y aves, sino también una nueva experiencia de sabor, donde el humo del kamado no es un condimento más, sino el alma del plato. Descubrí sabores profundos, texturas increíbles y aromas únicos.</p>
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