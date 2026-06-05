import './Process.scss'

const steps = [
  {
    num: '01',
    name: 'Selección',
    desc: 'Solo trabajamos con cortes de primera, directamente de productores locales.'
  },
  {
    num: '02',
    name: 'Condimento',
    desc: 'Rubs artesanales con especias tostadas a mano. Sin conservantes.'
  },
  {
    num: '03',
    name: 'Ahumado',
    desc: 'Quebracho colorado. Temperaturas bajas. Tiempo sin apuro: 6 a 18 horas.'
  },
  {
    num: '04',
    name: 'Servicio',
    desc: 'Cortado al momento. Cada orden sale como si fuera la única del día.'
  },
]

function Process() {
  return (
    <section className="section-standar process" id="proceso">
      <div className="process__inner">
        <div>
          <p className="section-label">Cómo lo hacemos</p>
          <h2 className="process__title">EL<br />PROCESO</h2>
        </div>
        <div className="process__steps">
          {steps.map(step => (
            <div className="step" key={step.num}>
              <div className="step__num">{step.num}</div>
              <div className="step__name">{step.name}</div>
              <p className="step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process