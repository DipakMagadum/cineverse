import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5000'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [watchlistMsg, setWatchlistMsg] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchMovie()
    if (user) checkWatchlist()
  }, [id])

  const fetchMovie = async () => {
    try {
      const { data } = await axios.get(`${API}/api/movies/${id}`)
      setMovie(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const checkWatchlist = async () => {
    try {
      const { data } = await axios.get(`${API}/api/users/watchlist`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setInWatchlist(data.some(m => m._id === id))
    } catch (err) {
      console.error(err)
    }
  }

  const toggleWatchlist = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await axios.post(`${API}/api/users/watchlist/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setInWatchlist(!inWatchlist)
      setWatchlistMsg(inWatchlist ? '❌ Watchlist madhe remove kele!' : '✅ Watchlist madhe add kele!')
      setTimeout(() => setWatchlistMsg(''), 2500)
    } catch (err) {
      console.error(err)
    }
  }

  // ── SIMPLE & WORKING DOWNLOAD ──
  const handleDownload = async (quality) => {
    if (!user) { navigate('/login'); return }
    try {
      const { data } = await axios.get(
        `${API}/api/movies/${id}/download/${quality}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      // Direct link open kar — Google Drive link असल्यास direct download होईल
      window.open(data.url, '_blank')
    } catch (err) {
      alert('❌ Download link available nahi!')
    }
  }

  if (loading) return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <p className="text-white text-xl">Loading...</p>
    </div>
  )

  if (!movie) return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <p className="text-white">Movie not found!</p>
    </div>
  )

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Top bar */}
      <div className="px-8 pt-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">
          ← Back
        </button>
        {watchlistMsg && (
          <span className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg">
            {watchlistMsg}
          </span>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-full md:w-72 flex-shrink-0">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={movie.title}
              className="w-full rounded-xl object-cover shadow-2xl" />
          ) : (
            <div className="bg-gray-800 h-96 rounded-xl flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          )}
          <button
            onClick={toggleWatchlist}
            className={`w-full mt-3 py-3 rounded-xl font-semibold text-sm transition-colors ${
              inWatchlist
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}>
            {inWatchlist ? '🔖 Watchlist madhe ahe' : '+ Watchlist madhe add kara'}
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre?.map((g) => (
              <span key={g} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400">Language</p>
              <p className="font-semibold">{movie.language}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400">Year</p>
              <p className="font-semibold">{movie.releaseYear}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400">Duration</p>
              <p className="font-semibold">{movie.duration || 'N/A'}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400">Rating</p>
              <p className="font-semibold text-yellow-400">
                ⭐ {movie.rating?.toFixed(1) || 'N/A'}
              </p>
            </div>
          </div>

          {movie.director && (
            <p className="text-gray-400 text-sm mb-2">
              🎬 Director: <span className="text-white">{movie.director}</span>
            </p>
          )}
          {movie.cast?.length > 0 && (
            <p className="text-gray-400 text-sm mb-4">
              🌟 Cast: <span className="text-white">{movie.cast.join(', ')}</span>
            </p>
          )}

          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {movie.description}
          </p>

          {movie.trailerUrl && (
            <a href={movie.trailerUrl} target="_blank" rel="noreferrer"
              className="inline-block bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm mb-6">
              ▶ Watch Trailer
            </a>
          )}

          {/* Download Section */}
          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-lg font-bold mb-1">📥 Download Movie</h3>
            <p className="text-gray-400 text-xs mb-4">
              Quality select kara — file direct download hoil!
            </p>

            {movie.downloadLinks?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {movie.downloadLinks.map((link) => (
                  <button key={link.quality}
                    onClick={() => handleDownload(link.quality)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition-colors">
                    📥 {link.quality} — {link.size}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {['480p', '720p', '1080p'].map((q) => (
                  <button key={q}
                    onClick={() => handleDownload(q)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold">
                    📥 {q}
                  </button>
                ))}
              </div>
            )}

            {!user && (
              <p className="text-yellow-400 text-sm mt-3">
                ⚠️ Download saathi{' '}
                <span onClick={() => navigate('/login')}
                  className="underline cursor-pointer">
                  login kara!
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail