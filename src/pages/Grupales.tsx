import { useState } from 'react'
import { Search, Users, DollarSign, BookOpen, Mic, MicOff, Camera, CameraOff, MessageSquare, Monitor, PhoneOff, Send, X } from 'lucide-react'
import Avatar from '../components/Avatar'

const groups = [
  { id: 'g1', subject: 'Microeconomía', topic: 'Elasticidad precio-demanda', tutor: 'Dra. Elena Ruiz', participants: 3, maxParticipants: 5, cost: 150, level: 'Intermedio' },
  { id: 'g2', subject: 'Estadística', topic: 'Regresión lineal múltiple', tutor: 'Dr. Luis Herrera', participants: 2, maxParticipants: 5, cost: 120, level: 'Avanzado' },
  { id: 'g3', subject: 'Marketing Digital', topic: 'SEO y SEM básico', tutor: 'Lic. Sofía Ramírez', participants: 4, maxParticipants: 5, cost: 100, level: 'Básico' },
]

function GroupRoom({ group, onLeave }: { group: typeof groups[0]; onLeave: () => void }) {
  const [mic, setMic] = useState(true)
  const [cam, setCam] = useState(true)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, user: group.tutor, text: 'Bienvenidos al grupo de estudio', isTutor: true },
    { id: 2, user: 'Luis M.', text: 'Listo para empezar', isTutor: false },
  ])

  const participants = [group.tutor, 'Ana G.', 'Luis M.', 'Sofía R.'].slice(0, group.participants + 1)

  const sendMsg = () => {
    if (!msg.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), user: 'Ana G.', text: msg, isTutor: false }])
    setMsg('')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0a1628' }}>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div>
          <p className="text-white font-semibold">{group.subject} — {group.topic}</p>
          <p className="text-white/50 text-xs">{group.participants + 1} participantes</p>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Video grid */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {participants.map((p, i) => (
            <div key={p} className="rounded-2xl flex items-center justify-center relative min-h-32"
              style={{ background: `hsl(${210 + i*25}, 50%, ${18+i*5}%)` }}>
              <div className="text-center text-white/30">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto"
                  style={{ background: `hsl(${210+i*25}, 60%, 35%)` }}>
                  {p.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <p className="text-xs mt-2 text-white/50">{p}</p>
              </div>
              {i===0 && <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">Tutor</div>}
            </div>
          ))}
        </div>
        {/* Chat */}
        <div className="w-72 flex flex-col border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white font-semibold text-sm">Chat grupal</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map(m => (
              <div key={m.id}>
                <p className={`text-xs font-semibold ${m.isTutor ? 'text-brand-light' : 'text-white/50'}`}>{m.user}</p>
                <p className="text-white/80 text-sm">{m.text}</p>
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
        <button onClick={() => setMic(!mic)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${mic ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {mic ? <Mic size={18}/> : <MicOff size={18}/>}<span className="text-xs">Mic</span>
        </button>
        <button onClick={() => setCam(!cam)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${cam ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {cam ? <Camera size={18}/> : <CameraOff size={18}/>}<span className="text-xs">Cam</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white">
          <Monitor size={18}/><span className="text-xs">Compartir</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white">
          <MessageSquare size={18}/><span className="text-xs">Chat</span>
        </button>
        <div className="w-px h-8 bg-white/10"/>
        <button onClick={onLeave} className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white">
          <PhoneOff size={18}/><span className="text-xs">Salir</span>
        </button>
      </div>
    </div>
  )
}

export default function Grupales() {
  const [activeGroup, setActiveGroup] = useState<typeof groups[0] | null>(null)

  if (activeGroup) return <GroupRoom group={activeGroup} onLeave={() => setActiveGroup(null)} />

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Asesorías grupales</h1>
        <p className="text-brand-soft text-sm">Máx. 5 participantes por sesión</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-soft"/>
        <input className="input pl-9" placeholder="Buscar por materia, tema o tutor..."/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(g => (
          <div key={g.id} className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-brand-accent"/>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-brand-dark">{g.subject}</p>
                <p className="text-brand-soft text-sm">{g.topic}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                g.level === 'Básico' ? 'bg-green-100 text-green-600' :
                g.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-500'
              }`}>{g.level}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Avatar initials={g.tutor.split(' ').map(w=>w[0]).join('').slice(0,2)} size="xs" color="#5f92ae"/>
              <span className="text-sm text-brand-soft">{g.tutor}</span>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-1 text-brand-soft">
                <Users size={14}/>
                <span>{g.participants}/{g.maxParticipants} participantes</span>
              </div>
              <div className="flex items-center gap-1 text-brand-accent font-semibold">
                <DollarSign size={14}/>
                <span>${(g.cost / (g.participants + 1)).toFixed(0)} c/u</span>
              </div>
            </div>

            {/* Participants bar */}
            <div className="flex gap-1 mb-4">
              {Array.from({length: g.maxParticipants}).map((_,i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i < g.participants ? 'bg-brand-accent' : 'bg-brand-light'}`}/>
              ))}
            </div>

            <button onClick={() => setActiveGroup(g)}
              disabled={g.participants >= g.maxParticipants}
              className="btn-primary w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0">
              {g.participants >= g.maxParticipants ? 'Grupo lleno' : 'Unirse al grupo'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
