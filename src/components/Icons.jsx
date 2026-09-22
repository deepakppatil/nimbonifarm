/**
 * Hand-built icon set. Replaces the duplicated inline SVGs (and the broken
 * WhatsApp path) that were copy-pasted through the original build.
 */
import { useId } from 'react'

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const Icon = ({ name, size = 24, strokeWidth, className = '' }) => {
  const paths = ICON_PATHS[name]
  if (!paths) return null
  return (
    <svg
      {...base}
      width={size}
      height={size}
      strokeWidth={strokeWidth ?? base.strokeWidth}
      className={className}
    >
      {paths}
    </svg>
  )
}

const ICON_PATHS = {
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 4v15M6 13l6 6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 20v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  droplet: <path d="M12 2.7 6.3 8.4a8 8 0 1 0 11.4 0Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  play: <path d="M6 3.5v17l14-8.5Z" />,
  expand: (
    <>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  star: (
    <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9Z" />
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  quote: (
    <path d="M9 7H6a2 2 0 0 0-2 2v3h4a1 1 0 0 1 0 2H4m14-7h-3a2 2 0 0 0-2 2v3h4a1 1 0 0 1 0 2h-4" />
  ),
}

/* Brand marks that need fills, not strokes. */

export function WhatsAppGlyph({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.24-.65.8-.8.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.17 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  )
}

export const SOCIAL_GLYPHS = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 15.3 3.5c-2.4 0-4 1.45-4 4.12V9.9H8.6V13h2.7v8Z" />
  ),
  youtube: (
    <>
      <path d="M22.5 7.2a2.7 2.7 0 0 0-1.9-1.9C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.6.5A2.7 2.7 0 0 0 1.5 7.2C1 9 1 12 1 12s0 3 .5 4.8a2.7 2.7 0 0 0 1.9 1.9c1.8.5 8.6.5 8.6.5s6.8 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9C23 15 23 12 23 12s0-3-.5-4.8Z" />
      <path d="M9.8 15.3 15.5 12 9.8 8.7Z" />
    </>
  ),
}

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export function NimboniMark({ size = 32, className = '', tone = 'brand', badge = false }) {
  const gid = `nim-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  const [top, mid, bottom] =
    tone === 'light' ? ['#E4EFD2', '#A7C888', '#6E9B62'] : ['#8CBB52', '#4C7A34', '#1B3123']

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={`${gid}-rib`} x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={top} />
          <stop offset=".5" stopColor={mid} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id={`${gid}-lime`} cx="32%" cy="25%" r="78%">
          <stop offset="0" stopColor={top} />
          <stop offset=".45" stopColor={mid} />
          <stop offset="1" stopColor={bottom} />
        </radialGradient>
      </defs>

      {badge && <rect width="48" height="48" rx="14" fill="#14251A" />}

      <ellipse cx="20" cy="29" rx="11.5" ry="10.8" fill={`url(#${gid}-lime)`} />
      <path
        d="M11.5 34.5c4.2 3.1 10.5 4.1 16.1 1.2"
        stroke={bottom}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="16.5" cy="24.2" rx="2.8" ry="1.7" transform="rotate(-28 16.5 24.2)" fill={top} opacity="0.7" />
      <path
        d="M22 21.8C18.7 13.2 12.1 10.1 7.8 12.2c1.1 6.2 5.9 10.6 14.8 11.4"
        fill={`url(#${gid}-rib)`}
        opacity="0.78"
      />
      <path d="M21 22c-4.5-4.1-8.3-6.8-12-8.7" stroke={top} strokeWidth="0.9" strokeLinecap="round" />
      <path
        d="M22 20.5C27 10.2 36.8 7.7 43 9.2c-0.7 8.9-6.1 15.6-17.2 17.2"
        fill={`url(#${gid}-rib)`}
      />
      <path d="M23 24.8c6-5.3 11.2-9 17.1-12.2" stroke={top} strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="19.5" cy="17.4" r="1.2" fill={bottom} />
    </svg>
  )
}

/**
 * Wordmark. "Nimboni" in the display serif, ".farm" set as a small sans
 * suffix in leaf green — the brand's one deliberate flourish.
 */
export function Wordmark({ size = 'md', tone = 'dark', className = '' }) {
  return (
    <span className={`wordmark wordmark--${size} wordmark--${tone} ${className}`}>
      <span className="wordmark__name">Nimboni</span>
      <span className="wordmark__tld">.farm</span>
    </span>
  )
}

const MARK_SIZE = { sm: 22, md: 30, lg: 38, xl: 46 }

/** Mark + wordmark, the standard lockup. */
export function Logo({ size = 'md', tone = 'dark', className = '' }) {
  return (
    <span className={`logo logo--${size} ${className}`}>
      <NimboniMark size={MARK_SIZE[size] ?? 30} tone={tone === 'light' ? 'light' : 'brand'} />
      <Wordmark size={size} tone={tone} />
    </span>
  )
}
