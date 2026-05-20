import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieGrid from '../components/MovieGrid'

function Home() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <Navbar />
      <Hero />
      <MovieGrid />
      <footer className="border-t border-[#1a1a1a] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-[#e50914] font-black text-base" style={{ fontFamily: 'Georgia, serif' }}>CINEVERSE</span>
        <span className="text-gray-700 text-xs">© 2024 CineVerse · HD Movies Free Download</span>
        <div className="flex gap-5">
          <span className="text-gray-700 text-xs cursor-pointer hover:text-gray-500">Privacy</span>
          <span className="text-gray-700 text-xs cursor-pointer hover:text-gray-500">Contact</span>
        </div>
      </footer>
    </div>
  )
}

export default Home