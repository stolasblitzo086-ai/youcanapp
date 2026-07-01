interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'white'
}

export default function Logo({ size = 'md', variant = 'white' }: LogoProps) {
  const sizes = { sm: 24, md: 32, lg: 48 }
  const textSizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }
  const px = sizes[size]
  const color = variant === 'white' ? '#ffffff' : '#012b5c'

  return (
    <div className="flex items-center gap-2">
      <svg width={px} height={px} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 15L16 9L28 15L16 21L4 15Z" fill={color} fillOpacity="0.95"/>
        <path d="M10 17.5V23C10 23 13 25 16 25C19 25 22 23 22 23V17.5L16 20.5L10 17.5Z" fill={color} fillOpacity="0.7"/>
        <rect x="26" y="14" width="2" height="8" rx="1" fill={color} fillOpacity="0.6"/>
        <circle cx="27" cy="22.5" r="1.5" fill={color} fillOpacity="0.6"/>
      </svg>
      <span
        className={`font-bold ${textSizes[size]} tracking-tight`}
        style={{ color }}
      >
        YouCan<span style={{ color: variant === 'white' ? 'rgba(199,218,231,0.9)' : '#045b96' }}>App</span>
      </span>
    </div>
  )
}
