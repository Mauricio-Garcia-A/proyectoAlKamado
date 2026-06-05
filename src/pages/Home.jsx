import Navbar   from '../components/Navbar/Navbar'
import Hero     from '../sections/Hero/Hero'
import About    from '../sections/About/About'
import Menu     from '../sections/Menu/Menu'
import Process  from '../sections/Process/Process'
import Contact  from '../sections/Contact/Contact'


function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Process />
      <Contact />
    </main>
  )
}

export default Home