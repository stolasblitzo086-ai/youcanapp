import React, { createContext, useContext, useState } from 'react'
import type { User, Notification } from '../types'
import { mockUser, mockNotifications } from '../data/mock'

interface AppContextType {
  user: User
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  unreadCount: number
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>(mockUser)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AppContext.Provider value={{ user, notifications, markNotificationRead, unreadCount }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
