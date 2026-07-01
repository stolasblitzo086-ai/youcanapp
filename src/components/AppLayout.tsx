import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#eef4f8' }}>
      <Navbar />
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main
        className="pt-16 min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 64 : 220 }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
