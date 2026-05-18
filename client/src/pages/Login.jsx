import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError('Invalid email or password!')
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-red-500 text-center mb-2">TadiPaar 🎬</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Sign in to download movies</p>

        {error && <p className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login