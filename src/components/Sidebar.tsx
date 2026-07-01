import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Video, Users, Calendar, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { icon: Home,        label: 'Inicio',       path: '/home' },
  { icon: BookOpen,    label: 'Materias',      path: '/materias' },
  { icon: Video,       label: 'Webinars',      path: '/webinars' },
  { icon: Users,       label: 'Tutorías',      path: '/tutorias' },
  { icon: Users,       label: 'Grupales',      path: '/grupales' },
  { icon: Calendar,    label: 'Calendario',    path: '/calendario' },
  { icon: PlayCircle,  label: 'Grabaciones',   path: '/grabaciones' },
]

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className="fixed left-0 top-16 bottom-0 z-40 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? 64 : 220,
        background: 'linear-gradient(180deg, #10314e 0%, #012b5c 100%)',
      }}
    >
      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={collapsed ? label : undefined}
              className={`
                w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 relative group
                ${active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
                }
              `}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-light rounded-r-full" />
              )}
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{label}</span>
              )}
              {collapsed && (
                <span className="absolute left-16 bg-brand-dark text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center p-3 text-white/40 hover:text-white hover:bg-white/10 transition-all border-t border-white/10"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  )
}
