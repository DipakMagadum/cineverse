import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [search, setSearch] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/movies?search=${search}`)
    }
  }

  return (
    <nav style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,60,60,0.15)',
    }} className="px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div style={{
          background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.6rem',
          fontWeight: '900',
          letterSpacing: '-1px',
          fontFamily: 'Georgia, serif',
        }}>
          CINEVERSE
        </div>
        <div style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
          animation: 'pulse 2s infinite'
        }}/>
      </Link>

      {/* Search */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '50px',
      }} className="flex items-center px-4 py-2 w-72 gap-2">
        <span style={{ color: '#ff3c3c', fontSize: '14px' }}>⌕</span>
        <input
          type="text"
          placeholder="Search movies, genres..."
          className="bg-transparent outline-none text-white text-sm w-full placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        <Link to="/movies" style={{ color: '#aaa', fontSize: '14px', letterSpacing: '1px', fontWeight: '600' }}
          className="hover:text-white transition-colors uppercase">
          Movies
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span style={{ color: '#aaa', fontSize: '13px' }}>👤 {user.name}</span>
            {user.isAdmin && (
              <Link to="/admin" style={{
                background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '0.5px'
              }}>
                ADMIN
              </Link>
            )}
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '6px 16px',
              borderRadius: '50px',
              fontSize: '13px',
              color: '#ccc',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '700',
            color: 'white',
            letterSpacing: '0.5px'
          }}>
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar