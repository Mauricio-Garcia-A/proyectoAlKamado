import { useState } from 'react'
import  './TapaModeloPrueba.scss'
import TapaKamadoModel from '../TapaKamadoModel'

export default function TapaModelsPrueba() {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="container__scene">
        <button
          className="container__scene__btn"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? 'Cerrar Tapa' : 'Abrir Tapa'}
        </button>
        <div className="container__scene__tapa">
          <TapaKamadoModel l isOpen={isOpen} />
        </div>
      </div>
    </>
  )
}
