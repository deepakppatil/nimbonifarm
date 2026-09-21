import { HERO } from '../data/site.js'

/** Slow ticker of the farm's credentials — cheap credibility, in motion. */
export default function Marquee() {
  const items = [...HERO.trust, ...HERO.trust]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <i className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
