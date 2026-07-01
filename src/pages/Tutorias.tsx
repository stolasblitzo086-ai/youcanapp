import { useState } from 'react'
import { Search, Star, Clock, BookOpen, ChevronRight, Mic, MicOff, Camera, CameraOff, Monitor, MessageSquare, X, Send, PhoneOff } from 'lucide-react'
import { mockTutorias } from '../data/mock'
import type { Tutoria } from '../types'
import Avatar from '../components/Avatar'

function TutoriaRoom({ tutoria, onLeave }: { tutoria: Tutoria; onLeave: () => void }) {
  const [mic, setMic] = useState(true)
  const [cam, setCam] = useState(true)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, user: tutoria.tutor, text: `Hola, empecemos con ${tutoria.topic}`, isTutor: true },
  ])

  const sendMsg = () => {
    if (!msg.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), user: 'Tú', text: msg, isTutor: false }])
    setMsg('')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0a1628' }}>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div>
          <p className="text-white font-semibold">{tutoria.subject}</p>
          <p className="text-white/50 text-xs">{tutoria.topic} · {tutoria.tutor}</p>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Clock size={14}/><span>32:05</span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        <div className="flex-1 grid grid-rows-2 gap-4">
          <div className="rounded-2xl flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #10314e, #012b5c)' }}>
            <div className="text-center text-white/20">
              <Camera size={48}/><p className="text-sm mt-2">{tutoria.tutor}</p>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">Tutor</div>
          </div>
          <div className="rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a2f4a, #0d2038)' }}>
            <div className="text-center text-white/20">
              <Camera size={36}/><p className="text-sm mt-2">Tú</p>
            </div>
          </div>
        </div>
        <div className="w-72 flex flex-col border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 text-white font-semibold text-sm">Chat privado</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map(m => (
              <div key={m.id} className={m.isTutor ? '' : 'text-right'}>
                <p className={`text-xs font-semibold ${m.isTutor ? 'text-brand-light' : 'text-brand-soft'}`}>{m.user}</p>
                <p className="text-white/80 text-sm mt-0.5">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder-white/30 focus:outline-none"
              placeholder="Mensaje..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key==='Enter'&&sendMsg()}/>
            <button onClick={sendMsg}><Send size={14} className="text-brand-soft"/></button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 py-4 border-t border-white/10">
        <button onClick={() => setMic(!mic)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${mic ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {mic ? <Mic size={18}/> : <MicOff size={18}/>}<span className="text-xs">Mic</span>
        </button>
        <button onClick={() => setCam(!cam)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${cam ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {cam ? <Camera size={18}/> : <CameraOff size={18}/>}<span className="text-xs">Cam</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20">
          <Monitor size={18}/><span className="text-xs">Compartir</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20">
          <MessageSquare size={18}/><span className="text-xs">Chat</span>
        </button>
        <div className="w-px h-8 bg-white/10"/>
        <button onClick={onLeave} className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white">
          <PhoneOff size={18}/><span className="text-xs">Finalizar</span>
        </button>
      </div>
    </div>
  )
}

function RequestForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ subject: '', topic: '', doubt: '', level: '' })
  const [matching, setMatching] = useState(false)
  const [matched, setMatched] = useState(false)

  const doMatch = async () => {
    setMatching(true)
    await new Promise(r => setTimeout(r, 2000))
    setMatching(false)
    setMatched(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-brand-light/30">
          <h2 className="font-bold text-brand-dark">Solicitar tutoría personalizada</h2>
          <button onClick={onClose}><X size={18} className="text-brand-soft"/></button>
        </div>
        <div className="p-5 space-y-4">
          {!matched ? (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Materia</label>
                <input className="input" placeholder="Ej: Matemáticas Financieras" value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Tema específico</label>
                <input className="input" placeholder="Ej: Valor presente neto" value={form.topic}
                  onChange={e => setForm({...form, topic: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Describe tu duda</label>
                <textarea className="input resize-none h-20" placeholder="¿Qué no entiendes exactamente?"
                  value={form.doubt} onChange={e => setForm({...form, doubt: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Nivel de dificultad</label>
                <div className="flex gap-2">
                  {['Básico','Intermedio','Avanzado'].map(l => (
                    <button key={l} onClick={() => setForm({...form, level: l})}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${form.level===l ? 'bg-brand-accent text-white' : 'bg-brand-light/40 text-brand-soft hover:bg-brand-light'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={doMatch} disabled={matching}
                className="btn-primary w-full flex items-center justify-center gap-2">
                {matching ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Buscando tutor ideal...</>
                ) : 'Buscar tutor con IA'}
              </button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Star size={28} className="text-green-500"/>
              </div>
              <p className="font-bold text-brand-dark">¡Tutor encontrado!</p>
              <div className="p-4 rounded-xl bg-brand-light/30 text-left">
                <p className="font-semibold text-brand-dark">Dr. Carlos Méndez</p>
                <p className="text-brand-soft text-sm">Especialista en Finanzas · 4.9 ⭐ · 142 sesiones</p>
                <p className="text-brand-accent text-sm font-medium mt-2">Disponible: Mañana 11:00 AM</p>
              </div>
              <button className="btn-primary w-full" onClick={onClose}>Confirmar sesión</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Tutorias() {
  const [activeSession, setActiveSession] = useState<Tutoria | null>(null)
  const [showRequest, setShowRequest] = useState(false)

  if (activeSession) return <TutoriaRoom tutoria={activeSession} onLeave={() => setActiveSession(null)} />

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {showRequest && <RequestForm onClose={() => setShowRequest(false)} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Tutorías personalizadas</h1>
        <button className="btn-primary" onClick={() => setShowRequest(true)}>+ Solicitar tutoría</button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-soft"/>
        <input className="input pl-9" placeholder="Buscar por materia, tutor o tema..."/>
      </div>

      <div className="space-y-3">
        {mockTutorias.map(t => (
          <div key={t.id} className="card p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <Avatar initials={t.tutorAvatar} size="md" color="#045b96"/>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-dark">{t.subject}</p>
              <p className="text-brand-soft text-sm">{t.topic}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-brand-soft">
                <span>{t.tutor}</span>
                <span className="flex items-center gap-1"><Clock size={10}/>{t.time} · {t.date.split('-').slice(1).join('/')}</span>
                <span className="flex items-center gap-1"><BookOpen size={10}/>{t.duration} min</span>
              </div>
            </div>
            {t.rating && (
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                <Star size={14} fill="currentColor"/>{t.rating}
              </div>
            )}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              t.status === 'scheduled' ? 'bg-brand-accent/10 text-brand-accent' :
              t.status === 'completed' ? 'bg-green-100 text-green-600' :
              'bg-red-100 text-red-500'
            }`}>
              {t.status === 'scheduled' ? 'Agendada' : t.status === 'completed' ? 'Completada' : 'Cancelada'}
            </span>
            {t.status === 'scheduled' && (
              <button onClick={() => setActiveSession(t)} className="btn-primary text-sm py-2">
                <ChevronRight size={16}/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
