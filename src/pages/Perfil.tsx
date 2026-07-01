import { useState } from 'react'
import { Edit2, Mail, CreditCard, BookOpen, Clock, Star, TrendingUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Avatar from '../components/Avatar'

export default function Perfil() {
  const { user } = useApp()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)

  const membershipColors: Record<string, string> = {
    free: '#8b9ab5', pro: '#5f92ae', premium: '#045b96'
  }

  const stats = [
    { icon: Clock,    label: 'Horas estudiadas', value: user.hoursStudied, suffix: 'h' },
    { icon: BookOpen, label: 'Sesiones tomadas',  value: user.sessionsTaken, suffix: '' },
    { icon: TrendingUp, label: 'Progreso general', value: user.progress, suffix: '%' },
    { icon: Star,     label: 'Calificación',       value: 4.9, suffix: '⭐' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Mi perfil</h1>

      {/* Profile card */}
      <div className="card overflow-hidden">
        <div className="h-28" style={{ background: 'linear-gradient(135deg, #012b5c, #045b96)' }}/>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #5f92ae, #045b96)' }}>
              {user.avatar}
            </div>
            <button onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 btn-ghost text-sm">
              <Edit2 size={14}/>{editing ? 'Guardar' : 'Editar perfil'}
            </button>
          </div>

          {editing ? (
            <input className="input text-lg font-bold mb-1" value={name} onChange={e => setName(e.target.value)}/>
          ) : (
            <h2 className="text-xl font-bold text-brand-dark">{name}</h2>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brand-soft">
            <span className="flex items-center gap-1.5"><span className="text-brand-soft/60 text-xs">ID</span>{user.id}</span>
            <span className="flex items-center gap-1.5"><Mail size={13}/>{user.email}</span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white text-xs font-semibold capitalize"
              style={{ backgroundColor: membershipColors[user.membership] }}>
              <CreditCard size={11}/>{user.membership}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, suffix }) => (
          <div key={label} className="card p-4 text-center hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-2">
              <Icon size={18} className="text-brand-accent"/>
            </div>
            <p className="text-2xl font-bold text-brand-dark">{value}{suffix}</p>
            <p className="text-xs text-brand-soft mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Progress by subject */}
      <div className="card p-5">
        <h2 className="font-semibold text-brand-dark mb-4">Progreso por materia</h2>
        <div className="space-y-4">
          {[
            { name: 'Fundamentos de Administración', progress: 78, color: '#045b96' },
            { name: 'Microeconomía', progress: 55, color: '#5f92ae' },
            { name: 'Contabilidad Financiera', progress: 90, color: '#10314e' },
            { name: 'Marketing Digital', progress: 40, color: '#012b5c' },
          ].map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-brand-dark font-medium">{s.name}</span>
                <span className="font-semibold" style={{ color: s.color }}>{s.progress}%</span>
              </div>
              <div className="h-2 bg-brand-light rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.progress}%`, backgroundColor: s.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Membership */}
      <div className="card p-5" style={{ background: 'linear-gradient(135deg, #012b5c, #045b96)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">Plan actual</p>
            <p className="text-white text-2xl font-bold capitalize mt-1">{user.membership}</p>
            <p className="text-white/60 text-sm mt-1">Acceso completo a todas las funciones</p>
          </div>
          <div className="text-right">
            <CreditCard size={32} className="text-white/30 mb-2"/>
            <button className="bg-white text-brand-dark text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-light transition-colors">
              Gestionar plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
