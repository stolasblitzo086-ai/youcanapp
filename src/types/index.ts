export interface User {
  id: string
  name: string
  email: string
  avatar: string
  membership: 'free' | 'pro' | 'premium'
  hoursStudied: number
  sessionsTaken: number
  progress: number
}

export interface Webinar {
  id: string
  title: string
  tutor: string
  subject: string
  status: 'live' | 'upcoming' | 'recorded'
  participants: number
  startTime: string
  duration: number
  thumbnail: string
}

export interface Tutoria {
  id: string
  subject: string
  topic: string
  tutor: string
  tutorAvatar: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  rating?: number
}

export interface CalendarEvent {
  id: string
  title: string
  type: 'webinar' | 'tutoria' | 'grupal' | 'tarea' | 'recordatorio'
  date: string
  time: string
  duration: number
  color: string
}

export interface Subject {
  id: string
  name: string
  area: string
  plan: string
  tutor: string
  progress: number
  color: string
  nextClass: string
}

export interface Notification {
  id: string
  type: 'session' | 'message' | 'reminder' | 'resource' | 'webinar'
  title: string
  body: string
  time: string
  read: boolean
}
