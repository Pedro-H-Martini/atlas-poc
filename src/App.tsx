import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
  )
}

export default App
