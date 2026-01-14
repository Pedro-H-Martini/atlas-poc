import { Routes, Route } from 'react-router-dom'
import { ArgusAuthProvider, SecureRoute } from 'argus-auth0-auth-react'
import { MainLayout } from './components/layout/MainLayout'

import './App.css'

function App() {

  return (
    <ArgusAuthProvider>
      <SecureRoute>
      <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </SecureRoute>
    </ArgusAuthProvider>
  )
}

export default App
