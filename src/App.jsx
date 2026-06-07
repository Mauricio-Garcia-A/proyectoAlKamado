import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import MenuPage from './pages/MenuPage'
import Navbar   from './components/Navbar/Navbar'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/proyectoAlKamado/"     element={<Home />}     />
        <Route path="/proyectoAlKamado/menu" element={<MenuPage />} />
        <Route path="/proyectoAlKamado/nosotros" element={<AboutPage />} />

        <Route path="/"     element={<Home />}     />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/nosotros" element={<AboutPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App