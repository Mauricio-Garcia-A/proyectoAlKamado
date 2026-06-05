import { useNavigate } from 'react-router-dom'
 import './CircleButton.scss'

// r=45 → circunferencia = 2π×45 ≈ 283
const R   = 45
const CIR = 2 * Math.PI * R

function ExploreButton() {
  const navigate = useNavigate()

  return (
    <button
      className="explore-btn"
      onClick={() => navigate('/menu')}
      aria-label="Ver el menú"
    >
      <div className="explore-btn__inner-ring" />

      <svg className="explore-btn__svg" viewBox="0 0 100 100">
        <circle className="ring-track" cx="50" cy="50" r={R} />
        <circle className="ring-idle"  cx="50" cy="50" r={R} />
        <circle
          className="ring-hover"
          cx="50"
          cy="50"
          r={R}
          style={{ strokeDasharray: CIR, strokeDashoffset: CIR }}
        />
      </svg>

      <span className="explore-btn__text">
        VER EL<br />MENÚ
      </span>
    </button>
  )
}

export default ExploreButton