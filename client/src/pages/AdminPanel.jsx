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

  const emptyForm = { title: '', description: '', genre: '', language: 'Hindi', releaseYear: '', trailerUrl: '', posterUrl: '', isTrending: false, isFeatured: false, director: '', duration: '', cast: '' }
  const emptyLinks = [{ quality: '480p', size: '', url: '' }, { quality: '720p', size: '', url: '' }, { quality: '1080p', size: '', url: '' }]
  const [form, setForm] = useState(emptyForm)
  const [downloadLinks, setDownloadLinks] = useState(emptyLinks)

  if (!user?.isAdmin) { navigate('/'); return null }

  useEffect(() => { if (tab === 'manage') fetchMovies() }, [tab])

  const fetchMovies = async () => {
    try { const { data } = await API.get('/api/movies'); setMovies(data) } catch (err) { console.error(err) }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleLinkChange = (index, field, value) => {
    const updated = [...downloadLinks]; updated[index][field] = value; setDownloadLinks(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const filledLinks = downloadLinks.filter(l => l.url.trim() !== '')
      await API.post('/api/upload/movie', { ...form, downloadLinks: filledLinks }, { headers: { Authorization: `Bearer ${user.token}` } })
      setSuccess('Movie added successfully!'); setError(''); setForm(emptyForm); setDownloadLinks(emptyLinks)
    } catch (err) { setError('Failed! ' + (err.response?.data?.message || '')) }
    finally { setLoading(false) }
  }

  const handleEdit = (movie) => {
    setEditMovie(movie)
    setForm({ title: movie.title || '', description: movie.description || '', genre: movie.genre?.join(', ') || '', language: movie.language || 'Hindi', releaseYear: movie.releaseYear || '', trailerUrl: movie.trailerUrl || '', posterUrl: movie.posterUrl || '', isTrending: movie.isTrending || false, isFeatured: movie.isFeatured || false, director: movie.director || '', duration: movie.duration || '', cast: movie.cast?.join(', ') || '' })
    const links = ['480p', '720p', '1080p'].map(q => movie.downloadLinks?.find(l => l.quality === q) || { quality: q, size: '', url: '' })
    setDownloadLinks(links); setTab('add'); window.scrollTo(0, 0)
  }

  const handleUpdate = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const filledLinks = downloadLinks.filter(l => l.url.trim() !== '')
      await API.put(`/api/upload/movie/${editMovie._id}`, { ...form, genre: form.genre.split(',').map(g => g.trim()), cast: form.cast ? form.cast.split(',').map(c => c.trim()) : [], downloadLinks: filledLinks }, { headers: { Authorization: `Bearer ${user.token}` } })
      setSuccess('Movie updated!'); setError(''); setEditMovie(null); setForm(emptyForm); setDownloadLinks(emptyLinks); fetchMovies()
    } catch (err) { setError('Update failed! ' + (err.response?.data?.message || '')) }
    finally { setLoading(false) }
  }

  const handleDelete = async (movieId, title) => {
    if (!window.confirm(`"${title}" delete करायचं आहे का?`)) return
    try {
      await API.delete(`/api/upload/movie/${movieId}`, { headers: { Authorization: `Bearer ${user.token}` } })
      setSuccess(`"${title}" deleted!`); fetchMovies()
    } catch (err) { setError('Delete failed!') }
  }

  const cancelEdit = () => { setEditMovie(null); setForm(emptyForm); setDownloadLinks(emptyLinks); setSuccess(''); setError('') }

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#e50914] text-white text-sm px-4 py-3 rounded-lg outline-none transition-colors"

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="px-6 md:px-10 pt-10 pb-12 max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Admin <span className="text-[#e50914]">Panel</span></h1>
            <p className="text-gray-600 text-xs mt-0.5">Manage CineVerse movies</p>
          </div>
          <button onClick={() => navigate('/')} className="bg-[#141414] border border-[#2a2a2a] hover:border-[#444] text-gray-400 hover:text-white text-xs px-4 py-2 rounded-lg transition-colors">
            ← Back to Site
          </button>
        </div>

        {success && <div className="bg-green-900/30 border border-green-800 text-green-400 text-sm px-4 py-3 rounded-lg mb-5">{success}</div>}
        {error && <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

        {/* Tabs */}
        <div className="flex gap-0 border border-[#1f1f1f] rounded-lg overflow-hidden mb-8 w-fit">
          {['add', 'manage'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2.5 text-sm font-semibold transition-colors ${tab === t ? 'bg-[#e50914] text-white' : 'bg-[#141414] text-gray-500 hover:text-white'}`}>
              {t === 'add' ? (editMovie ? 'Edit Movie' : 'Add Movie') : `Manage (${movies.length})`}
            </button>
          ))}
        </div>

        {tab === 'add' && (
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold">{editMovie ? `Editing: ${editMovie.title}` : 'Add New Movie'}</h2>
              {editMovie && <button onClick={cancelEdit} className="text-gray-500 hover:text-white text-xs border border-[#333] px-3 py-1.5 rounded transition-colors">Cancel Edit</button>}
            </div>

            <form onSubmit={editMovie ? handleUpdate : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">MOVIE TITLE *</label>
                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Pushpa 2" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">DESCRIPTION *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Movie description..." className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">GENRE * (comma separated)</label>
                <input name="genre" value={form.genre} onChange={handleChange} required placeholder="Action, Drama" className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">LANGUAGE</label>
                <select name="language" value={form.language} onChange={handleChange} className={inputClass}>
                  {['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">RELEASE YEAR</label>
                <input name="releaseYear" value={form.releaseYear} onChange={handleChange} placeholder="2024" type="number" className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">DURATION</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="2h 30m" className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">DIRECTOR</label>
                <input name="director" value={form.director} onChange={handleChange} placeholder="Director name" className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">CAST (comma separated)</label>
                <input name="cast" value={form.cast} onChange={handleChange} placeholder="Actor 1, Actor 2" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">POSTER IMAGE URL</label>
                <input name="posterUrl" value={form.posterUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-500 text-xs font-semibold tracking-widest block mb-2">YOUTUBE TRAILER URL</label>
                <input name="trailerUrl" value={form.trailerUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
              </div>

              {/* Download Links */}
              <div className="md:col-span-2 border border-[#2a2a2a] rounded-xl p-4">
                <p className="text-gray-500 text-xs font-semibold tracking-widest mb-4">DOWNLOAD LINKS</p>
                <div className="flex flex-col gap-3">
                  {downloadLinks.map((link, index) => (
                    <div key={link.quality} className="bg-[#1a1a1a] rounded-lg p-4">
                      <p className="text-[#e50914] text-xs font-bold mb-3">{link.quality}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input value={link.size} onChange={e => handleLinkChange(index, 'size', e.target.value)} placeholder="File size e.g. 700MB" className="bg-[#141414] border border-[#2a2a2a] focus:border-[#e50914] text-white text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                        <input value={link.url} onChange={e => handleLinkChange(index, 'url', e.target.value)} placeholder="Download URL" className="bg-[#141414] border border-[#2a2a2a] focus:border-[#e50914] text-white text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} className="w-4 h-4 accent-red-500" />
                  <span className="text-gray-400 text-sm">Trending</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-4 h-4 accent-red-500" />
                  <span className="text-gray-400 text-sm">Featured</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <button type="submit" disabled={loading}
                  className="bg-[#e50914] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors">
                  {loading ? 'Saving...' : editMovie ? 'Update Movie' : 'Add Movie'}
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'manage' && (
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">
            <h2 className="text-base font-bold mb-6">All Movies <span className="text-gray-600 font-normal text-sm">({movies.length})</span></h2>
            {movies.length === 0 ? (
              <p className="text-gray-600 text-sm">No movies yet — add from Add Movie tab!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {movies.map(movie => (
                  <div key={movie._id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-16 bg-[#141414] rounded-lg flex-shrink-0 overflow-hidden border border-[#2a2a2a]">
                      {movie.posterUrl ? <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">🎬</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                      <p className="text-gray-600 text-xs mt-0.5">{movie.genre?.join(', ')} • {movie.language} • {movie.releaseYear}</p>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        {movie.isTrending && <span className="bg-orange-900/40 text-orange-400 border border-orange-800 text-xs px-2 py-0.5 rounded-full">Trending</span>}
                        {movie.downloadLinks?.length > 0 && <span className="bg-green-900/40 text-green-400 border border-green-800 text-xs px-2 py-0.5 rounded-full">{movie.downloadLinks.length} links</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(movie)} className="bg-[#141414] border border-[#2a2a2a] hover:border-blue-700 text-gray-400 hover:text-blue-400 text-xs px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(movie._id, movie.title)} className="bg-[#141414] border border-[#2a2a2a] hover:border-red-800 text-gray-400 hover:text-red-400 text-xs px-3 py-1.5 rounded-lg transition-colors">Delete</button>
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