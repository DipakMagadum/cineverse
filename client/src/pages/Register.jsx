import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/api/auth/register', { name, email, password })
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError('Registration failed! Try again.')
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-red-500 text-center mb-2">CineVerse 🎬</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Create your free account</p>

        {error && <p className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Create a password"
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
            Create Account
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register