import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
import { FAQ } from '../data/site.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--tight faq" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <Reveal>
          <p className="eyebrow">Before you come</p>
          <h2 id="faq-title" className="sec-head__title">
            The things people ask first.
          </h2>
        </Reveal>

        <ul className="faq__list" role="list">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={item.q} delay={Math.min(i, 6) * 50} className="faq__item">
                <h3>
                  <button
                    type="button"
                    className={`faq__q ${isOpen ? 'is-open' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__sign" aria-hidden="true">
                      <Icon name={isOpen ? 'close' : 'plus'} size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq__a"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
