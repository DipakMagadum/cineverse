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
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
        padding: '0 clamp(16px, 5vw, 48px)',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          color: '#e50914', fontWeight: '900',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          letterSpacing: '-1px', fontFamily: 'Georgia, serif',
          textDecoration: 'none', flexShrink: 0,
        }}>CINEVERSE</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="hidden-mobile">
          <Link to="/movies" style={{ color: '#e5e5e5', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Movies</Link>
          <Link to="/watchlist" style={{ color: '#e5e5e5', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Watchlist</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden-mobile">
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,0,0,0.4)', border: '1px solid #444',
            borderRadius: '4px', padding: '6px 12px',
          }}>
            <span style={{ color: '#aaa', fontSize: '14px' }}>🔍</span>
            <input type="text" placeholder="Search..."
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '13px', width: '140px' }}
              value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} />
          </div>

          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" style={{
                  background: '#e50914', color: '#fff',
                  padding: '7px 16px', borderRadius: '4px',
                  fontSize: '13px', fontWeight: '700', textDecoration: 'none',
                }}>ADMIN</Link>
              )}
              <span style={{ color: '#e5e5e5', fontSize: '13px' }}>👤 {user.name}</span>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid #555',
                color: '#e5e5e5', padding: '7px 16px',
                borderRadius: '4px', fontSize: '13px', cursor: 'pointer',
              }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{
              background: '#e50914', color: '#fff',
              padding: '7px 20px', borderRadius: '4px',
              fontSize: '13px', fontWeight: '700', textDecoration: 'none',
            }}>Sign In</Link>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none', flexDirection: 'column', gap: '5px' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '22px', height: '2px', background: 'white', borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen ? i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)' : 'none',
            }}/>
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0,
          background: '#000', borderBottom: '1px solid #222',
          padding: '20px', zIndex: 49,
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111', border: '1px solid #333', borderRadius: '4px', padding: '10px 14px' }}>
            <span style={{ color: '#aaa' }}>🔍</span>
            <input type="text" placeholder="Search movies..."
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }}
              value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} />
          </div>
          <Link to="/movies" onClick={() => setMenuOpen(false)} style={{ color: '#e5e5e5', fontSize: '15px', fontWeight: '500', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #222' }}>Movies</Link>
          <Link to="/watchlist" onClick={() => setMenuOpen(false)} style={{ color: '#e5e5e5', fontSize: '15px', fontWeight: '500', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #222' }}>Watchlist</Link>
          {user ? (
            <>
              <span style={{ color: '#aaa', fontSize: '14px' }}>👤 {user.name}</span>
              {user.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ background: '#e50914', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}>Admin Panel</Link>}
              <button onClick={handleLogout} style={{ background: '#222', border: '1px solid #444', color: '#e5e5e5', padding: '10px', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ background: '#e50914', color: '#fff', padding: '12px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}>Sign In</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } .hidden-mobile { display: flex !important; } }
        input::placeholder { color: #666; }
      `}</style>
    </>
  )
}

export default Navbar