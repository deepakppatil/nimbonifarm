import Reveal from './Reveal.jsx'
import { Icon, WhatsAppGlyph, SOCIAL_GLYPHS } from './Icons.jsx'
import { FARM, CONTACTS, SOCIALS, whatsappLink } from '../data/site.js'

export default function Visit() {
  return (
    <section id="visit" className="section visit" aria-labelledby="visit-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow">Find us</p>
            <h2 id="visit-title" className="sec-head__title">
              Out where the road runs out.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              The last stretch is a farm track, and that is rather the point. Message us when you
              are close and someone will walk you in.
            </p>
          </Reveal>
        </div>

        <div className="visit__grid">
          <Reveal className="visit__map-wrap" variant="mask">
            <div className="visit__map">
              <iframe
                title="Map showing the location of Nimboni Farm"
                src="https://www.google.com/maps?q=Nimboni%20Farm%20permaculture%20farm%20Maharashtra&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              className="btn btn--primary visit__directions"
              href={FARM.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="pin" size={17} />
              Open in Google Maps
            </a>
          </Reveal>

          <div className="visit__side">
            <Reveal className="visit__card" delay={60}>
              <h3 className="visit__card-title">
                <Icon name="pin" size={18} />
                The address
              </h3>
              <address className="visit__address">
                {FARM.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <ul className="visit__distances" role="list">
                {FARM.distanceNotes.map((d) => (
                  <li key={d.from}>
                    <span>{d.from}</span>
                    <em>{d.detail}</em>
                  </li>
                ))}
              </ul>
              <p className="visit__todo">
                Distances are placeholders — update them in <code>src/data/site.js</code>.
              </p>
            </Reveal>

            <Reveal className="visit__card visit__card--wa" delay={120}>
              <h3 className="visit__card-title">
                <WhatsAppGlyph size={18} />
                Message the farm
              </h3>
              <p>Fastest way to reach us — both lines are monitored through the day.</p>
              <div className="visit__contacts">
                {CONTACTS.map((c) => (
                  <a
                    key={c.number}
                    className="btn btn--whatsapp btn--block"
                    href={whatsappLink(c.number, 'Hello Nimboni Farm — I have a question about visiting.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppGlyph size={17} />
                    <span>
                      {c.person}
                      <small>{c.number}</small>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="visit__card visit__card--social" delay={180}>
              <h3 className="visit__card-title">Follow the seasons</h3>
              <div className="visit__socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visit__social"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {SOCIAL_GLYPHS[s.icon]}
                    </svg>
                  </a>
                ))}
              </div>
              <p className="visit__email">
                Or write to <a href={`mailto:${FARM.email}`}>{FARM.email}</a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
