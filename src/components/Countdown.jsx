import React, { useState, useEffect } from 'react'
import { WEDDING } from '../config'

export default function Countdown() {
  const [time, setTime] = useState(calcTime())

  function calcTime() {
    const diff = WEDDING.fecha - new Date()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      done: false,
    }
  }

  useEffect(() => {
    const t = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(t)
  }, [])

  const s = {
    wrap: {
      background: 'white',
      borderRadius: 16,
      padding: '24px 20px',
      margin: '0 16px',
      boxShadow: '0 2px 20px rgba(61,110,138,0.08)',
      border: '1px solid rgba(197,216,228,0.4)',
    },
    title: {
      fontFamily: "'Lora', serif",
      fontSize: 11,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: 'var(--blue-deep)',
      textAlign: 'center',
      marginBottom: 18,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 8,
    },
    cell: {
      textAlign: 'center',
      background: 'var(--cream)',
      borderRadius: 12,
      padding: '12px 4px',
      border: '1px solid rgba(197,216,228,0.5)',
    },
    num: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 38,
      fontWeight: 700,
      color: 'var(--blue-deep)',
      lineHeight: 1,
      display: 'block',
    },
    label: {
      fontSize: 9,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: 'var(--text-soft)',
      marginTop: 4,
      display: 'block',
    },
    done: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 28,
      color: 'var(--gold)',
      textAlign: 'center',
    },
  }

  if (time.done) return (
    <div style={s.wrap}>
      <p style={s.done}>¡Hoy es el gran dia! 💙</p>
    </div>
  )

  return (
    <div style={s.wrap}>
      <p style={s.title}>Faltan para el gran dia</p>
      <div style={s.grid}>
        {[
          { n: time.d, l: 'Dias' },
          { n: time.h, l: 'Horas' },
          { n: time.m, l: 'Min' },
          { n: time.s, l: 'Seg' },
        ].map(({ n, l }) => (
          <div key={l} style={s.cell}>
            <span style={s.num}>{String(n).padStart(2, '0')}</span>
            <span style={s.label}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
