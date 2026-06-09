import Navbar   from '../components/Navbar/Navbar'
import Hero     from '../sections/Hero/Hero'
import About    from '../sections/About/About'
import Menu     from '../sections/Menu/Menu'
import Process  from '../sections/Process/Process'
import Contact  from '../sections/Contact/Contact'
import Carta     from '../sections/Carta/Carta'


function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Carta />
        <Process />
        <Contact />
      </main>
    </>
    
  )
}

export default Home