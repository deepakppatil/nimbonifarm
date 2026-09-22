import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { STORY, FARM } from '../data/site.js'
import { useCountUp, useReveal } from '../lib/hooks.js'
import { Picture } from './Media.jsx'

function Stat({ value, suffix, label, active }) {
  const n = useCountUp(value, { active })
  return (
    <div className="stat">
      <span className="stat__value">
        {n}
        {suffix}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

/** Numbers only start counting once the band scrolls into view. */
function StatsBand() {
  const [ref, visible] = useReveal({ threshold: 0.4 })
  return (
    <div ref={ref} className={`story__stats reveal ${visible ? 'is-visible' : ''}`}>
      <Stat value={160000} suffix="+" label="Square Feet of Land" active={visible} />
      <Stat value={700} suffix="+" label="trees standing" active={visible} />
      <Stat value={15} suffix="+" label="species recorded" active={visible} />
      <Stat value={0} label="chemicals used" active={visible} />
      {/* <p className="story__stats-note">
        Since {FARM.established}. Counted by hand, which is the only honest way to count them.
      </p> */}
    </div>
  )
}

export default function Story() {
  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <div className="container">
        <div className="story__grid">
          <div className="story__aside">
            <Reveal>
              <p className="eyebrow">{STORY.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="story-title" className="story__title">
                We did not plant a farm.
                <br />
                <em>We stopped undoing one.</em>
              </h2>
            </Reveal>
          </div>

          <div className="story__body">
            {STORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <p className="story__para">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={340}>
              <ul className="story__principles" role="list">
                {STORY.principles.map((p) => (
                  <li className="story__principle" key={p.name}>
                    <span aria-hidden="true">{p.icon}</span>
                    {p.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="story__figure" variant="mask" delay={80}>
          <Picture
            id="farm-01"
            alt="Aerial view of the Nimboni Farm canopy, nine growing seasons after planting began"
            className="story__img"
            sizes="(max-width: 900px) 100vw, 1100px"
            priority
          />
          <figcaption className="story__caption">
            <Icon name="compass" size={15} />
            <span>{STORY.imageNote}</span>
          </figcaption>
        </Reveal>

        <StatsBand />
      </div>
    </section>
  )
}
