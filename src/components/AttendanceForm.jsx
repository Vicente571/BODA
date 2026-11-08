import React, { useState } from 'react'
import { useWedding } from '../context/WeddingContext'

export default function AttendanceForm() {
  const { confirmarAsistencia } = useWedding()
  const [personas, setPersonas] = useState([{ nombre: '' }])
  const [sent,     setSent]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  function updateNombre(i, val) {
    setPersonas(prev => prev.map((p, idx) => idx === i ? { nombre: val } : p))
  }

  function addPersona() {
    if (personas.length >= 8) return
    setPersonas(prev => [...prev, { nombre: '' }])
  }

  function removePersona(i) {
    if (personas.length === 1) return
    setPersonas(prev => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit() {
    const filled = personas.filter(p => p.nombre.trim())
    if (!filled.length) { setError('Escribe al menos un nombre'); return }
    setLoading(true); setError('')
    await confirmarAsistencia(filled)
    setLoading(false)
    setSent(true)
  }

  const s = {
    card: {
      background: 'white',
      borderRadius: 16,
      padding: '24px 20px',
      margin: '0 16px',
      boxShadow: '0 2px 20px rgba(61,110,138,0.08)',
      border: '1px solid rgba(197,216,228,0.4)',
    },
    title: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 26,
      color: 'var(--blue-deep)',
      marginBottom: 4,
    },
    sub: {
      fontFamily: "'Lora', serif",
      fontSize: 12,
      color: 'var(--text-soft)',
      marginBottom: 20,
      fontStyle: 'italic',
    },
    personaRow: {
      display: 'flex',
      gap: 8,
      marginBottom: 10,
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: '11px 14px',
      borderRadius: 10,
      border: '1.5px solid var(--blue-mist)',
      fontFamily: "'Lora', serif",
      fontSize: 14,
      color: 'var(--text)',
      outline: 'none',
      background: 'var(--cream)',
      transition: 'border-color 0.2s',
    },
    removeBtn: {
      width: 34, height: 34,
      borderRadius: '50%',
      border: '1px solid #E0D0D0',
      background: 'white',
      color: '#C09090',
      fontSize: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    },
    addBtn: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '9px 14px',
      background: 'var(--cream)',
      border: '1.5px dashed var(--blue-mist)',
      borderRadius: 10,
      fontFamily: "'Lora', serif",
      fontSize: 13,
      color: 'var(--blue-mid)',
      cursor: 'pointer',
      marginBottom: 16,
      width: '100%',
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      background: 'var(--blue-deep)',
      border: 'none',
      borderRadius: 12,
      fontFamily: "'Lora', serif",
      fontSize: 15,
      fontWeight: 600,
      color: 'white',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    error: {
      fontSize: 12, color: '#C05050',
      marginBottom: 10, fontFamily: "'Lora', serif",
    },
    success: {
      textAlign: 'center', padding: '16px 0',
    },
    successEmoji: { fontSize: 36, display: 'block', marginBottom: 10 },
    successTitle: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 28, color: 'var(--blue-deep)', marginBottom: 6,
    },
    successSub: {
      fontFamily: "'Lora', serif",
      fontSize: 13, color: 'var(--text-soft)', fontStyle: 'italic',
    },
  }

  if (sent) return (
    <div style={s.card}>
      <div style={s.success}>
        <span style={s.successEmoji}>🎉</span>
        <p style={s.successTitle}>Confirmado</p>
        <p style={s.successSub}>Los esperamos con mucho amor</p>
      </div>
    </div>
  )

  return (
    <div style={s.card}>
      <h3 style={s.title}>Confirmacion de Asistencia</h3>
      <p style={s.sub}>Escribe el nombre de cada persona de tu familia que asistira</p>

      {personas.map((p, i) => (
        <div key={i} style={s.personaRow}>
          <input
            style={s.input}
            placeholder={`Nombre completo ${i > 0 ? `#${i + 1}` : ''}`}
            value={p.nombre}
            onChange={e => updateNombre(i, e.target.value)}
            onFocus={e => e.target.style.borderColor = 'var(--blue-deep)'}
            onBlur={e => e.target.style.borderColor = 'var(--blue-mist)'}
          />
          {personas.length > 1 && (
            <button style={s.removeBtn} onClick={() => removePersona(i)}>✕</button>
          )}
        </div>
      ))}

      {personas.length < 8 && (
        <button style={s.addBtn} onClick={addPersona}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          Agregar persona
        </button>
      )}

      {error && <p style={s.error}>{error}</p>}

      <button
        style={s.submitBtn}
        onClick={handleSubmit}
        disabled={loading}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-deep)'}
      >
        {loading ? 'Confirmando...' : 'Confirmar asistencia'}
      </button>
    </div>
  )
}
