import { LeafMark, WhatsAppGlyph } from './Icons.jsx'
import { FARM, NAV, CONTACTS, whatsappLink } from '../data/site.js'
import { useScrollTo } from '../lib/hooks.js'

export default function Footer() {
  const scrollTo = useScrollTo()
  const year = new Date().getFullYear()

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__top">
          <div className="foot__brand">
            <span className="foot__mark">
              <LeafMark size={44} />
            </span>
            <p className="foot__word">Nimboni</p>
            <p className="foot__tagline">{FARM.tagline}</p>
            <p className="foot__meta">
              {FARM.location} · established {FARM.established} · four acres of it
            </p>
          </div>

          <nav className="foot__nav" aria-label="Footer">
            <h2 className="foot__h">Explore</h2>
            <ul role="list">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => scrollTo(n.id)}>
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot__nav">
            <h2 className="foot__h">Talk to us</h2>
            <ul role="list" className="foot__contacts">
              {CONTACTS.map((c) => (
                <li key={c.number}>
                  <a
                    href={whatsappLink(c.number, 'Hello Nimboni Farm — I have a question.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppGlyph size={15} />
                    {c.person}
                    <small>{c.number}</small>
                  </a>
                </li>
              ))}
            </ul>
            <a className="foot__link" href={`mailto:${FARM.email}`}>
              {FARM.email}
            </a>
          </div>

          <div className="foot__nav">
            <h2 className="foot__h">Find the gate</h2>
            <address className="foot__address">
              {FARM.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <a className="foot__link" href={FARM.mapUrl} target="_blank" rel="noopener noreferrer">
              Open in Maps →
            </a>
          </div>
        </div>

        <div className="foot__bottom">
          <p>
            © {year} {FARM.name}. Grown, not built.
          </p>
          <p className="foot__credit">
            Four acres of regenerated land in Maharashtra — no chemicals, since {FARM.established}.
          </p>
        </div>
      </div>
    </footer>
  )
}
