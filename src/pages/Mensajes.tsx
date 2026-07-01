import { useState } from 'react'
import { Send, Search } from 'lucide-react'
import Avatar from '../components/Avatar'

const contacts = [
  { id: 'c1', name: 'Dr. Carlos Méndez', role: 'Tutor', avatar: 'CM', color: '#045b96', lastMsg: 'Nos vemos mañana a las 11', time: '10:42', unread: 2 },
  { id: 'c2', name: 'Lic. Sofía Ramírez', role: 'Tutora', avatar: 'SR', color: '#5f92ae', lastMsg: 'Las diapositivas ya están subidas', time: '09:15', unread: 0 },
  { id: 'c3', name: 'Dra. Elena Ruiz', role: 'Tutora', avatar: 'ER', color: '#10314e', lastMsg: '¿Pudiste revisar el ejercicio?', time: 'Ayer', unread: 1 },
]

const initialMessages: Record<string, { id: number; text: string; from: 'me' | 'other'; time: string }[]> = {
  c1: [
    { id: 1, text: 'Hola! ¿Quedaste con dudas de la última clase?', from: 'other', time: '10:30' },
    { id: 2, text: 'Sí, no entendí bien la parte de TIR', from: 'me', time: '10:35' },
    { id: 3, text: 'Nos vemos mañana a las 11 y lo repasamos', from: 'other', time: '10:42' },
  ],
  c2: [
    { id: 1, text: 'Las diapositivas ya están subidas en la plataforma', from: 'other', time: '09:15' },
  ],
  c3: [
    { id: 1, text: '¿Pudiste revisar el ejercicio que dejé?', from: 'other', time: 'Ayer' },
  ],
}

export default function Mensajes() {
  const [selected, setSelected] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [msg, setMsg] = useState('')

  const send = () => {
    if (!msg.trim()) return
    setMessages(prev => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), { id: Date.now(), text: msg, from: 'me', time: 'Ahora' }]
    }))
    setMsg('')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Mensajes</h1>
      <div className="card flex overflow-hidden" style={{ height: '70vh' }}>
        {/* Sidebar */}
        <div className="w-72 border-r border-brand-light/30 flex flex-col">
          <div className="p-3 border-b border-brand-light/30">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-soft"/>
              <input className="input pl-8 text-sm py-2" placeholder="Buscar..."/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(c => (
              <button key={c.id} onClick={() => setSelected(c)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-brand-light/20 transition-colors text-left ${selected.id === c.id ? 'bg-brand-light/30' : ''}`}>
                <div className="relative">
                  <Avatar initials={c.avatar} size="md" color={c.color}/>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand-dark truncate">{c.name}</p>
                    <p className="text-xs text-brand-soft flex-shrink-0">{c.time}</p>
                  </div>
                  <p className="text-xs text-brand-soft truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center flex-shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-4 border-b border-brand-light/30 flex items-center gap-3">
            <Avatar initials={selected.avatar} size="sm" color={selected.color}/>
            <div>
              <p className="font-semibold text-brand-dark text-sm">{selected.name}</p>
              <p className="text-xs text-green-500">En línea</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {(messages[selected.id] || []).map(m => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                  m.from === 'me'
                    ? 'bg-brand-accent text-white rounded-br-sm'
                    : 'bg-brand-light/50 text-brand-dark rounded-bl-sm'
                }`}>
                  {m.text}
                  <p className={`text-xs mt-1 ${m.from === 'me' ? 'text-white/60' : 'text-brand-soft'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-brand-light/30 flex gap-3">
            <input
              className="input flex-1"
              placeholder="Escribe un mensaje..."
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button onClick={send} className="btn-primary px-4">
              <Send size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
