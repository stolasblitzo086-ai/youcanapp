import { PlayCircle, Clock, Users, Download } from 'lucide-react'
import { mockWebinars } from '../data/mock'

export default function Grabaciones() {
  const recorded = mockWebinars.filter(w => w.status === 'recorded')

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Grabaciones disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...recorded, ...recorded].map((w, i) => (
          <div key={`${w.id}-${i}`} className="card overflow-hidden hover:shadow-md transition-all cursor-pointer group">
            <div className="h-36 flex items-center justify-center relative" style={{ backgroundColor: w.thumbnail }}>
              <PlayCircle size={48} className="text-white/30 group-hover:text-white/60 transition-all group-hover:scale-110"/>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                {w.duration} min
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-brand-dark">{w.title}</p>
              <p className="text-brand-soft text-sm mt-1">{w.tutor}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-brand-soft">
                  <span className="flex items-center gap-1"><Users size={11}/>{w.participants}</span>
                  <span className="flex items-center gap-1"><Clock size={11}/>{w.duration} min</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-dark font-medium transition-colors">
                  <Download size={12}/>Descargar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
