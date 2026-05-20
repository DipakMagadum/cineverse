import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import API from '../api'
import Navbar from '../components/Navbar'

const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Horror', 'Sci-Fi']
const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi']

function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [genre, setGenre] = useState('All')
  const [language, setLanguage] = useState('All')
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const params = {}
        if (genre !== 'All') params.genre = genre
        if (language !== 'All') params.language = language
        if (search) params.search = search
        const { data } = await API.get('/api/movies', { params })
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
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <Navbar />
      <div className="px-6 md:px-10 pt-24 pb-10">

        <h1 className="text-2xl font-black text-white mb-6">All <span className="text-[#e50914]">Movies</span></h1>

        <div className="flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] rounded px-4 py-3 w-full max-w-sm mb-6">
          <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
          <input type="text" placeholder="Search movies..." className="bg-transparent outline-none text-white text-sm w-full placeholder-gray-600" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-xs font-semibold mb-2 tracking-widest">GENRE</p>
          <div className="flex flex-wrap gap-2">
            {genres.map(g => (
              <button key={g} onClick={() => setGenre(g)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${genre === g ? 'bg-[#e50914] text-white border-[#e50914]' : 'bg-[#141414] text-gray-500 border-[#2a2a2a] hover:border-[#444]'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 text-xs font-semibold mb-2 tracking-widest">LANGUAGE</p>
          <div className="flex flex-wrap gap-2">
            {languages.map(l => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${language === l ? 'bg-[#e50914] text-white border-[#e50914]' : 'bg-[#141414] text-gray-500 border-[#2a2a2a] hover:border-[#444]'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-[#141414] rounded-lg overflow-hidden animate-pulse">
                <div className="bg-[#1f1f1f]" style={{ aspectRatio: '2/3' }} />
                <div className="p-3"><div className="bg-[#1f1f1f] h-3 rounded mb-2" /><div className="bg-[#1f1f1f] h-2 rounded w-2/3" /></div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-sm">No movies found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map(movie => (
              <div key={movie._id} onClick={() => navigate(`/movie/${movie._id}`)}
                className="bg-[#141414] border border-[#1f1f1f] hover:border-[#333] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all">
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
                    <span className="text-gray-600 text-xs">{movie.genre?.[0]} • {movie.releaseYear}</span>
                  </div>
                  <span className="bg-[#1f1f1f] text-gray-500 text-xs px-1.5 py-0.5 rounded mt-1 inline-block">{movie.language}</span>
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