import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { STAY } from '../data/site.js'

function StayPhoto({ image, className = '' }) {
  return (
    <figure className={`stay__photo ${className}`}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      <figcaption>{image.caption}</figcaption>
    </figure>
  )
}

export default function Stay() {
  return (
    <section id="stay" className="section section--paper-2 stay" aria-labelledby="stay-title">
      <div className="container">
        <div className="sec-head sec-head--split stay__head">
          <Reveal>
            <p className="eyebrow">The farm stay</p>
            <h2 id="stay-title" className="sec-head__title">
              {STAY.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">{STAY.intro}</p>
          </Reveal>
        </div>

        <div className="stay__retreat">
          <div className="stay__rooms">
            <StayPhoto image={STAY.roomImage} className="stay__photo--room" />
            <StayPhoto image={STAY.pathImage} className="stay__photo--path" />
          </div>

          <Reveal className="stay__details" delay={100}>
            <p className="eyebrow">Settle in</p>
            <h3>{STAY.retreatTitle}</h3>
            <p>{STAY.retreatCopy}</p>
            <ul className="stay__facts" role="list">
              <li>Two-bedroom villa</li>
              <li>Three farm-style meals</li>
              <li>Guided farm tour and nature walk</li>
            </ul>
            <a className="btn btn--primary" href="#booking">
              Ask about a stay
              <span className="btn__icon btn__icon--shift">
                <Icon name="arrowRight" size={17} />
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal className="stay__sky" delay={80}>
          <div className="stay__sky-copy">
            <p className="eyebrow eyebrow--light">If the night is clear</p>
            <h3>{STAY.skyTitle}</h3>
            <p>{STAY.skyCopy}</p>
            <p className="stay__sky-note">{STAY.skyNote}</p>
          </div>
          <div className="stay__sky-photos">
            {STAY.skyPhotos.map((photo, index) => (
              <figure
                className={`stay__sky-photo stay__sky-photo--${index + 1}`}
                key={photo.src}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
