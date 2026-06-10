// src/components/CartaBook/paginas/PaginaSeccion.jsx
export default function PaginaSeccion({ section, pageNumber }) {
  return (
    <div className="pagina-seccion">
      <header className="pagina-seccion__header">
        <h2 className="pagina-seccion__categoria">{section.category}</h2>
      </header>

      <article className="pagina-seccion__article">
        <ul className="pagina-seccion__items">
          {section.items.map((item, i) => (
            <li key={i} className="pagina-seccion__item">
              <div className="pagina-seccion__item-header">
                <span className="pagina-seccion__item-nombre">{item.name}</span>
                <span className="pagina-seccion__item-dots" />
                <span className="pagina-seccion__item-precio">{item.price}</span>
              </div>
              <p className="pagina-seccion__item-desc">{item.description}</p>
            </li>
          ))}
        </ul>
      </article>

      <footer className="pagina-seccion__footer">
        <p>{pageNumber}</p>
      </footer>
    </div>
  );
}