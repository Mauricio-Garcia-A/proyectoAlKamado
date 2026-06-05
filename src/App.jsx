import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import MenuPage from './pages/MenuPage'
import Navbar   from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/alkamado/"     element={<Home />}     />
        <Route path="/alkamado/menu" element={<MenuPage />} />
         <Route path="/"     element={<Home />}     />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App