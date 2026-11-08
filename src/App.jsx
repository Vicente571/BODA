import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WeddingProvider } from './context/WeddingContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import InvitationPage from './pages/InvitationPage'
import AdminPage      from './pages/AdminPage'
import LoginPage      from './pages/LoginPage'

function AdminRoute() {
  const { authed } = useAuth()
  return authed ? <AdminPage /> : <LoginPage />
}

export default function App() {
  return (
    <BrowserRouter>
      <WeddingProvider>
        <AuthProvider>
          <Routes>
            <Route path="/"      element={<InvitationPage />} />
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </AuthProvider>
      </WeddingProvider>
    </BrowserRouter>
  )
}
