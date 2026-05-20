import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'
import Navbar from '../components/Navbar'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [msg, setMsg] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchMovie()
    if (user) checkWatchlist()
  }, [id])

  const fetchMovie = async () => {
    try {
      const { data } = await API.get(`/api/movies/${id}`)
      setMovie(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const checkWatchlist = async () => {
    try {
      const { data } = await API.get('/api/users/watchlist', { headers: { Authorization: `Bearer ${user.token}` } })
      setInWatchlist(data.some(m => m._id === id))
    } catch (err) { console.error(err) }
  }

  const toggleWatchlist = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await API.post(`/api/users/watchlist/${id}`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
      setInWatchlist(!inWatchlist)
      setMsg(inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist!')
      setTimeout(() => setMsg(''), 2000)
    } catch (err) { console.error(err) }
  }

  if (loading) return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
      <div className="text-gray-600 text-sm">Loading...</div>
    </div>
  )

  if (!movie) return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
      <div className="text-gray-600 text-sm">Movie not found.</div>
    </div>
  )

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <Navbar />
      <div className="px-6 md:px-10 pt-24 pb-12 max-w-6xl mx-auto">

        {msg && <div className="bg-green-900/30 border border-green-800 text-green-400 text-sm px-4 py-3 rounded-lg mb-6">{msg}</div>}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-full md:w-56">
            <div className="rounded-lg overflow-hidden bg-[#141414] border border-[#1f1f1f]" style={{ aspectRatio: '2/3' }}>
              {movie.posterUrl
                ? <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-6xl">🎬</div>
              }
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#e50914] text-white text-xs font-bold px-2 py-0.5 rounded">HD</span>
              {movie.isTrending && <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded">🔥 Trending</span>}
              {movie.genre?.map(g => <span key={g} className="bg-[#1f1f1f] text-gray-400 text-xs px-2 py-0.5 rounded border border-[#2a2a2a]">{g}</span>)}
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
              {movie.releaseYear && <span>{movie.releaseYear}</span>}
              {movie.duration && <span>{movie.duration}</span>}
              {movie.language && <span className="bg-[#1f1f1f] px-2 py-0.5 rounded border border-[#2a2a2a] text-gray-400">{movie.language}</span>}
              {movie.director && <span>Dir: {movie.director}</span>}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xl">{movie.description}</p>

            {movie.cast?.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-600 text-xs font-semibold tracking-widest mb-2">CAST</p>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map(c => <span key={c} className="bg-[#141414] border border-[#2a2a2a] text-gray-400 text-xs px-3 py-1 rounded-full">{c}</span>)}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={toggleWatchlist}
                className={`text-sm font-bold px-5 py-2.5 rounded border transition-colors ${inWatchlist ? 'bg-[#1f1f1f] border-[#333] text-gray-400 hover:border-red-800 hover:text-red-400' : 'bg-[#1f1f1f] border-[#333] text-white hover:border-[#e50914] hover:text-[#e50914]'}`}>
                {inWatchlist ? '✓ In Watchlist' : '+ Watchlist'}
              </button>
              {movie.trailerUrl && (
                <a href={movie.trailerUrl} target="_blank" rel="noreferrer"
                  className="bg-white hover:bg-gray-200 text-black text-sm font-bold px-5 py-2.5 rounded transition-colors">
                  ▶ Watch Trailer
                </a>
              )}
            </div>

            {/* Download Links */}
            {movie.downloadLinks?.length > 0 && (
              <div>
                <p className="text-gray-600 text-xs font-semibold tracking-widest mb-3">DOWNLOAD</p>
                <div className="flex flex-col gap-2">
                  {movie.downloadLinks.map(link => (
                    <a key={link.quality} href={user ? link.url : '/login'} target={user ? '_blank' : '_self'} rel="noreferrer"
                      className="flex items-center justify-between bg-[#141414] border border-[#2a2a2a] hover:border-[#e50914] rounded-lg px-4 py-3 transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#e50914] text-white text-xs font-bold px-2 py-0.5 rounded">{link.quality}</span>
                        <span className="text-white text-sm font-semibold">{movie.title}</span>
                        {link.size && <span className="text-gray-600 text-xs">{link.size}</span>}
                      </div>
                      <span className="text-gray-600 group-hover:text-[#e50914] text-sm font-bold transition-colors">↓ Download</span>
                    </a>
                  ))}
                </div>
                {!user && <p className="text-gray-600 text-xs mt-3">
                  <span onClick={() => navigate('/login')} className="text-[#e50914] cursor-pointer hover:underline font-semibold">Sign in</span> to download movies
                </p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail