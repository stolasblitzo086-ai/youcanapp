import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Bell, Calendar, Video, MessageCircle, User,
  ChevronDown, Search, X, BookOpen, Clock, Zap
} from 'lucide-react'
import Logo from './Logo'
import Avatar from './Avatar'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, notifications, markNotificationRead, unreadCount } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const navItems = [
    { icon: Calendar, label: 'Calendario', path: '/calendario' },
    { icon: Bell, label: 'Notificaciones', path: null, action: () => setShowNotifications(!showNotifications) },
    { icon: Video, label: 'Webinars', path: '/webinars' },
    { icon: MessageCircle, label: 'Mensajes', path: '/mensajes' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ]

  const notifIcons: Record<string, typeof Bell> = {
    webinar: Video,
    session: BookOpen,
    resource: Zap,
    message: MessageCircle,
    reminder: Clock,
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16" style={{ background: 'linear-gradient(135deg, #012b5c 0%, #10314e 100%)' }}>
      <div className="h-full flex items-center justify-between px-6">
        {/* Left: nav icons */}
        <div className="flex items-center gap-1">
          {navItems.map(({ icon: Icon, label, path, action }) => (
            <button
              key={label}
              onClick={() => action ? action() : path && navigate(path)}
              className={`nav-icon relative ${path && location.pathname === path ? 'bg-white/15 text-white' : ''}`}
              title={label}
            >
              <Icon size={20} />
              {label === 'Notificaciones' && unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => navigate('/home')}>
          <Logo size="md" variant="white" />
        </div>

        {/* Right: search + user */}
        <div className="flex items-center gap-3">
          <button className="nav-icon">
            <Search size={18} />
          </button>
          <button
            className="flex items-center gap-2 hover:bg-white/10 rounded-xl px-3 py-1.5 transition-all"
            onClick={() => setShowProfile(!showProfile)}
          >
            <Avatar initials={user.avatar} size="sm" color="#5f92ae" />
            <span className="text-white text-sm font-medium hidden md:block">{user.name.split(' ')[0]}</span>
            <ChevronDown size={14} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Notifications panel */}
      {showNotifications && (
        <div className="absolute top-16 left-4 w-96 bg-white rounded-2xl shadow-2xl border border-brand-light/30 overflow-hidden z-50">
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-light/30">
            <h3 className="font-semibold text-brand-dark">Notificaciones</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="text-xs text-brand-accent font-medium">{unreadCount} nuevas</span>
              )}
              <button onClick={() => setShowNotifications(false)} className="text-brand-soft hover:text-brand-dark">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(n => {
              const Icon = notifIcons[n.type] || Bell
              return (
                <button
                  key={n.id}
                  className={`w-full flex items-start gap-3 px-5 py-3.5 hover:bg-brand-light/20 transition-colors text-left ${!n.read ? 'bg-brand-light/10' : ''}`}
                  onClick={() => markNotificationRead(n.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${!n.read ? 'bg-brand-accent/15' : 'bg-brand-light/50'}`}>
                    <Icon size={14} className={!n.read ? 'text-brand-accent' : 'text-brand-soft'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark">{n.title}</p>
                    <p className="text-xs text-brand-soft mt-0.5 line-clamp-1">{n.body}</p>
                  </div>
                  <span className="text-xs text-brand-soft/60 flex-shrink-0">{n.time}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Profile dropdown */}
      {showProfile && (
        <div className="absolute top-16 right-4 w-52 bg-white rounded-2xl shadow-2xl border border-brand-light/30 overflow-hidden z-50">
          <div className="px-4 py-4 border-b border-brand-light/20">
            <p className="font-semibold text-brand-dark text-sm">{user.name}</p>
            <p className="text-xs text-brand-soft mt-0.5">{user.email}</p>
          </div>
          {[
            { label: 'Mi perfil', path: '/perfil' },
            { label: 'Configuración', path: '/configuracion' },
          ].map(item => (
            <button
              key={item.label}
              className="w-full text-left px-4 py-2.5 text-sm text-brand-dark hover:bg-brand-light/30 transition-colors"
              onClick={() => { navigate(item.path); setShowProfile(false) }}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-brand-light/20">
            <button
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => navigate('/')}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
