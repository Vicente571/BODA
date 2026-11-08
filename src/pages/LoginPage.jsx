import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (login(user, pass)) return
    setError('Usuario o contrasena incorrectos')
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const s = {
    page: {
      minHeight: '100vh', background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, maxWidth: 430, margin: '0 auto',
    },
    card: {
      width: '100%', background: 'white', borderRadius: 20,
      padding: '36px 28px', boxShadow: '0 4px 30px rgba(61,110,138,0.12)',
      border: '1px solid rgba(197,216,228,0.4)',
      animation: shake ? 'shake 0.4s ease' : 'fadeUp 0.4s ease',
    },
    logo: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 36, color: 'var(--blue-deep)',
      textAlign: 'center', display: 'block', marginBottom: 4,
    },
    sub: {
      fontFamily: "'Lora', serif", fontStyle: 'italic',
      fontSize: 13, color: 'var(--text-soft)',
      textAlign: 'center', marginBottom: 28,
    },
    divider: {
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      margin: '0 0 24px',
    },
    label: {
      fontFamily: "'Lora', serif", fontSize: 11,
      letterSpacing: 1.5, textTransform: 'uppercase',
      color: 'var(--text-soft)', display: 'block', marginBottom: 7,
    },
    input: {
      width: '100%', padding: '12px 14px',
      border: '1.5px solid var(--blue-mist)', borderRadius: 10,
      fontFamily: "'Lora', serif", fontSize: 14,
      color: 'var(--text)', outline: 'none', background: 'var(--cream)',
      marginBottom: 16, transition: 'border-color 0.2s', display: 'block',
    },
    error: {
      fontFamily: "'Lora', serif", fontSize: 12,
      color: '#C05050', textAlign: 'center', marginBottom: 14,
      padding: '8px', background: '#FFF0F0', borderRadius: 8,
    },
    btn: {
      width: '100%', padding: '14px',
      background: 'var(--blue-deep)', border: 'none', borderRadius: 12,
      fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600,
      color: 'white', cursor: 'pointer', transition: 'background 0.2s',
    },
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <span style={s.logo}>Michelle &amp; Jair</span>
        <p style={s.sub}>Panel de administracion</p>
        <div style={s.divider} />
        {error && <div style={s.error}>{error}</div>}
        <label style={s.label}>Usuario</label>
        <input style={s.input} type="text" value={user} placeholder="admin"
          onChange={e => setUser(e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--blue-deep)'}
          onBlur={e => e.target.style.borderColor = 'var(--blue-mist)'}
        />
        <label style={s.label}>Contrasena</label>
        <input style={s.input} type="password" value={pass} placeholder="••••••••"
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
          onFocus={e => e.target.style.borderColor = 'var(--blue-deep)'}
          onBlur={e => e.target.style.borderColor = 'var(--blue-mist)'}
        />
        <button style={s.btn} onClick={handleSubmit}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-deep)'}
        >
          Entrar
        </button>
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  )
}
