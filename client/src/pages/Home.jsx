import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieGrid from '../components/MovieGrid'

function Home() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      <Hero />
      <MovieGrid />
    </div>
  )
}

export default Home