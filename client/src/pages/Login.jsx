import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/api/auth/login', { email, password })
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError('Invalid email or password!')
    }
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#e50914] mb-1" style={{ fontFamily: 'Georgia, serif' }}>CINEVERSE</h1>
          <p className="text-gray-600 text-sm">Sign in to download HD movies</p>
        </div>

        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-8">
          {error && <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">EMAIL</label>
              <input type="email" placeholder="Enter your email" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">PASSWORD</label>
              <input type="password" placeholder="Enter your password" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="bg-[#e50914] hover:bg-red-700 text-white font-bold text-sm py-3 rounded-lg mt-2 transition-colors">
              Sign In
            </button>
          </form>

          <p className="text-gray-600 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#e50914] hover:underline font-semibold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login