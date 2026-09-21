import { useCallback, useState } from 'react'
import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { Picture, Lightbox } from './Media.jsx'
import { MEDIA } from '../data/site.js'

const LAYOUT = ['a', 'b', 'c', 'd']

export default function Gallery() {
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  const next = useCallback(() => setOpen((i) => (i + 1) % MEDIA.length), [])
  const prev = useCallback(() => setOpen((i) => (i - 1 + MEDIA.length) % MEDIA.length), [])

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gal-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow">From above</p>
            <h2 id="gal-title" className="sec-head__title">
              Four acres, six seconds, one flight.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              The farm photographs badly from the ground — you cannot see the pattern until you
              are a hundred feet up. Tap any frame.
            </p>
          </Reveal>
        </div>

        <div className="gal__grid">
          {MEDIA.map((item, i) => (
            <Reveal key={item.id} delay={i * 90} className={`gal__cell gal__cell--${LAYOUT[i]}`}>
              <button
                type="button"
                className="gal__item"
                onClick={() => setOpen(i)}
                aria-label={`Open ${item.type === 'video' ? 'video' : 'photo'}: ${item.caption}`}
              >
                {item.type === 'video' ? (
                  <>
                    <img
                      className="gal__img"
                      src="/media/drone-poster.webp"
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="gal__play" aria-hidden="true">
                      <Icon name="play" size={22} />
                    </span>
                    <span className="gal__badge">Drone flyover · 0:06</span>
                  </>
                ) : (
                  <Picture
                    id={item.id}
                    alt={item.alt}
                    className="gal__img"
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                )}
                <span className="gal__overlay" aria-hidden="true">
                  <Icon name="expand" size={20} />
                </span>
                <span className="gal__cap">{item.caption}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />}
    </section>
  )
}
