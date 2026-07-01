import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap } from 'lucide-react'
import Logo from '../components/Logo'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Completa todos los campos'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #012b5c 0%, #10314e 50%, #045b96 100%)' }}>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full border border-white/30"
            style={{
              width: `${80 + i * 40}px`, height: `${80 + i * 40}px`,
              top: `${Math.sin(i) * 40 + 50}%`, left: `${Math.cos(i) * 40 + 50}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #5f92ae, transparent)' }} />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #c7dae7, transparent)' }} />

      {/* Card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #012b5c, #045b96)' }}>
              <GraduationCap size={32} className="text-white" />
            </div>
            <Logo size="lg" variant="dark" />
            <p className="text-brand-soft text-sm mt-2">Tu plataforma educativa premium</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">
                ID de estudiante o correo
              </label>
              <input
                type="text"
                className="input"
                placeholder="ejemplo@youcanapp.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-soft hover:text-brand-dark transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <button className="text-sm text-brand-accent hover:text-brand-dark font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-light/40 text-center">
            <p className="text-xs text-brand-soft">
              ¿No tienes cuenta?{' '}
              <button className="text-brand-accent font-semibold hover:underline">
                Solicita acceso
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 YouCanApp · Todos los derechos reservados
        </p>
      </div>
    </div>
  )
}
