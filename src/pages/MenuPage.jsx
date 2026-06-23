import { useState } from 'react'
import CategorySelector from '../components/CategorySelector/CategorySelector'
import OrbitalMenu from '../components/OrbitalMenu/OrbitalMenu'

const allItems = [
  { id: 1, name: 'Asado Americano-Banderita', price: '$00.00', desc: 'Pecho vacuno ahumado 14 horas. Corteza negra, centro rosado.', cat: 'vacuno', tag: 'ESTRELLA', energy: 100 },
  { id: 2, name: 'Entraña', price: '$00.00', desc: 'Asado de tira grueso con 10 horas de humo. Se cae del hueso.', cat: 'vacuno', tag: 'CLÁSICO', energy: 85 },
  { id: 3, name: 'Bife De Chorizo', price: '$00.00', desc: 'Paleta deshilachada, 12 horas lento. Ideal para sándwich.', cat: 'vacuno', tag: '', energy: 75 },
  { id: 4, name: 'Vacio', price: '$00.00', desc: 'Costillitas baby back lacadas con glaze de miel y chipotle.', cat: 'vacuno', tag: 'FAVORITO', energy: 90 },
  { id: 5, name: 'Tapa', price: '$00.00', desc: 'Paleta de cerdo 14 horas. Dulce, ahumado y brutal.', cat: 'vacuno', tag: '', energy: 70 },
  { id: 6, name: 'Lomo', price: '$00.00', desc: 'Salmón atlántico con eneldo, limón y 6 horas de humo frío.', cat: 'vacuno', tag: 'ESPECIAL', energy: 80 },
  { id: 7, name: 'Matambre', price: '$00.00', desc: 'Piel crocante, interior jugoso con perfume de algarrobo.', cat: 'vacuno', tag: '', energy: 65 },
  
  { id: 8, name: 'Pechito Rif', price: '$00.00', desc: 'Salmón atlántico con eneldo, limón y 6 horas de humo frío.', cat: 'cerdo', tag: 'ESPECIAL', energy: 80 },
  { id: 9, name: 'Bondiola', price: '$00.00', desc: 'Pollo de campo spatchcocked, ahumado con madera de manzano.', cat: 'cerdo', tag: '', energy: 60 },
  { id: 10, name: 'Matambrillo', price: '$00.00', desc: '', cat: 'cerdo', tag: '', energy: 95 },
  { id: 11, name: 'Carre', price: '$00.00', desc: '', cat: 'cerdo', tag: '', energy: 95 },
  { id: 12, name: 'Costillas', price: '$00.00', desc: '', cat: 'cerdo', tag: '', energy: 95 },
  { id: 13, name: 'Solomillo', price: '$00.00', desc: '', cat: 'cerdo', tag: '', energy: 95 },
  
  { id: 14, name: 'Pollo Entero', price: '$00.00', desc: '', cat: 'pollo', tag: '', energy: 95 },
  { id: 15, name: 'Pechuga', price: '$00.00', desc: '', cat: 'pollo', tag: '', energy: 95 },
  { id: 16, name: 'Pata y Muslo', price: '$00.00', desc: '', cat: 'pollo', tag: '', energy: 95 },
  
  { id: 17, name: 'Trucha', price: '$00.00', desc: '', cat: 'pescado', tag: '', energy: 95 },
  { id: 18, name: 'Merluza', price: '$00.00', desc: '', cat: 'pescado', tag: '', energy: 95 },
  { id: 19, name: 'Salmon', price: '$00.00', desc: '', cat: 'pescado', tag: '', energy: 95 },
  { id: 20, name: 'Calamar', price: '$00.00', desc: '', cat: 'pescado', tag: '', energy: 95 },

  { id: 21, name: 'Pizza', price: '$00.00', desc: '', cat: 'otros', tag: '', energy: 95 },
  { id: 22, name: 'Haburgesas', price: '$00.00', desc: '', cat: 'otros', tag: '', energy: 95 },
  { id: 23, name: 'Tacos', price: '$00.00', desc: '', cat: 'otros', tag: '', energy: 95 },
  { id: 24, name: 'Choripan', price: '$00.00', desc: '', cat: 'otros', tag: '', energy: 95 },

]

function MenuPage() {
  const [active, setActive] = useState('vacuno')

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