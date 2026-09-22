import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'
import { HERO, HERO_VIDEO, FARM } from '../data/site.js'
import { useScrollTo, prefersReducedMotion } from '../lib/hooks.js'

export default function Hero() {
  const scrollTo = useScrollTo()
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Respect data-saver / reduced-motion: never auto-play heavy media.
    const saveData = navigator.connection?.saveData
    if (prefersReducedMotion() || saveData) {
      v.removeAttribute('autoplay')
      v.pause?.()
      return
    }
    // Some browsers return undefined from play() instead of a promise.
    const played = v.play?.()
    if (played && typeof played.catch === 'function') played.catch(() => {})
  }, [])

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
        />
        <div className="hero__scrim" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__inner container">
        <p className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {HERO.eyebrow}
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">{HERO.lineOne}</span>
          <span className="hero__line hero__line--accent">{HERO.lineTwo}</span>
        </h1>

        <p className="hero__body">{HERO.body}</p>

        <p className="hero__availability">
          <span aria-hidden="true" />
          Bookings opening soon
        </p>

        <div className="hero__actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={() => scrollTo(HERO.primaryCta.target)}>
            {HERO.primaryCta.label}
            <span className="btn__icon btn__icon--shift">
              <Icon name="arrowRight" size={18} />
            </span>
          </button>
          <button type="button" className="btn btn--ghost-light btn--lg" onClick={() => scrollTo(HERO.secondaryCta.target)}>
            {HERO.secondaryCta.label}
          </button>
        </div>

        <dl className="hero__stats">
          {HERO.stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <dt className="hero__stat-value">
                {s.value}
                {s.suffix}
              </dt>
              <dd className="hero__stat-label">
                {s.label}
                <span>{s.sub}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollTo('story')}
        aria-label="Scroll to the farm story"
      >
        <span>Scroll</span>
        <Icon name="arrowDown" size={16} className={videoReady ? '' : 'is-idle'} />
      </button>

      {/* <p className="hero__credit" aria-hidden="true">
        {FARM.location} · established {FARM.established}
      </p> */}
    </section>
  )
}
