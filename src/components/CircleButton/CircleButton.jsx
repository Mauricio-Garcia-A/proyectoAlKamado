import { useNavigate } from 'react-router-dom'
import './CircleButton.scss'

const R   = 45
const CIR = 2 * Math.PI * R

function ExploreButton() {
  const navigate = useNavigate()

  return (
    <button
      className="explore-btn"
      onClick={() => navigate('/menu')}
      aria-label="Ver menú"
    >
      <div className="explore-btn__inner-ring" />

      <svg className="explore-btn__svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="idleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#F5F0E8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0"   />
          </linearGradient>

          <mask id="idleMask">
            <circle
              cx="50" cy="50" r={R}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="150 208"
              strokeDashoffset="0"
            />
          </mask>
        </defs>

        <circle className="ring-track" cx="50" cy="50" r={R} />

        <rect
          x="0" y="0" width="100" height="100"
          fill="url(#idleGradient)"
          mask="url(#idleMask)"
          className="ring-idle-rect"
        />

        <circle
          className="ring-hover"
          cx="50" cy="50" r={R}
          style={{ strokeDasharray: CIR, strokeDashoffset: CIR }}
        />
      </svg>

      <span className="explore-btn__text">
        VER<br />MENÚ
      </span>
    </button>
  )
}

export default ExploreButton