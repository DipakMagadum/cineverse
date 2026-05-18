import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MovieGrid() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/movies')
        setMovies(data)
      } catch (err) {
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) return (
    <div className="px-10 py-8">
      <p className="text-gray-400">Loading movies...</p>
    </div>
  )

  return (
    <div className="px-10 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">🎬 Latest Movies</h2>
      
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies yet — Add from Admin Panel!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div key={movie._id}
              onClick={() => navigate(`/movie/${movie._id}`)}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              {/* Poster */}
              <div className="bg-gray-800 h-48 flex items-center justify-center relative">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🎬</span>
                )}
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  HD
                </span>
              </div>
              {/* Info */}
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-gray-400 text-xs mt-1">
                  {movie.genre?.[0]} • {movie.releaseYear}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-yellow-400 text-xs">⭐ {movie.rating?.toFixed(1) || 'N/A'}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie._id}`) }}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded">
                    Download
                  </button>
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