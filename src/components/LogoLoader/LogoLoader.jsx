import Logo from '../Logo/Logo'
import './LogoLoader.scss'

function LogoLoader({ size = '15rem', duration = 1.2 }) {
  const rings = [
    { scale: 1, speed: 1, reverse: false },
    { scale: 0.8, speed: 0.875, reverse: true },
    { scale: 0.65, speed: 0.75, reverse: false },
  ]

  const ringStyle = (scale, speed, reverse) => ({
    width: `calc(${size} * ${scale})`,
    height: `calc(${size} * ${scale})`,
    borderTopColor: 'rgba(200, 65, 10, 0.25)',
    borderRightColor: 'rgba(200, 65, 10, 0.55)',
    animationDuration: `${duration * speed}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  })

  const logoSize = `calc(${size} * 0.4)`

  return (
    <div className="logo-loader" style={{ width: size, height: size }}>
      {rings.map((r, i) => (
        <div
          key={i}
          className="logo-loader__ring"
          style={ringStyle(r.scale, r.speed, r.reverse)}
        />
      ))}
      <div className="logo-loader__logo" style={{ fontSize: logoSize }}>
        <Logo />
        <div className='contenedor_text_logo'>
          <span>A<span style={{ color: 'var(--ember, #c8410a)' }}>K</span></span>
        </div>
      </div>
    </div>
  )
}

export default LogoLoader