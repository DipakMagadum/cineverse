import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

const TMDB_KEY = '0c9a7ed50b0c5072517b8900d7e3dd31'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [posters, setPosters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
        )
        const data = await res.json()
        const imgs = data.results
          .filter(m => m.poster_path)
          .slice(0, 14)
          .map(m => `https://image.tmdb.org/t/p/w300${m.poster_path}`)
        setPosters(imgs)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPosters()
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await API.post('/api/auth/register', { name, email, password })
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError('Registration failed! Try again.')
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden px-4">

      {/* Poster collage background */}
      <div className="absolute inset-0 grid gap-[3px]"
        style={{ gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}>
        {posters.map((src, i) => (
          <div key={i}
            className="bg-cover bg-center brightness-50 saturate-110"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-7">
          <h1 className="text-4xl font-black text-[#e50914] tracking-tight mb-2"
            style={{ fontFamily: 'Georgia, serif' }}>
            CINEVERSE
          </h1>
          <p className="text-gray-500 text-sm">Create your free account</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414]/80 backdrop-blur-md border border-white/10 rounded-xl p-8">

          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label className="text-gray-500 text-xs font-bold tracking-widest block mb-2">
                NAME
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors placeholder-gray-600"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-500 text-xs font-bold tracking-widest block mb-2">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors placeholder-gray-600"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-500 text-xs font-bold tracking-widest block mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors placeholder-gray-600"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm py-3 rounded-lg mt-1 transition-colors tracking-wide">
              Create Account
            </button>
          </form>

          <p className="text-gray-600 text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e50914] hover:underline font-bold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register