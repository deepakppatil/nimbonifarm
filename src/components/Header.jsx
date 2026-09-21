import { useState } from 'react'
import { Icon, LeafMark, WhatsAppGlyph } from './Icons.jsx'
import { FARM, NAV, CONTACTS, whatsappLink } from '../data/site.js'
import { useScrolled, useScrollProgress, useActiveSection, useScrollTo } from '../lib/hooks.js'

const SECTION_IDS = NAV.map((n) => n.id)

export default function Header() {
  const scrolled = useScrolled(60)
  const progress = useScrollProgress()
  const active = useActiveSection(['hero', ...SECTION_IDS])
  const scrollTo = useScrollTo()
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id) => {
    setMenuOpen(false)
    // Let the menu collapse before the scroll starts on mobile.
    requestAnimationFrame(() => scrollTo(id))
  }

  return (
    <header className={`hdr ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="hdr__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div className="hdr__inner container">
        <a
          href="#hero"
          className="hdr__brand"
          onClick={(e) => {
            e.preventDefault()
            go('hero')
          }}
          aria-label={`${FARM.name} — back to top`}
        >
          <LeafMark size={30} className="hdr__mark" />
          <span className="hdr__word">
            Nimboni<em>.farm</em>
          </span>
        </a>

        <nav className={`hdr__nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          <ul className="hdr__list">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`hdr__link ${active === item.id ? 'is-active' : ''}`}
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hdr__nav-actions">
            <a
              className="btn btn--whatsapp btn--sm"
              href={whatsappLink(
                CONTACTS[0].number,
                'Hello Nimboni Farm — I would like to check availability for a visit.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppGlyph size={17} />
              Chat on WhatsApp
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="hdr__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  )
}
