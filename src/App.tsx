import { Routes, Route } from 'react-router-dom'
import { ArgusAuthProvider, SecureRoute } from 'argus-auth0-auth-react'
import { MainLayout } from './components/layout/MainLayout'
import LoginPage from './pages/LoginPage'
import ProjectList from './pages/projects/projectList'

function App() {

  return (
    <ArgusAuthProvider>
      <Routes>
          <Route path="/" element={<LoginPage />} />
        <Route element={<SecureRoute />}>
          <Route element={<MainLayout />}>
          <Route path="/projects" element={<ProjectList />} />
        </Route>
        </Route>
        </Routes>
    </ArgusAuthProvider>
  )
}

export default App
