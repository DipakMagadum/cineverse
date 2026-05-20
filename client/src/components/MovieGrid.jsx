import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function MovieGrid() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeGenre, setActiveGenre] = useState('All')
  const navigate = useNavigate()
  const genres = ['All', 'Bollywood', 'Hollywood', 'South', 'Action', 'Drama', 'Comedy', 'Thriller']

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await API.get('/api/movies')
        setMovies(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const filtered = activeGenre === 'All' ? movies : movies.filter(m => m.genre?.some(g => g.toLowerCase().includes(activeGenre.toLowerCase())))

  return (
    <div className="bg-[#0f0f0f] px-6 md:px-10 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-lg"><span className="text-[#e50914]">Trending</span> This Week</h2>
        <span onClick={() => navigate('/movies')} className="text-[#e50914] text-xs font-semibold cursor-pointer hover:underline">View All →</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {genres.map(g => (
          <button key={g} onClick={() => setActiveGenre(g)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${activeGenre === g ? 'bg-[#e50914] text-white border-[#e50914]' : 'bg-[#141414] text-gray-500 border-[#2a2a2a] hover:border-[#444]'}`}>
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#141414] rounded-lg overflow-hidden animate-pulse">
              <div className="bg-[#1f1f1f] h-48" />
              <div className="p-3"><div className="bg-[#1f1f1f] h-3 rounded mb-2" /><div className="bg-[#1f1f1f] h-2 rounded w-2/3" /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-sm">No movies yet — Add from Admin Panel!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(movie => (
            <div key={movie._id} onClick={() => navigate(`/movie/${movie._id}`)}
              className="bg-[#141414] border border-[#1f1f1f] hover:border-[#333] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all group">
              <div className="relative" style={{ aspectRatio: '2/3' }}>
                {movie.posterUrl
                  ? <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-4xl">🎬</div>
                }
                <span className="absolute top-2 left-2 bg-[#e50914] text-white text-xs px-1.5 py-0.5 rounded font-bold">HD</span>
                {movie.isTrending && <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">🔥</span>}
              </div>
              <div className="p-2.5">
                <h3 className="text-white text-xs font-bold truncate mb-1">{movie.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs">{movie.genre?.[0]}</span>
                  <span className="bg-[#1f1f1f] text-gray-500 text-xs px-1.5 py-0.5 rounded">{movie.language}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieGrid