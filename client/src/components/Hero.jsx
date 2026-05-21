import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TMDB_KEY = '0c9a7ed50b0c5072517b8900d7e3dd31'

function Hero() {
  const navigate = useNavigate()
  const [posters, setPosters] = useState([])

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}&language=en-US`
        )
        const data = await res.json()
        const imgs = data.results
          .filter(m => m.poster_path)
          .slice(0, 14)
          .map(m => `https://image.tmdb.org/t/p/w300${m.poster_path}`)
        setPosters(imgs)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPosters()
  }, [])

  return (
    <div style={{
      position: 'relative', height: '100vh',
      overflow: 'hidden', background: '#0a0a0a',
    }}>
      {/* Poster collage background */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '3px',
      }}>
        {posters.map((src, i) => (
          <div key={i} style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.55) saturate(1.2)',
          }} />
        ))}
      </div>

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.1) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(0deg, #0a0a0a 0%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '55%', padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,52px) 40px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        zIndex: 10,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(229,9,20,0.15)',
          border: '1px solid rgba(229,9,20,0.4)',
          color: '#e50914', fontSize: '10px', fontWeight: '700',
          letterSpacing: '2px', padding: '4px 10px',
          borderRadius: '3px', marginBottom: '16px', width: 'fit-content',
        }}>
          <span style={{
            width: '6px', height: '6px', background: '#e50914',
            borderRadius: '50%', display: 'inline-block',
          }} />
          TRENDING IN INDIA
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: '900', color: '#fff',
          letterSpacing: '-2px', lineHeight: '1',
          fontFamily: 'Georgia, serif', marginBottom: '10px',
        }}>
          CINE<span style={{ color: '#e50914' }}>VERSE</span>
        </h1>

        <p style={{
          fontSize: '11px', color: '#777',
          letterSpacing: '2px', fontWeight: '700',
          marginBottom: '14px', textTransform: 'uppercase',
        }}>
          Bollywood &nbsp;•&nbsp; Hollywood &nbsp;•&nbsp; South
        </p>

        <p style={{
          fontSize: '13px', color: '#888', lineHeight: '1.65',
          maxWidth: '380px', marginBottom: '26px',
        }}>
          HD movies — free to stream and download. No subscription. No login required to browse.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <button onClick={() => navigate('/movies')} style={{
            background: '#e50914', color: '#fff', border: 'none',
            padding: '11px 26px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '7px',
          }}>▶ Browse Movies</button>

          <button onClick={() => navigate('/movies')} style={{
            background: 'rgba(255,255,255,0.1)', color: '#ddd',
            border: '1px solid rgba(255,255,255,0.18)',
            padding: '11px 26px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '7px',
          }}>⬇ Top Downloads</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '28px' }}>
          {[['1000+','MOVIES'], ['HD','QUALITY'], ['FREE','DOWNLOADS']].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{
                fontSize: 'clamp(1.3rem,3vw,1.7rem)',
                fontWeight: '900', color: '#e50914',
                fontFamily: 'Georgia, serif', lineHeight: '1',
              }}>{val}</div>
              <div style={{
                fontSize: '10px', color: '#555',
                letterSpacing: '1.5px', fontWeight: '700', marginTop: '3px',
              }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero