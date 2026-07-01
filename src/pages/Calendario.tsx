import { useState } from 'react'
import { ChevronLeft, ChevronRight, Video, BookOpen, Users, CheckSquare, Bell } from 'lucide-react'
import { mockEvents } from '../data/mock'

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

const typeIcons = {
  webinar: Video,
  tutoria: BookOpen,
  grupal: Users,
  tarea: CheckSquare,
  recordatorio: Bell,
}

const typeColors = {
  webinar: '#045b96',
  tutoria: '#5f92ae',
  grupal: '#10314e',
  tarea: '#012b5c',
  recordatorio: '#8b9ab5',
}

export default function Calendario() {
  const [current, setCurrent] = useState(new Date(2026, 6, 1))
  const [selected, setSelected] = useState<string | null>(null)

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  const getEvents = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockEvents.filter(e => e.date === dateStr)
  }

  const selectedEvents = selected ? mockEvents.filter(e => e.date === selected) : []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Calendario académico</h1>
        <div className="flex items-center gap-2">
          <button className="nav-icon bg-brand-dark p-2 rounded-xl text-white"
            onClick={() => setCurrent(new Date(year, month - 1, 1))}>
            <ChevronLeft size={18}/>
          </button>
          <span className="text-brand-dark font-semibold w-40 text-center">
            {MONTHS[month]} {year}
          </span>
          <button className="nav-icon bg-brand-dark p-2 rounded-xl text-white"
            onClick={() => setCurrent(new Date(year, month + 1, 1))}>
            <ChevronRight size={18}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 card p-4">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-brand-soft py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const events = getEvents(day)
              const isSelected = selected === dateStr
              const isToday = dateStr === '2026-07-01'

              return (
                <button key={i} onClick={() => setSelected(isSelected ? null : dateStr)}
                  className={`min-h-16 p-1.5 rounded-xl flex flex-col transition-all ${
                    isSelected ? 'bg-brand-accent text-white shadow-md' :
                    isToday ? 'bg-brand-light text-brand-dark' :
                    'hover:bg-brand-light/40 text-brand-dark'
                  }`}>
                  <span className="text-sm font-medium self-end">{day}</span>
                  <div className="flex flex-col gap-0.5 mt-auto">
                    {events.slice(0, 2).map(e => (
                      <div key={e.id} className="text-[9px] px-1 py-0.5 rounded truncate text-white"
                        style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : e.color }}>
                        {e.title.split(':')[0]}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[9px] text-center opacity-60">+{events.length - 2}</div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Event detail / upcoming */}
        <div className="card p-4 space-y-4">
          <h2 className="font-semibold text-brand-dark">
            {selected ? `Eventos — ${selected.split('-').slice(1).join('/')}` : 'Próximos eventos'}
          </h2>
          <div className="space-y-2">
            {(selectedEvents.length > 0 ? selectedEvents : mockEvents.slice(0, 5)).map(e => {
              const Icon = typeIcons[e.type]
              return (
                <div key={e.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-light/20 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${e.color}20` }}>
                    <Icon size={14} style={{ color: e.color }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark line-clamp-1">{e.title}</p>
                    <p className="text-xs text-brand-soft">{e.time}{e.duration > 0 ? ` · ${e.duration} min` : ''}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: e.color }}/>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="border-t border-brand-light/30 pt-3">
            <p className="text-xs font-semibold text-brand-soft mb-2">Tipos de eventos</p>
            <div className="space-y-1.5">
              {Object.entries(typeColors).map(([type, color]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons]
                const labels: Record<string, string> = { webinar: 'Webinar', tutoria: 'Tutoría', grupal: 'Asesoría grupal', tarea: 'Tarea', recordatorio: 'Recordatorio' }
                return (
                  <div key={type} className="flex items-center gap-2 text-xs text-brand-soft">
                    <Icon size={12} style={{ color }}/>
                    <span>{labels[type]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
