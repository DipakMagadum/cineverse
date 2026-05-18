import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieGrid from '../components/MovieGrid'

function Home() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }} className="text-white">
      <Navbar />
      <Hero />
      <MovieGrid />
    </div>
  )
}

export default Home