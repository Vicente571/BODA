import React, { createContext, useContext, useState } from 'react'
import { ADMIN_USER, ADMIN_PASS } from '../config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('boda_auth') === '1')

  function login(user, pass) {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('boda_auth', '1')
      setAuthed(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem('boda_auth')
    setAuthed(false)
  }

  return <AuthContext.Provider value={{ authed, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
