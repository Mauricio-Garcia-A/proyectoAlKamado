import { useNavigate } from 'react-router-dom'
import './BackButton.scss'

function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
      aria-label="Volver al inicio"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="2" y1="2" x2="14" y2="14" />
        <line x1="14" y1="2" x2="2" y2="14" />
      </svg>
    </button>
  )
}

export default BackButton