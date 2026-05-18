import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'relative',
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000',
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(255,60,60,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,140,0,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(120,0,255,0.08) 0%, transparent 50%)',
      }}/>

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,60,60,0.02) 100px, rgba(255,60,60,0.02) 101px)',
        pointerEvents: 'none',
      }}/>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(20px, 5vw, 80px)', maxWidth: '700px', width: '100%' }}>
        
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,60,60,0.15)',
          border: '1px solid rgba(255,60,60,0.3)',
          borderRadius: '50px',
          padding: '6px 16px',
          marginBottom: '28px',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#ff3c3c',
            boxShadow: '0 0 8px #ff3c3c',
            animation: 'pulse 1.5s infinite'
          }}/>
          <span style={{ color: '#ff6b6b', fontSize: '12px', fontWeight: '700', letterSpacing: '2px' }}>
            NOW STREAMING
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '900',
          lineHeight: '1.05',
          letterSpacing: '-2px',
          fontFamily: 'Georgia, serif',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ff8c00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          CINEVERSE
        </h1>

        <div style={{
          width: '60px', height: '3px',
          background: 'linear-gradient(90deg, #ff3c3c, #ff8c00)',
          borderRadius: '2px',
          marginBottom: '24px',
        }}/>

        <p style={{
          color: '#888',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          lineHeight: '1.7',
          marginBottom: '40px',
          fontWeight: '400',
          maxWidth: '480px',
        }}>
          Your ultimate destination for HD movies — Bollywood, Hollywood & South Indian. 
          Download in seconds, watch anywhere.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/movies')} style={{
            background: 'linear-gradient(135deg, #ff3c3c, #ff8c00)',
            color: 'white',
            border: 'none',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
            borderRadius: '50px',
            fontSize: 'clamp(12px, 2vw, 14px)',
            fontWeight: '700',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(255,60,60,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,60,60,0.5)' }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,60,60,0.35)' }}>
            🎬 BROWSE MOVIES
          </button>

          <button onClick={() => navigate('/movies')} style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
            borderRadius: '50px',
            fontSize: 'clamp(12px, 2vw, 14px)',
            fontWeight: '700',
            letterSpacing: '1px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,60,60,0.5)'; e.currentTarget.style.background = 'rgba(255,60,60,0.08)' }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}>
            📥 LATEST DOWNLOADS
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', marginTop: '56px', flexWrap: 'wrap' }}>
          {[
            { num: '1000+', label: 'Movies' },
            { num: 'HD', label: 'Quality' },
            { num: 'FREE', label: 'Downloads' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: '900',
                background: 'linear-gradient(135deg, #fff, #ff8c00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Georgia, serif',
              }}>{stat.num}</div>
              <div style={{ color: '#555', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginTop: '2px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export default Hero