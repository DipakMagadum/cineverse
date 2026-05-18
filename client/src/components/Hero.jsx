import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #000 40%, transparent 100%), linear-gradient(to top, #000 10%, transparent 60%), linear-gradient(135deg, #1a0000, #0d0d0d)',
      }}/>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 60px) clamp(20px, 5vw, 60px)',
        maxWidth: '600px',
      }}>
        <div style={{
          fontSize: '11px', fontWeight: '700',
          color: '#e50914', letterSpacing: '3px',
          marginBottom: '12px',
        }}>TRENDING #1 IN INDIA</div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          fontWeight: '900', color: '#fff',
          lineHeight: '1', letterSpacing: '-2px',
          fontFamily: 'Georgia, serif',
          marginBottom: '16px',
        }}>CINEVERSE</h1>

        <p style={{
          color: '#999', fontSize: 'clamp(13px, 2vw, 16px)',
          lineHeight: '1.6', marginBottom: '24px', maxWidth: '460px',
        }}>
          Action • Thriller • Drama<br/>
          Your ultimate destination for HD movies — Bollywood, Hollywood & South Indian. Download in seconds.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/movies')} style={{
            background: '#fff', color: '#000',
            border: 'none', padding: 'clamp(10px,2vw,12px) clamp(20px,4vw,28px)',
            borderRadius: '4px', fontSize: 'clamp(13px,2vw,15px)',
            fontWeight: '700', cursor: 'pointer',
          }}>▶ Browse Movies</button>

          <button onClick={() => navigate('/movies')} style={{
            background: 'rgba(109,109,110,0.7)',
            color: '#fff', border: 'none',
            padding: 'clamp(10px,2vw,12px) clamp(20px,4vw,28px)',
            borderRadius: '4px', fontSize: 'clamp(13px,2vw,15px)',
            fontWeight: '700', cursor: 'pointer',
          }}>ⓘ More Info</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 'clamp(20px,4vw,40px)', marginTop: '48px', flexWrap: 'wrap' }}>
          {[['1000+','Movies'], ['HD','Quality'], ['FREE','Downloads']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: '900', color: '#e50914', fontFamily: 'Georgia, serif' }}>{num}</div>
              <div style={{ color: '#666', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero