import { useEffect, useState } from 'react'

function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 min-w-[280px] max-w-sm
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      ${type === 'success' ? 'bg-[#141414] border-green-500/40' : 'bg-[#141414] border-red-500/40'}`}>

      <div className={`text-xl flex-shrink-0 font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
        {type === 'success' ? '✓' : '✕'}
      </div>

      <div className="flex-1">
        <p className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {type === 'success' ? 'Success!' : 'Error!'}
        </p>
        <p className="text-gray-400 text-xs mt-0.5">{message}</p>
      </div>

      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
        className="text-gray-600 hover:text-gray-400 text-xl flex-shrink-0">
        ×
      </button>

      <div
        className={`absolute bottom-0 left-0 h-[3px] rounded-b-xl ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        style={{ animation: 'shrink 3s linear forwards' }}
      />

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export default Toast