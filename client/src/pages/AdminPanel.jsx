import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function AdminPanel() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const [tab, setTab] = useState('add')
  const [movies, setMovies] = useState([])
  const [editMovie, setEditMovie] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emptyForm = {
    title: '', description: '', genre: '', language: 'Hindi',
    releaseYear: '', trailerUrl: '', posterUrl: '',
    isTrending: false, isFeatured: false,
    director: '', duration: '', cast: ''
  }
  const emptyLinks = [
    { quality: '480p', size: '', url: '' },
    { quality: '720p', size: '', url: '' },
    { quality: '1080p', size: '', url: '' },
  ]

  const [form, setForm] = useState(emptyForm)
  const [downloadLinks, setDownloadLinks] = useState(emptyLinks)

  if (!user?.isAdmin) {
    navigate('/')
    return null
  }

  useEffect(() => {
    if (tab === 'manage') fetchMovies()
  }, [tab])

  const fetchMovies = async () => {
    try {
      const { data } = await API.get('/api/movies')
      setMovies(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleLinkChange = (index, field, value) => {
    const updated = [...downloadLinks]
    updated[index][field] = value
    setDownloadLinks(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const filledLinks = downloadLinks.filter(l => l.url.trim() !== '')
      await API.post('/api/upload/movie', {
        ...form,
        downloadLinks: filledLinks
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setSuccess('🎬 Movie added successfully!')
      setError('')
      setForm(emptyForm)
      setDownloadLinks(emptyLinks)
    } catch (err) {
      setError('Failed! ' + (err.response?.data?.message || ''))
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (movie) => {
    setEditMovie(movie)
    setForm({
      title:       movie.title || '',
      description: movie.description || '',
      genre:       movie.genre?.join(', ') || '',
      language:    movie.language || 'Hindi',
      releaseYear: movie.releaseYear || '',
      trailerUrl:  movie.trailerUrl || '',
      posterUrl:   movie.posterUrl || '',
      isTrending:  movie.isTrending || false,
      isFeatured:  movie.isFeatured || false,
      director:    movie.director || '',
      duration:    movie.duration || '',
      cast:        movie.cast?.join(', ') || ''
    })
    const links = ['480p', '720p', '1080p'].map(q => {
      const existing = movie.downloadLinks?.find(l => l.quality === q)
      return existing || { quality: q, size: '', url: '' }
    })
    setDownloadLinks(links)
    setTab('add')
    window.scrollTo(0, 0)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const filledLinks = downloadLinks.filter(l => l.url.trim() !== '')
      await API.put(`/api/upload/movie/${editMovie._id}`, {
        ...form,
        genre: form.genre.split(',').map(g => g.trim()),
        cast: form.cast ? form.cast.split(',').map(c => c.trim()) : [],
        downloadLinks: filledLinks
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setSuccess('✅ Movie updated successfully!')
      setError('')
      setEditMovie(null)
      setForm(emptyForm)
      setDownloadLinks(emptyLinks)
      fetchMovies()
    } catch (err) {
      setError('Update failed! ' + (err.response?.data?.message || ''))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (movieId, title) => {
    if (!window.confirm(`"${title}" delete karaycha ahe ka?`)) return
    try {
      await API.delete(`/api/upload/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setSuccess(`🗑️ "${title}" deleted!`)
      fetchMovies()
    } catch (err) {
      setError('Delete failed! ' + (err.response?.data?.message || ''))
    }
  }

  const cancelEdit = () => {
    setEditMovie(null)
    setForm(emptyForm)
    setDownloadLinks(emptyLinks)
    setSuccess('')
    setError('')
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-red-500">👨‍💼 Admin Panel</h1>
          <button onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm">
            ← Back to Home
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={() => { setTab('add'); cancelEdit() }}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${
              tab === 'add' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}>
            ➕ {editMovie ? 'Edit Movie' : 'Add Movie'}
          </button>
          <button onClick={() => setTab('manage')}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${
              tab === 'manage' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}>
            🎬 Manage Movies
          </button>
        </div>

        {success && <p className="bg-green-700 text-white px-4 py-3 rounded-lg mb-4">{success}</p>}
        {error   && <p className="bg-red-700 text-white px-4 py-3 rounded-lg mb-4">{error}</p>}

        {tab === 'add' && (
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editMovie ? `✏️ Edit: ${editMovie.title}` : '🎬 Add New Movie'}
              </h2>
              {editMovie && (
                <button onClick={cancelEdit}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm">
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={editMovie ? handleUpdate : handleSubmit}
              className="grid grid-cols-2 gap-4">

              <div className="col-span-2">
                <label className="text-gray-400 text-sm mb-1 block">Movie Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required
                  placeholder="e.g. Pushpa 2"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 text-sm mb-1 block">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required
                  rows={3} placeholder="Movie description..."
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Genre * (comma separated)</label>
                <input name="genre" value={form.genre} onChange={handleChange} required
                  placeholder="Action, Drama"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Language</label>
                <select name="language" value={form.language} onChange={handleChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500">
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Marathi</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Release Year</label>
                <input name="releaseYear" value={form.releaseYear} onChange={handleChange}
                  placeholder="2024" type="number"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange}
                  placeholder="2h 30m"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Director</label>
                <input name="director" value={form.director} onChange={handleChange}
                  placeholder="Director name"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Cast (comma separated)</label>
                <input name="cast" value={form.cast} onChange={handleChange}
                  placeholder="Actor 1, Actor 2"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 text-sm mb-1 block">Poster Image URL</label>
                <input name="posterUrl" value={form.posterUrl} onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 text-sm mb-1 block">YouTube Trailer URL</label>
                <input name="trailerUrl" value={form.trailerUrl} onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>

              <div className="col-span-2">
                <div className="border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-red-400 mb-4">📥 Download Links</h3>
                  {downloadLinks.map((link, index) => (
                    <div key={link.quality} className="mb-4 bg-gray-800 rounded-lg p-4">
                      <p className="text-sm font-semibold text-yellow-400 mb-3">
                        🎞️ {link.quality} Quality
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">File Size</label>
                          <input value={link.size}
                            onChange={(e) => handleLinkChange(index, 'size', e.target.value)}
                            placeholder="e.g. 700MB"
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">Download URL</label>
                          <input value={link.url}
                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            placeholder="https://archive.org/..."
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isTrending"
                    checked={form.isTrending} onChange={handleChange}
                    className="w-4 h-4 accent-red-500" />
                  <span className="text-gray-300">🔥 Trending</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isFeatured"
                    checked={form.isFeatured} onChange={handleChange}
                    className="w-4 h-4 accent-red-500" />
                  <span className="text-gray-300">⭐ Featured</span>
                </label>
              </div>

              <div className="col-span-2">
                <button type="submit" disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold text-lg">
                  {loading ? '⏳ Saving...' : editMovie ? '✅ Update Movie' : '🎬 Add Movie'}
                </button>
              </div>

            </form>
          </div>
        )}

        {tab === 'manage' && (
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">🎬 All Movies ({movies.length})</h2>

            {movies.length === 0 ? (
              <p className="text-gray-400">Koi movie nahi — Add Movie tab madhe add kara!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {movies.map((movie) => (
                  <div key={movie._id}
                    className="bg-gray-800 rounded-xl p-4 flex items-center gap-4">

                    <div className="w-14 h-20 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {movie.posterUrl
                        ? <img src={movie.posterUrl} alt={movie.title}
                            className="w-full h-full object-cover" />
                        : <span className="text-2xl">🎬</span>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {movie.genre?.join(', ')} • {movie.language} • {movie.releaseYear}
                      </p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {movie.isTrending && (
                          <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                            🔥 Trending
                          </span>
                        )}
                        {movie.downloadLinks?.length > 0 && (
                          <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                            📥 {movie.downloadLinks.length} links
                          </span>
                        )}
                        <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full">
                          👁️ {movie.views || 0} views
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(movie)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(movie._id, movie.title)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPanel