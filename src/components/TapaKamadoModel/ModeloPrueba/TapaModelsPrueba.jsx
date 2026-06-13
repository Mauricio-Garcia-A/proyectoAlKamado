import { useState } from 'react'
import './TapaModeloPrueba.scss'
import TapaKamadoModel2 from './TapaKamadoModel2'

export default function TapaModelsPrueba({ Open=true }) {
  const [isOpen, setIsOpen] = useState(Open)

  return (
    <>
      <div className="container__scene">
        <img src='/proyectoAlKamado/Images/kamado-bg-menu-v2-part2.png' className='image-bg-orbital-part2' />
        <img src='/proyectoAlKamado/Images/kamado-bg-menu-v2.png' className='image-bg-orbital'/>

        <button
          className="container__scene__btn"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? 'Cerrar Tapa' : 'Abrir Tapa'}
        </button>

        <div className="container__scene__tapa">
          <TapaKamadoModel2 l isOpen={isOpen} />
        </div>
      </div>
    </>
  )
}
