import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { STORY } from '../data/site.js'
import { Picture } from './Media.jsx'

export default function Story() {
  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <div className="container">
        <div className="story__intro">
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
          <div className="story__body">
            {STORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <p className="story__para">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={260}>
          <ul className="story__principles" role="list">
            {STORY.principles.map((p) => (
              <li className="story__principle" key={p.name}>
                <span className="story__principle-icon" aria-hidden="true">{p.icon}</span>
                <strong>{p.name}</strong>
                <small>{p.note}</small>
              </li>
            ))}
          </ul>
        </Reveal>

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

      </div>
    </section>
  )
}
