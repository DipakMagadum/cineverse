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
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-[#0f0f0f] border-b border-[#1f1f1f]">
        <Link to="/" className="text-[#e50914] font-black text-xl tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>CINEVERSE</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Home</Link>
          <Link to="/movies" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Movies</Link>
          <Link to="/watchlist" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Watchlist</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
            <input type="text" placeholder="Search movies..." className="bg-transparent outline-none text-white text-xs w-36 placeholder-gray-600" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} />
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              {user.isAdmin && <Link to="/admin" className="bg-[#e50914] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors">ADMIN</Link>}
              <span className="text-gray-400 text-xs font-medium">{user.name}</span>
              <button onClick={handleLogout} className="border border-[#333] hover:border-[#555] text-gray-400 hover:text-white text-xs px-4 py-2 rounded transition-colors">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-[#e50914] hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded transition-colors">Sign In</Link>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-1">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#0f0f0f] border-b border-[#1f1f1f] flex flex-col md:hidden">
          <div className="flex items-center gap-2 mx-4 my-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
            <input type="text" placeholder="Search movies..." className="bg-transparent outline-none text-white text-sm w-full placeholder-gray-600" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} />
          </div>
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 text-sm font-medium px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">Home</Link>
          <Link to="/movies" onClick={() => setMenuOpen(false)} className="text-gray-300 text-sm font-medium px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">Movies</Link>
          <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="text-gray-300 text-sm font-medium px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">Watchlist</Link>
          {user ? (
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs px-4 py-3 border-b border-[#1a1a1a]">{user.name}</span>
              {user.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-center bg-[#e50914] text-white text-sm font-bold mx-4 my-3 py-2.5 rounded">Admin Panel</Link>}
              <button onClick={handleLogout} className="text-gray-300 text-sm font-medium px-4 py-3 border-t border-[#1a1a1a] hover:bg-[#1a1a1a] text-left">Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-center bg-[#e50914] text-white text-sm font-bold mx-4 my-3 py-2.5 rounded">Sign In</Link>
          )}
        </div>
      )}
    </>
  )
}

export default Navbar