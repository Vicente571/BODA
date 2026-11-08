import React, { useState } from 'react'
import { useWedding } from '../context/WeddingContext'

export default function SongForm() {
  const { sugerirCancion } = useWedding()
  const [cancion,  setCancion]  = useState('')
  const [artista,  setArtista]  = useState('')
  const [sent,     setSent]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit() {
    if (!cancion.trim()) { setError('Escribe el nombre de la cancion'); return }
    setLoading(true); setError('')
    await sugerirCancion(cancion.trim(), artista.trim())
    setLoading(false); setSent(true)
  }

  const s = {
    card: {
      background: 'white', borderRadius: 16, padding: '24px 20px',
      margin: '0 16px', boxShadow: '0 2px 20px rgba(61,110,138,0.08)',
      border: '1px solid rgba(197,216,228,0.4)',
    },
    title: { fontFamily: "'Dancing Script', cursive", fontSize: 26, color: 'var(--blue-deep)', marginBottom: 4 },
    sub: { fontFamily: "'Lora', serif", fontSize: 12, color: 'var(--text-soft)', marginBottom: 20, fontStyle: 'italic' },
    input: {
      width: '100%', padding: '11px 14px', borderRadius: 10,
      border: '1.5px solid var(--blue-mist)', fontFamily: "'Lora', serif",
      fontSize: 14, color: 'var(--text)', outline: 'none',
      background: 'var(--cream)', marginBottom: 10, transition: 'border-color 0.2s',
      display: 'block',
    },
    btn: {
      width: '100%', padding: '14px', background: 'var(--blue-deep)', border: 'none',
      borderRadius: 12, fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600,
      color: 'white', cursor: 'pointer', transition: 'background 0.2s', marginTop: 6,
    },
    error: { fontSize: 12, color: '#C05050', marginBottom: 10, fontFamily: "'Lora', serif" },
    success: { textAlign: 'center', padding: '12px 0' },
    successEmoji: { fontSize: 34, display: 'block', marginBottom: 8 },
    successTitle: { fontFamily: "'Dancing Script', cursive", fontSize: 26, color: 'var(--blue-deep)', marginBottom: 4 },
    successSub: { fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--text-soft)', fontStyle: 'italic' },
  }

  if (sent) return (
    <div style={s.card}>
      <div style={s.success}>
        <span style={s.successEmoji}>🎵</span>
        <p style={s.successTitle}>Gracias por tu sugerencia</p>
        <p style={s.successSub}>La agregaremos a nuestra playlist</p>
      </div>
    </div>
  )

  return (
    <div style={s.card}>
      <h3 style={s.title}>Sugerencia de Cancion</h3>
      <p style={s.sub}>Ayudanos a crear la playlist perfecta para esta noche</p>
      <input style={s.input} placeholder="Nombre de la cancion" value={cancion}
        onChange={e => setCancion(e.target.value)}
        onFocus={e => e.target.style.borderColor = 'var(--blue-deep)'}
        onBlur={e => e.target.style.borderColor = 'var(--blue-mist)'}
      />
      <input style={s.input} placeholder="Artista (opcional)" value={artista}
        onChange={e => setArtista(e.target.value)}
        onFocus={e => e.target.style.borderColor = 'var(--blue-deep)'}
        onBlur={e => e.target.style.borderColor = 'var(--blue-mist)'}
      />
      {error && <p style={s.error}>{error}</p>}
      <button style={s.btn} onClick={handleSubmit} disabled={loading}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-deep)'}
      >
        {loading ? 'Enviando...' : 'Sugerir cancion'}
      </button>
    </div>
  )
}
