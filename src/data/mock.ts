import type { User, Webinar, Tutoria, CalendarEvent, Subject, Notification } from '../types'

export const mockUser: User = {
  id: 'USR-2024-001',
  name: 'Ana García',
  email: 'ana.garcia@youcanapp.com',
  avatar: 'AG',
  membership: 'premium',
  hoursStudied: 142,
  sessionsTaken: 38,
  progress: 72,
}

export const mockWebinars: Webinar[] = [
  {
    id: 'w1',
    title: 'Fundamentos de Finanzas Corporativas',
    tutor: 'Dr. Carlos Méndez',
    subject: 'Finanzas',
    status: 'live',
    participants: 47,
    startTime: '10:00',
    duration: 90,
    thumbnail: '#045b96',
  },
  {
    id: 'w2',
    title: 'Marketing Digital Avanzado',
    tutor: 'Lic. Sofía Ramírez',
    subject: 'Marketing',
    status: 'upcoming',
    participants: 0,
    startTime: '14:00',
    duration: 60,
    thumbnail: '#10314e',
  },
  {
    id: 'w3',
    title: 'Liderazgo y Gestión de Equipos',
    tutor: 'MBA. Roberto Torres',
    subject: 'Administración',
    status: 'upcoming',
    participants: 0,
    startTime: '16:30',
    duration: 75,
    thumbnail: '#5f92ae',
  },
  {
    id: 'w4',
    title: 'Contabilidad Financiera',
    tutor: 'Lic. María López',
    subject: 'Contabilidad',
    status: 'recorded',
    participants: 124,
    startTime: '09:00',
    duration: 90,
    thumbnail: '#012b5c',
  },
  {
    id: 'w5',
    title: 'Estadística Aplicada a los Negocios',
    tutor: 'Dr. Luis Herrera',
    subject: 'Estadística',
    status: 'recorded',
    participants: 89,
    startTime: '11:00',
    duration: 80,
    thumbnail: '#5f92ae',
  },
]

export const mockTutorias: Tutoria[] = [
  {
    id: 't1',
    subject: 'Matemáticas Financieras',
    topic: 'Valor presente neto y TIR',
    tutor: 'Dr. Carlos Méndez',
    tutorAvatar: 'CM',
    date: '2026-07-03',
    time: '11:00',
    duration: 60,
    status: 'scheduled',
  },
  {
    id: 't2',
    subject: 'Derecho Empresarial',
    topic: 'Contratos mercantiles',
    tutor: 'Lic. Patricia Vega',
    tutorAvatar: 'PV',
    date: '2026-07-05',
    time: '15:00',
    duration: 45,
    status: 'scheduled',
  },
  {
    id: 't3',
    subject: 'Microeconomía',
    topic: 'Elasticidad precio-demanda',
    tutor: 'Dra. Elena Ruiz',
    tutorAvatar: 'ER',
    date: '2026-06-28',
    time: '10:00',
    duration: 60,
    status: 'completed',
    rating: 5,
  },
]

export const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Webinar: Finanzas', type: 'webinar', date: '2026-07-01', time: '10:00', duration: 90, color: '#045b96' },
  { id: 'e2', title: 'Tutoría: Matemáticas', type: 'tutoria', date: '2026-07-03', time: '11:00', duration: 60, color: '#5f92ae' },
  { id: 'e3', title: 'Asesoría grupal: Marketing', type: 'grupal', date: '2026-07-04', time: '14:00', duration: 90, color: '#10314e' },
  { id: 'e4', title: 'Entrega: Caso práctico', type: 'tarea', date: '2026-07-05', time: '23:59', duration: 0, color: '#012b5c' },
  { id: 'e5', title: 'Webinar: Marketing Digital', type: 'webinar', date: '2026-07-07', time: '16:00', duration: 60, color: '#045b96' },
  { id: 'e6', title: 'Tutoría: Derecho', type: 'tutoria', date: '2026-07-08', time: '15:00', duration: 45, color: '#5f92ae' },
  { id: 'e7', title: 'Parcial: Microeconomía', type: 'tarea', date: '2026-07-10', time: '09:00', duration: 120, color: '#012b5c' },
  { id: 'e8', title: 'Asesoría grupal: Estadística', type: 'grupal', date: '2026-07-12', time: '11:00', duration: 75, color: '#10314e' },
]

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'Fundamentos de Administración', area: 'Negocios', plan: 'Administración y Estrategia', tutor: 'Dr. Carlos Méndez', progress: 78, color: '#045b96', nextClass: 'Mañana 10:00' },
  { id: 's2', name: 'Microeconomía', area: 'Economía', plan: 'Ciencias Económicas', tutor: 'Dra. Elena Ruiz', progress: 55, color: '#5f92ae', nextClass: 'Jue 14:00' },
  { id: 's3', name: 'Contabilidad Financiera', area: 'Finanzas', plan: 'Finanzas y Contaduría', tutor: 'Lic. María López', progress: 90, color: '#10314e', nextClass: 'Vie 09:00' },
  { id: 's4', name: 'Marketing Digital', area: 'Negocios', plan: 'Marketing y Ventas', tutor: 'Lic. Sofía Ramírez', progress: 40, color: '#012b5c', nextClass: 'Lun 16:00' },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'webinar', title: '¡Webinar iniciando!', body: 'Finanzas Corporativas comienza en 5 min', time: 'Ahora', read: false },
  { id: 'n2', type: 'session', title: 'Tutoría confirmada', body: 'Tu sesión con Dr. Méndez está confirmada para mañana', time: 'Hace 30 min', read: false },
  { id: 'n3', type: 'resource', title: 'Nuevo recurso disponible', body: 'Se subió material de Microeconomía', time: 'Hace 1h', read: false },
  { id: 'n4', type: 'message', title: 'Mensaje de tu tutor', body: 'Dr. Méndez te envió un mensaje', time: 'Hace 2h', read: true },
  { id: 'n5', type: 'reminder', title: 'Recordatorio', body: 'Entrega de caso práctico en 2 días', time: 'Hace 3h', read: true },
]
