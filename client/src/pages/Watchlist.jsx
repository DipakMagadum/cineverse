import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import Navbar from '../components/Navbar'

function Watchlist() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchWatchlist()
  }, [])

  const fetchWatchlist = async () => {
    try {
      const { data } = await API.get('/api/users/watchlist', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setMovies(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (movieId) => {
    try {
      await API.post(`/api/users/watchlist/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setMovies(movies.filter(m => m._id !== movieId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">🔖 My Watchlist</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-gray-400 text-lg mb-4">Watchlist rikt ahe!</p>
            <button onClick={() => navigate('/movies')}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold">
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie._id} className="bg-gray-900 rounded-lg overflow-hidden group relative">
                <div
                  onClick={() => navigate(`/movie/${movie._id}`)}
                  className="bg-gray-800 h-48 flex items-center justify-center cursor-pointer relative overflow-hidden">
                  {movie.posterUrl
                    ? <img src={movie.posterUrl} alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    : <span className="text-4xl">🎬</span>
                  }
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">HD</span>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {movie.genre?.[0]} • {movie.releaseYear}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() => navigate(`/movie/${movie._id}`)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1.5 rounded font-semibold">
                      📥 Download
                    </button>
                    <button
                      onClick={() => removeFromWatchlist(movie._id)}
                      className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1.5 rounded"
                      title="Remove from watchlist">
                      🗑️
                    </button>
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

export default Watchlist