import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [search, setSearch] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-red-500">
        TadiPaar 🎬
      </Link>

      {/* Search */}
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-64">
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-transparent outline-none text-white text-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>🔍</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/movies" className="text-gray-300 hover:text-white text-sm">Movies</Link>
        
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm">👤 {user.name}</span>
            {user.isAdmin && (
              <Link to="/admin" className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-full text-sm font-semibold text-white">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm font-semibold text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold text-white">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar