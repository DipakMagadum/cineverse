import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
    setMenuOpen(false)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/movies?search=${search}`)
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,60,60,0.15)',
        padding: '0 clamp(16px, 4vw, 40px)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        
        {/* Logo */}
        <Link to="/" style={{
          background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          fontWeight: '900',
          letterSpacing: '-1px',
          fontFamily: 'Georgia, serif',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          CINEVERSE
        </Link>

        {/* Desktop Search */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          gap: '8px',
          width: 'clamp(150px, 25vw, 280px)',
        }} className="hidden-mobile">
          <span style={{ color: '#ff3c3c', fontSize: '14px' }}>⌕</span>
          <input
            type="text"
            placeholder="Search movies..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '13px',
              width: '100%',
            }}
            className="placeholder-gray"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden-mobile">
          <Link to="/movies" style={{
            color: '#aaa', fontSize: '13px',
            letterSpacing: '1px', fontWeight: '600',
            textDecoration: 'none', textTransform: 'uppercase',
          }}>Movies</Link>

          {user ? (
            <>
              <span style={{ color: '#666', fontSize: '13px' }}>👤 {user.name}</span>
              {user.isAdmin && (
                <Link to="/admin" style={{
                  background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
                  padding: '6px 14px', borderRadius: '50px',
                  fontSize: '12px', fontWeight: '700',
                  color: 'white', textDecoration: 'none',
                  letterSpacing: '0.5px',
                }}>ADMIN</Link>
              )}
              <button onClick={handleLogout} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '6px 14px', borderRadius: '50px',
                fontSize: '13px', color: '#ccc', cursor: 'pointer',
              }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{
              background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
              padding: '8px 20px', borderRadius: '50px',
              fontSize: '13px', fontWeight: '700',
              color: 'white', textDecoration: 'none',
            }}>SIGN IN</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px',
            display: 'none',
            flexDirection: 'column', gap: '5px',
          }}
          className="show-mobile"
        >
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '22px', height: '2px',
              background: menuOpen && i === 1 ? 'transparent' : 'white',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none'
                : 'none',
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(0,0,0,0.97)',
          borderBottom: '1px solid rgba(255,60,60,0.2)',
          padding: '20px',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Mobile Search */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',
            gap: '8px',
          }}>
            <span style={{ color: '#ff3c3c' }}>⌕</span>
            <input
              type="text"
              placeholder="Search movies..."
              style={{
                background: 'transparent', border: 'none',
                outline: 'none', color: 'white',
                fontSize: '14px', width: '100%',
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <Link to="/movies" onClick={() => setMenuOpen(false)} style={{
            color: '#ccc', fontSize: '15px',
            fontWeight: '600', textDecoration: 'none',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>🎬 Movies</Link>

          {user ? (
            <>
              <span style={{ color: '#666', fontSize: '14px' }}>👤 {user.name}</span>
              {user.isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} style={{
                  background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
                  padding: '10px 20px', borderRadius: '50px',
                  fontSize: '14px', fontWeight: '700',
                  color: 'white', textDecoration: 'none',
                  textAlign: 'center',
                }}>⚙️ Admin Panel</Link>
              )}
              <button onClick={handleLogout} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '10px', borderRadius: '50px',
                fontSize: '14px', color: '#ccc', cursor: 'pointer',
              }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{
              background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
              padding: '12px 20px', borderRadius: '50px',
              fontSize: '14px', fontWeight: '700',
              color: 'white', textDecoration: 'none',
              textAlign: 'center',
            }}>SIGN IN</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
        input::placeholder { color: #555; }
      `}</style>
    </>
  )
}

export default Navbar