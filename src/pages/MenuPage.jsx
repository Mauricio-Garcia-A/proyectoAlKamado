import { useState } from 'react'
import CategorySelector from '../components/CategorySelector/CategorySelector'
import OrbitalMenu      from '../components/OrbitalMenu/OrbitalMenu'

const allItems = [
  { id: 1,  name: 'Brisket',      price: '$8.500',  desc: 'Pecho vacuno ahumado 14 horas. Corteza negra, centro rosado.',            cat: 'vacuno', tag: 'ESTRELLA', energy: 100 },
  { id: 2,  name: 'Short Ribs',   price: '$7.200',  desc: 'Asado de tira grueso con 10 horas de humo. Se cae del hueso.',            cat: 'vacuno', tag: 'CLÁSICO',  energy: 85  },
  { id: 3,  name: 'Pulled Beef',  price: '$6.800',  desc: 'Paleta deshilachada, 12 horas lento. Ideal para sándwich.',               cat: 'vacuno', tag: '',         energy: 75  },
  { id: 4,  name: 'Ribs Cerdo',   price: '$6.200',  desc: 'Costillitas baby back lacadas con glaze de miel y chipotle.',             cat: 'cerdo',  tag: 'FAVORITO', energy: 90  },
  { id: 5,  name: 'Pulled Pork',  price: '$5.900',  desc: 'Paleta de cerdo 14 horas. Dulce, ahumado y brutal.',                      cat: 'cerdo',  tag: '',         energy: 70  },
  { id: 6,  name: 'Panceta',      price: '$5.400',  desc: 'Piel crocante, interior jugoso con perfume de algarrobo.',                cat: 'cerdo',  tag: '',         energy: 65  },
  { id: 7,  name: 'Salmón',       price: '$9.800',  desc: 'Salmón atlántico con eneldo, limón y 6 horas de humo frío.',             cat: 'otros',  tag: 'ESPECIAL', energy: 80  },
  { id: 8,  name: 'Pollo Entero', price: '$4.500',  desc: 'Pollo de campo spatchcocked, ahumado con madera de manzano.',            cat: 'otros',  tag: '',         energy: 60  },
  { id: 9,  name: 'Combo Mixto',  price: '$14.000', desc: 'Brisket + Ribs + Pulled Pork para 3 personas. La experiencia completa.', cat: 'otros',  tag: 'PARA 3',   energy: 95  },
]

function MenuPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? allItems
    : allItems.filter(i => i.cat === active)

  return (
    <main className="menu-page">
      <OrbitalMenu items={filtered} />
      <CategorySelector active={active} onChange={setActive} />

    </main>
  )
}

export default MenuPage