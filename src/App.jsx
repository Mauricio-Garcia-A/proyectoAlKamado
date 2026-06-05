import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import MenuPage from './pages/MenuPage'
import Navbar   from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/proyectoAlKamado/"     element={<Home />}     />
        <Route path="/proyectoAlKamado/menu" element={<MenuPage />} />
         <Route path="/"     element={<Home />}     />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App