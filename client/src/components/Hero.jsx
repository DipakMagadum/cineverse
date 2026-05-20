import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#0f0f0f] pt-16 border-b border-[#1a1a1a]">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-12 md:py-16 gap-10 max-w-7xl mx-auto">
        
        <div className="max-w-xl">
          <div className="text-[#e50914] text-xs font-bold tracking-widest mb-3">TRENDING IN INDIA</div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Watch & Download<br /><span className="text-[#e50914]">HD Movies</span> Free
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Bollywood • Hollywood • South Indian<br />
            Latest releases in HD & 4K. No subscription needed.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate('/movies')} className="bg-white hover:bg-gray-200 text-black font-bold text-sm px-6 py-3 rounded transition-colors">
              ▶ Browse Movies
            </button>
            <button onClick={() => navigate('/movies')} className="bg-[#222] hover:bg-[#2a2a2a] text-white font-semibold text-sm px-6 py-3 rounded border border-[#333] transition-colors">
              What's New
            </button>
          </div>
          <div className="flex gap-10 mt-10">
            {[['1200+', 'MOVIES'], ['HD', 'QUALITY'], ['FREE', 'ALWAYS']].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-[#e50914]" style={{ fontFamily: 'Georgia, serif' }}>{num}</div>
                <div className="text-gray-600 text-xs font-semibold tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          {[
            { title: 'Kalki 2898', badge: '4K', bg: '#1a0808' },
            { title: 'Fighter', badge: 'HD', bg: '#080818', mt: true },
            { title: 'Pushpa 2', badge: 'HD', bg: '#080f08' },
          ].map(({ title, badge, bg, mt }) => (
            <div key={title} onClick={() => navigate('/movies')} className={`w-24 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform flex flex-col justify-end ${mt ? 'mt-6' : ''}`} style={{ background: bg, aspectRatio: '2/3' }}>
              <div className="p-2" style={{ background: 'linear-gradient(to top, #000, transparent)' }}>
                <span className="text-xs bg-[#e50914] text-white px-1.5 py-0.5 rounded font-bold">{badge}</span>
                <p className="text-white text-xs font-bold mt-1 truncate">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero