import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Horror', 'Sci-Fi']
const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi']

function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [genre, setGenre] = useState('All')
  const [language, setLanguage] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const params = {}
        if (genre !== 'All') params.genre = genre
        if (language !== 'All') params.language = language
        if (search) params.search = search
        const { data } = await axios.get('http://localhost:5000/api/movies', { params })
        setMovies(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [genre, language, search])

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">🎬 All Movies</h1>

        {/* Search */}
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-3 w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent outline-none text-white text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>🔍</span>
        </div>

        {/* Genre Filter */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Genre:</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button key={g}
                onClick={() => setGenre(g)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  genre === g ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">Language:</p>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <button key={l}
                onClick={() => setLanguage(l)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  language === l ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400">No movies found!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie._id}
                onClick={() => navigate(`/movie/${movie._id}`)}
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-gray-800 h-48 relative flex items-center justify-center">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🎬</span>
                  )}
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">HD</span>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{movie.genre?.[0]} • {movie.releaseYear}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-yellow-400 text-xs">⭐ {movie.rating?.toFixed(1) || 'N/A'}</span>
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Download</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Movies