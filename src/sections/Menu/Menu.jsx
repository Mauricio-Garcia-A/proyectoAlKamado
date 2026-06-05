import './Menu.scss'
import CircleButton from '../../components/CircleButton/CircleButton'

function Menu() {
  return (
    <section className="section-standar menu" id="menu">
      <div className="menu__inner">
        <div className="menu__left">
          <p className="section-label">Lo que hacemos</p>
          <h2 className="menu__title">EL<br />MENÚ</h2>
          <p className="menu__desc">
            Cortes seleccionados, rubs artesanales y entre 6 y 18 horas
            de humo de quebracho. Cada plato es el resultado de un proceso
            sin atajos.
          </p>
        </div>
        <div className="menu__right">
          <CircleButton />
        </div>
      </div>
    </section>
  )
}

export default Menu