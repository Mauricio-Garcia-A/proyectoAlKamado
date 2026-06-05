import React, { useState, useRef, useEffect } from 'react';
import './ConditionSelector.scss';

// Datos de ejemplo para los modos/condiciones
const CONDITIONS = [
  { id: 'rain', icon: '🌧️', label: 'Lluvia' },
  { id: 'normal', icon: '🌽', label: 'Tu Región' },
  { id: 'sun', icon: '☀️', label: 'Sol' },
];

const ConditionSelector = ({ onChangeCondition }) => {
  const [activeId, setActiveId] = useState('normal');
  const scrollContainerRef = useRef(null);

  // Detecta qué elemento está centrado al hacer scroll/swipe
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    
    let closestId = CONDITIONS[0].id;
    let minDistance = Infinity;

    // Buscamos cuál es el elemento más cercano al centro del contenedor
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestId = CONDITIONS[i].id;
      }
    }

    if (closestId !== activeId) {
      setActiveId(closestId);
      if (onChangeCondition) onChangeCondition(closestId);
    }
  };

  // Centrar el elemento por defecto ('normal') al montar el componente
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const defaultIndex = CONDITIONS.findIndex(c => c.id === 'normal');
      const defaultChild = container.children[defaultIndex];
      if (defaultChild) {
        container.scrollLeft = defaultChild.offsetLeft - (container.offsetWidth / 2) + (defaultChild.offsetWidth / 2);
      }
    }
  }, []);

  return (
    <div className="selector-container">
      <span className="selector-title">SELECT YOUR CONDITION</span>
      
      {/* Línea horizontal de guía de fondo */}
      <div className="selection-line"></div>

      {/* Contenedor scrolleable */}
      <div 
        className="carousel-track" 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
      >
        {CONDITIONS.map((condition) => (
          <div 
            key={condition.id} 
            className={`carousel-item ${activeId === condition.id ? 'active' : ''}`}
          >
            <div className="icon-circle">
              {/* Aquí puedes reemplazar por tus componentes de iconos (SVG o FontAwesome) */}
              <span className="icon">{condition.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionSelector;