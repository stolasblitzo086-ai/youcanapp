import { useState } from 'react'
import { Video, Users, Clock, Mic, MicOff, Camera, CameraOff, Monitor, Hand, MessageSquare, X, Send, PhoneOff, Maximize } from 'lucide-react'
import { mockWebinars } from '../data/mock'
import type { Webinar } from '../types'

function WebinarRoom({ webinar, onLeave }: { webinar: Webinar; onLeave: () => void }) {
  const [mic, setMic] = useState(false)
  const [cam, setCam] = useState(false)
  const [hand, setHand] = useState(false)
  const [chat, setChat] = useState(true)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, user: 'Dr. Carlos Méndez', text: 'Bienvenidos a la sesión de hoy', time: '10:01', isTutor: true },
    { id: 2, user: 'Ana García', text: 'Gracias tutor, listo para empezar', time: '10:02', isTutor: false },
    { id: 3, user: 'Luis Pérez', text: '¿Pueden compartir las diapositivas?', time: '10:03', isTutor: false },
    { id: 4, user: 'Dr. Carlos Méndez', text: 'Sí, las compartiré en un momento', time: '10:04', isTutor: true },
  ])

  const sendMsg = () => {
    if (!msg.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), user: 'Ana García', text: msg, time: '10:05', isTutor: false }])
    setMsg('')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0a1628' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="badge-live"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>EN VIVO</span>
          <span className="text-white font-semibold text-sm">{webinar.title}</span>
        </div>
        <div className="flex items-center gap-3 text-white/60 text-sm">
          <Users size={14}/><span>{webinar.participants} participantes</span>
          <Clock size={14}/><span>45:12</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main video */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #10314e, #012b5c)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/30">
                <Video size={64}/>
                <p className="mt-2 text-sm">Transmisión en vivo</p>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">{webinar.tutor}</div>
            <div className="absolute top-3 right-3"><Maximize size={16} className="text-white/60"/></div>
          </div>
          {/* Participants strip */}
          <div className="flex gap-2">
            {Array.from({length: 4}).map((_,i) => (
              <div key={i} className="w-20 h-14 rounded-xl flex items-center justify-center text-white text-xs font-semibold"
                style={{ background: `hsl(${210 + i*20}, 60%, ${20+i*8}%)` }}>
                {['AM','LH','SR','JP'][i]}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        {chat && (
          <div className="w-72 flex flex-col border-l border-white/10">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Chat</span>
              <button onClick={() => setChat(false)} className="text-white/40 hover:text-white"><X size={14}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map(m => (
                <div key={m.id}>
                  <p className={`text-xs font-semibold ${m.isTutor ? 'text-brand-light' : 'text-white/60'}`}>{m.user}</p>
                  <p className="text-white/80 text-sm mt-0.5">{m.text}</p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-soft"
                placeholder="Escribe un mensaje..."
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg} className="text-brand-soft hover:text-white p-1.5"><Send size={14}/></button>
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-3 py-4 border-t border-white/10 px-6">
        <button onClick={() => setMic(!mic)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${mic ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {mic ? <Mic size={18}/> : <MicOff size={18}/>}
          <span className="text-xs">{mic ? 'Silenciar' : 'Activar mic'}</span>
        </button>
        <button onClick={() => setCam(!cam)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${cam ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {cam ? <Camera size={18}/> : <CameraOff size={18}/>}
          <span className="text-xs">{cam ? 'Detener cam' : 'Activar cam'}</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all">
          <Monitor size={18}/><span className="text-xs">Compartir</span>
        </button>
        <button onClick={() => setHand(!hand)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${hand ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white'}`}>
          <Hand size={18}/><span className="text-xs">Levantar mano</span>
        </button>
        <button onClick={() => setChat(!chat)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${chat ? 'bg-brand-accent/30 text-brand-light' : 'bg-white/10 text-white'}`}>
          <MessageSquare size={18}/><span className="text-xs">Chat</span>
        </button>
        <div className="w-px h-8 bg-white/10 mx-2"/>
        <button onClick={onLeave}
          className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all">
          <PhoneOff size={18}/><span className="text-xs">Salir</span>
        </button>
      </div>
    </div>
  )
}

export default function Webinars() {
  const [activeRoom, setActiveRoom] = useState<Webinar | null>(null)
  const [tab, setTab] = useState<'live' | 'upcoming' | 'recorded'>('live')

  const filtered = mockWebinars.filter(w => w.status === tab)

  if (activeRoom) return <WebinarRoom webinar={activeRoom} onLeave={() => setActiveRoom(null)} />

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Webinars</h1>
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-brand-light/30">
          {(['live','upcoming','recorded'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-brand-dark text-white shadow-sm' : 'text-brand-soft hover:text-brand-dark'}`}>
              {t === 'live' ? 'En vivo' : t === 'upcoming' ? 'Próximos' : 'Grabados'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(w => (
          <div key={w.id} className="card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="h-36 flex items-center justify-center relative" style={{ backgroundColor: w.thumbnail }}>
              {w.status === 'live' && (
                <span className="badge-live absolute top-3 left-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>EN VIVO
                </span>
              )}
              {w.status === 'live' && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                  <Users size={10}/>{w.participants}
                </div>
              )}
              <Video size={36} className="text-white/30"/>
            </div>
            <div className="p-4">
              <p className="font-semibold text-brand-dark text-sm line-clamp-2">{w.title}</p>
              <p className="text-brand-soft text-xs mt-1">{w.tutor}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-brand-soft">
                <span className="flex items-center gap-1"><Clock size={11}/>{w.duration} min</span>
                <span className="flex items-center gap-1"><Video size={11}/>{w.subject}</span>
              </div>
              <button
                onClick={() => w.status !== 'upcoming' && setActiveRoom(w)}
                className={`w-full mt-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  w.status === 'live' ? 'bg-red-500 hover:bg-red-600 text-white' :
                  w.status === 'upcoming' ? 'bg-brand-light text-brand-soft cursor-not-allowed' :
                  'bg-brand-accent hover:bg-brand-dark text-white'
                }`}
              >
                {w.status === 'live' ? 'Entrar ahora' : w.status === 'upcoming' ? `Inicia ${w.startTime}` : 'Ver grabación'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
