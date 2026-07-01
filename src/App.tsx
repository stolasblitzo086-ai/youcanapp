import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppLayout from './components/AppLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import Webinars from './pages/Webinars'
import Tutorias from './pages/Tutorias'
import Grupales from './pages/Grupales'
import Calendario from './pages/Calendario'
import Materias from './pages/Materias'
import Perfil from './pages/Perfil'
import Grabaciones from './pages/Grabaciones'
import Mensajes from './pages/Mensajes'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/tutorias" element={<Tutorias />} />
          <Route path="/grupales" element={<Grupales />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/grabaciones" element={<Grabaciones />} />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
