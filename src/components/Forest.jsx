import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { SPECIES, SPECIES_NOTE } from '../data/site.js'

export default function Forest() {
  return (
    <section id="forest" className="section section--ink forest" aria-labelledby="forest-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow eyebrow--light">The food forest</p>
            <h2 id="forest-title" className="sec-head__title">
              Seven hundred neighbours, and counting.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede" style={{ color: 'rgba(248,243,233,0.72)' }}>
              Nothing here is planted in rows for a machine. It is layered — canopy, understory,
              ground cover, root — the way a forest arranges itself.
            </p>
          </Reveal>
        </div>

        <div className="forest__rail" role="list">
          {SPECIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 80} className="forest__cell" role="listitem">
              <article className="sp-card" style={{ '--tone': s.tone }}>
                <span className="sp-card__icon" aria-hidden="true">
                  {s.icon}
                </span>
                <span className="sp-card__count">
                  {s.count}
                  <small>{s.count === 1 ? 'tree' : 'trees'}</small>
                </span>
                <h3 className="sp-card__name">{s.name}</h3>
                <p className="sp-card__note">{s.note}</p>
                <span className="sp-card__bar" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="forest__note" delay={80}>
          <Icon name="leaf" size={18} />
          <p>{SPECIES_NOTE}</p>
        </Reveal>
      </div>
    </section>
  )
}
