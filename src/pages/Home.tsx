import { useNavigate } from 'react-router-dom'
import { BookOpen, Video, Users, Calendar, PlayCircle, TrendingUp, Clock, Star, ArrowRight, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { mockWebinars, mockTutorias, mockSubjects } from '../data/mock'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useApp()
  const liveWebinar = mockWebinars.find(w => w.status === 'live')

  const cards = [
    { icon: BookOpen,   label: 'Materias',         desc: `${mockSubjects.length} activas`,            path: '/materias',   color: '#045b96' },
    { icon: Video,      label: 'Webinars en vivo',  desc: liveWebinar ? '1 en vivo ahora' : 'Próximamente', path: '/webinars',   color: '#10314e' },
    { icon: Users,      label: 'Tutorías',          desc: `${mockTutorias.filter(t=>t.status==='scheduled').length} agendadas`, path: '/tutorias',   color: '#5f92ae' },
    { icon: Users,      label: 'Asesorías grupales',desc: 'Únete a un grupo',                          path: '/grupales',   color: '#012b5c' },
    { icon: Calendar,   label: 'Calendario',        desc: 'Ver mis eventos',                           path: '/calendario', color: '#045b96' },
    { icon: PlayCircle, label: 'Grabaciones',       desc: '12 disponibles',                            path: '/grabaciones',color: '#10314e' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Hero greeting */}
      <div className="card p-6 flex items-center justify-between overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #012b5c 0%, #045b96 100%)' }}>
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10"
          style={{ background: 'radial-gradient(circle at 80% 50%, #c7dae7, transparent)' }} />
        <div className="relative">
          <p className="text-brand-light/80 text-sm font-medium">Bienvenida de vuelta,</p>
          <h1 className="text-white text-2xl font-bold mt-1">{user.name} 👋</h1>
          <p className="text-brand-light/60 text-sm mt-1">Tienes {mockTutorias.filter(t=>t.status==='scheduled').length} tutorías agendadas esta semana</p>
        </div>
        <div className="flex gap-4 relative">
          <div className="text-center">
            <p className="text-white text-2xl font-bold">{user.hoursStudied}</p>
            <p className="text-brand-light/60 text-xs">horas estudiadas</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-white text-2xl font-bold">{user.sessionsTaken}</p>
            <p className="text-brand-light/60 text-xs">sesiones</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-white text-2xl font-bold">{user.progress}%</p>
            <p className="text-brand-light/60 text-xs">progreso</p>
          </div>
        </div>
      </div>

      {/* Live banner */}
      {liveWebinar && (
        <div className="card p-4 flex items-center gap-4 border-red-200 bg-red-50/50">
          <div className="flex-shrink-0">
            <span className="badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              EN VIVO
            </span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-brand-dark text-sm">{liveWebinar.title}</p>
            <p className="text-brand-soft text-xs">{liveWebinar.tutor} · {liveWebinar.participants} participantes</p>
          </div>
          <button className="btn-primary text-sm py-2" onClick={() => navigate('/webinars')}>
            Entrar ahora
          </button>
        </div>
      )}

      {/* Main cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(({ icon: Icon, label, desc, path, color }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="card p-5 flex flex-col items-start gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}18` }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p className="font-semibold text-brand-dark text-sm">{label}</p>
              <p className="text-brand-soft text-xs mt-0.5">{desc}</p>
            </div>
            <ArrowRight size={14} className="text-brand-soft/40 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Progress */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-dark flex items-center gap-2">
              <TrendingUp size={16} className="text-brand-accent" /> Progreso académico
            </h2>
          </div>
          <div className="space-y-3">
            {mockSubjects.map(s => (
              <div key={s.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-brand-dark font-medium truncate pr-2">{s.name}</span>
                  <span className="text-brand-soft flex-shrink-0">{s.progress}%</span>
                </div>
                <div className="h-1.5 bg-brand-light rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.progress}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="card p-5">
          <h2 className="font-semibold text-brand-dark flex items-center gap-2 mb-4">
            <Clock size={16} className="text-brand-accent" /> Próximas sesiones
          </h2>
          <div className="space-y-3">
            {mockTutorias.filter(t => t.status === 'scheduled').map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-brand-light/20 hover:bg-brand-light/40 transition-colors cursor-pointer"
                onClick={() => navigate('/tutorias')}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #045b96, #5f92ae)' }}>
                  {t.tutorAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-dark truncate">{t.subject}</p>
                  <p className="text-xs text-brand-soft">{t.tutor}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-brand-accent">{t.time}</p>
                  <p className="text-xs text-brand-soft">{t.date.split('-').slice(1).join('/')}</p>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-sm text-brand-accent font-medium hover:text-brand-dark py-1 transition-colors"
              onClick={() => navigate('/tutorias')}>
              Ver todas →
            </button>
          </div>
        </div>
      </div>

      {/* Recent webinars */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-brand-dark flex items-center gap-2">
            <Zap size={16} className="text-brand-accent" /> Webinars recientes
          </h2>
          <button className="text-sm text-brand-accent hover:text-brand-dark font-medium"
            onClick={() => navigate('/webinars')}>Ver todos</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {mockWebinars.slice(0, 4).map(w => (
            <button key={w.id} className="flex-shrink-0 w-52 rounded-xl overflow-hidden hover:shadow-md transition-all text-left"
              onClick={() => navigate('/webinars')}>
              <div className="h-24 flex items-center justify-center relative"
                style={{ backgroundColor: w.thumbnail }}>
                {w.status === 'live' && (
                  <span className="badge-live absolute top-2 left-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
                  </span>
                )}
                <Star size={28} className="text-white/30" />
              </div>
              <div className="p-3 bg-white border border-brand-light/30 rounded-b-xl">
                <p className="text-xs font-semibold text-brand-dark line-clamp-2">{w.title}</p>
                <p className="text-xs text-brand-soft mt-1">{w.tutor}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
