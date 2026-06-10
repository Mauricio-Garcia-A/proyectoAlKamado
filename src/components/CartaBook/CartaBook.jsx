// src/components/CartaBook/CartaBook.jsx
import { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './CartaBook.scss';
import { menuSections } from './menuData';
import PaginaPortada from './paginas/PaginaPortada';
import PaginaPortadaBack from './paginas/PaginaPortadaBack';
import PaginaContraPortadaBack from './paginas/PaginaContraPortadaBack';

import PaginaContraPortada from './paginas/PaginaContraPortada';
import PaginaSeccion from './paginas/PaginaSeccion';

// ── Dimensiones base del libro ───────────────────────────
const BOOK_RATIO = 380 / 520; // ancho / alto

function useBookSize() {
  const [size, setSize] = useState({ width: 380, height: 520 });

  useEffect(() => {
    function calculate() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isPortrait = vw < 768;

      // En portrait mostramos una sola página: máx 90vw
      // En landscape mostramos doble página: cada hoja es ~40vw
      const maxW = isPortrait
        ? Math.min(vw * 0.88, 420)
        : Math.min(vw * 0.42, 500);

      const maxH = vh * 0.72;
      const heightFromWidth = maxW / BOOK_RATIO;
      const height = Math.min(heightFromWidth, maxH);
      const width = height * BOOK_RATIO;

      setSize({ width: Math.floor(width), height: Math.floor(height) });
    }

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  return size;
}

export default function CartaBook() {
  const book = useRef(null);
  const { width, height } = useBookSize();
  const isPortrait = width < 400;

  const goToPrev = () => book.current?.pageFlip().flipPrev();
  const goToNext = () => book.current?.pageFlip().flipNext();

  return (
    <>
      <div className="carta-container">
        <HTMLFlipBook
          key={`${width}x${height}`} // re-monta si cambia el tamaño
          ref={book}
          width={width}
          height={height}
          size="fixed"
          minWidth={240}
          maxWidth={500}
          minHeight={320}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={isPortrait}
          className="carta-libro"
        >
          {/* Portada */}
          <div className="page page--cover">
            <PaginaPortada />
          </div>
          {/* Portada */}
          <div className="page page--cover">
            <PaginaPortadaBack />
          </div>
          {/* Páginas de secciones */}
          {menuSections.map((section, index) => (
            <div key={section.id} className="page">
              <PaginaSeccion section={section} pageNumber={index + 1} />
            </div>
          ))}

      
           {/* Contraportada */}
          <div className="page page--cover">
            <PaginaContraPortada />
          </div>
            {/* Contraportada back */}
          <div className="page page--cover">
            <PaginaContraPortadaBack/>
          </div>
        </HTMLFlipBook>
      </div>

      <div className="carta-controles">
        <button
          className="carta-controles__btn"
          onClick={goToPrev}
          aria-label="Página anterior"
        >
          &#8592;
        </button>
        <button
          className="carta-controles__btn"
          onClick={goToNext}
          aria-label="Página siguiente"
        >
          &#8594;
        </button>
      </div>
    </>
  );
}