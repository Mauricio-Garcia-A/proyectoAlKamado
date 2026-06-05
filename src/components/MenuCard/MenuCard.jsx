import './MenuCard.scss'

function MenuCard({ name, price, desc, tag }) {
  return (
    <div className="menu-card">
      <div className="menu-card__top">
        <div className="menu-card__name">{name}</div>
        <div className="menu-card__price">{price}</div>
      </div>
      <p className="menu-card__desc">{desc}</p>
      {tag && <span className="menu-card__tag">{tag}</span>}
    </div>
  )
}

export default MenuCard