import { useState } from 'react'
import { BookOpen, Clock, User, ChevronRight, PlayCircle, FileText, Zap, MessageCircle } from 'lucide-react'
import { mockSubjects } from '../data/mock'
import type { Subject } from '../types'

function SubjectDetail({ subject, onBack }: { subject: Subject; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'clases' | 'recursos' | 'quizzes' | 'notas'>('clases')

  const sidebarItems = [
    { icon: PlayCircle, label: 'Clases grabadas', tab: 'clases' as const },
    { icon: FileText,   label: 'Recursos',         tab: 'recursos' as const },
    { icon: Zap,        label: 'Quizzes IA',        tab: 'quizzes' as const },
    { icon: MessageCircle, label: 'Asistente IA',  tab: 'notas' as const },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <button onClick={onBack} className="text-brand-soft hover:text-brand-dark text-sm flex items-center gap-1">
        ← Volver a materias
      </button>

      <div className="card overflow-hidden">
        <div className="h-40 flex items-end p-6 relative"
          style={{ background: `linear-gradient(135deg, ${subject.color}, #012b5c)` }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white, transparent)' }}/>
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{subject.area} · {subject.plan}</p>
            <h2 className="text-white text-2xl font-bold mt-1">{subject.name}</h2>
          </div>
        </div>
        <div className="p-4 flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-brand-soft">
            <User size={14}/><span>{subject.tutor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-soft">
            <Clock size={14}/><span>Próxima: {subject.nextClass}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-32 h-2 bg-brand-light rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}/>
            </div>
            <span className="text-sm font-semibold" style={{ color: subject.color }}>{subject.progress}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main content */}
        <div className="lg:col-span-3 card p-4">
          <div className="flex gap-1 mb-4">
            {sidebarItems.map(({ icon: Icon, label, tab }) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-brand-dark text-white' : 'text-brand-soft hover:text-brand-dark hover:bg-brand-light/40'
                }`}>
                <Icon size={14}/>{label}
              </button>
            ))}
          </div>

          {activeTab === 'clases' && (
            <div className="space-y-2">
              {Array.from({length:4}, (_,i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-light/20 transition-colors cursor-pointer">
                  <div className="w-16 h-12 rounded-lg flex items-center justify-center" style={{ background: `${subject.color}20` }}>
                    <PlayCircle size={20} style={{ color: subject.color }}/>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-dark">Clase {i+1}: {['Introducción','Conceptos clave','Casos prácticos','Evaluación'][i]}</p>
                    <p className="text-xs text-brand-soft">45 min · {['Lun 10:00','Mié 10:00','Vie 10:00','Lun 10:00'][i]}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${i<2 ? 'bg-green-100 text-green-600' : 'bg-brand-light text-brand-soft'}`}>
                    {i<2 ? 'Completada' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recursos' && (
            <div className="grid grid-cols-2 gap-3">
              {['Diapositivas Clase 1','Diapositivas Clase 2','Caso práctico','Bibliografía recomendada'].map(r => (
                <div key={r} className="p-4 rounded-xl bg-brand-light/20 hover:bg-brand-light/40 transition-colors cursor-pointer">
                  <FileText size={20} style={{ color: subject.color }}/>
                  <p className="text-sm font-medium text-brand-dark mt-2">{r}</p>
                  <p className="text-xs text-brand-soft mt-1">PDF · Subido por el tutor</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="space-y-3">
              {['Quiz rápido: Introducción','Evaluación parcial','Quiz generado con IA'].map((q,i) => (
                <div key={q} className="p-4 rounded-xl border border-brand-light/40 hover:border-brand-accent/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-brand-dark text-sm">{q}</p>
                      <p className="text-xs text-brand-soft mt-0.5">10 preguntas · {['5','15','Ilimitado'][i]} min</p>
                    </div>
                    <button className="btn-primary text-xs py-1.5 px-4">Iniciar</button>
                  </div>
                  {i===2 && <div className="mt-2 flex items-center gap-1 text-xs text-brand-accent"><Zap size={11}/>Generado con IA sobre tus notas</div>}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notas' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-brand-light/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-brand-accent"/>
                  <span className="text-sm font-semibold text-brand-dark">Asistente IA — {subject.name}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded-xl text-brand-soft">¡Hola! Soy tu asistente para {subject.name}. ¿Qué duda tienes?</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <input className="input flex-1 text-sm" placeholder="Escribe tu duda..."/>
                  <button className="btn-primary text-sm px-4">Enviar</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="card p-4 space-y-4">
          <h3 className="font-semibold text-brand-dark text-sm">Accesos rápidos</h3>
          {sidebarItems.map(({ icon: Icon, label, tab }) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-light/30 transition-colors text-left">
              <Icon size={16} style={{ color: subject.color }}/>
              <span className="text-sm text-brand-dark">{label}</span>
              <ChevronRight size={14} className="ml-auto text-brand-soft/40"/>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Materias() {
  const [selected, setSelected] = useState<Subject | null>(null)
  const [area, setArea] = useState<string>('all')

  if (selected) return <SubjectDetail subject={selected} onBack={() => setSelected(null)} />

  const areas = ['all', ...Array.from(new Set(mockSubjects.map(s => s.area)))]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Planes de estudio</h1>
      </div>

      {/* Area filter */}
      <div className="flex gap-2">
        {areas.map(a => (
          <button key={a} onClick={() => setArea(a)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              area === a ? 'bg-brand-dark text-white' : 'bg-white text-brand-soft hover:text-brand-dark border border-brand-light/40'
            }`}>
            {a === 'all' ? 'Todas las áreas' : a}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSubjects.filter(s => area === 'all' || s.area === area).map(s => (
          <button key={s.id} onClick={() => setSelected(s)}
            className="card p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.color}18` }}>
                <BookOpen size={22} style={{ color: s.color }}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-brand-soft font-medium">{s.area} → {s.plan}</p>
                <p className="font-semibold text-brand-dark mt-1">{s.name}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-brand-soft">
                  <User size={11}/><span>{s.tutor}</span>
                  <span>·</span>
                  <Clock size={11}/><span>{s.nextClass}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-brand-soft/30 group-hover:text-brand-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"/>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brand-soft">Progreso</span>
                <span className="font-semibold" style={{ color: s.color }}>{s.progress}%</span>
              </div>
              <div className="h-1.5 bg-brand-light rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${s.progress}%`, backgroundColor: s.color }}/>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
