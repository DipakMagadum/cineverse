import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin"   element={<AdminPanel />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movies"  element={<Movies />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  )
}

export default App