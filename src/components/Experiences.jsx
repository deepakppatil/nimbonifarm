import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'
// TODO: Restore the Price import when public pricing is ready.
// import Price from './Price.jsx'
import { EXPERIENCES, GROUP_ENQUIRY } from '../data/site.js'

export default function Experiences({ onChoose }) {
  const [tab, setTab] = useState(EXPERIENCES[0].id)
  const active = EXPERIENCES.find((e) => e.id === tab) ?? EXPERIENCES[0]

  return (
    <section id="experiences" className="section section--paper-2 experiences" aria-labelledby="exp-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow">Two ways in</p>
            <h2 id="exp-title" className="sec-head__title">
              Sleep in it, or learn how it was done.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              Both weekends end the same way — muddy shoes, a full stomach, and a slightly
              rearranged idea of what a piece of land can do.
            </p>
          </Reveal>
        </div>

        <div className="exp__grid">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 110} className="exp__cell">
              <article className={`exp-card exp-card--${exp.accent}`}>
                <header className="exp-card__head">
                  <span className="exp-card__kicker">{exp.kicker}</span>
                  <span className="exp-card__icon" aria-hidden="true">
                    {exp.icon}
                  </span>
                </header>

                <h3 className="exp-card__title">{exp.title}</h3>
                <p className="exp-card__summary">{exp.summary}</p>

                <div className="exp-card__price">
                  <span className="exp-card__amount">
                    {/* TODO: Restore <Price value={exp.price} /> when public pricing is ready. */}
                    XXXX
                  </span>
                  <span className="exp-card__unit">{exp.priceUnit}</span>
                </div>
                <p className="exp-card__price-note">{exp.priceNote}</p>

                {exp.schedule && (
                  <p className="exp-card__schedule">
                    <Icon name="calendar" size={16} />
                    {exp.schedule}
                  </p>
                )}

                <ul className="exp-card__features" role="list">
                  {exp.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={16} strokeWidth={2.4} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="exp-card__foot">
                  <button type="button" className="btn btn--primary btn--block" onClick={() => onChoose(exp.id)}>
                    {exp.id === 'farm-stay' ? 'Check dates' : 'Reserve a seat'}
                    <span className="btn__icon btn__icon--shift">
                      <Icon name="arrowRight" size={17} />
                    </span>
                  </button>
                  <button type="button" className="link exp-card__itinerary" onClick={() => setTab(exp.id)}>
                    {active.id === exp.id ? 'Showing the schedule' : 'See the schedule'}
                    <Icon name="arrowRight" size={15} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---- Itinerary ------------------------------------------------ */}
        <Reveal className="itin" delay={60}>
          <div className="itin__head">
            <h3 className="itin__title">A weekend, hour by hour</h3>
            <div className="itin__tabs" role="tablist" aria-label="Choose a schedule">
              {EXPERIENCES.map((e) => (
                <button
                  key={e.id}
                  role="tab"
                  id={`tab-${e.id}`}
                  aria-selected={tab === e.id}
                  aria-controls="itin-panel"
                  className={`itin__tab ${tab === e.id ? 'is-active' : ''}`}
                  onClick={() => setTab(e.id)}
                >
                  {e.title}
                </button>
              ))}
            </div>
          </div>

          <ol className="itin__list" id="itin-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            {active.itinerary.map((step, i) => (
              <li className="itin__step" key={step.time} style={{ '--i': i }}>
                <span className="itin__time">{step.time}</span>
                <span className="itin__dot" aria-hidden="true" />
                <p className="itin__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---- Group enquiry -------------------------------------------- */}
        <Reveal className="group" delay={40}>
          <div className="group__text">
            <h3>{GROUP_ENQUIRY.title}</h3>
            <p>{GROUP_ENQUIRY.summary}</p>
          </div>
          <button type="button" className="btn btn--ink" onClick={() => onChoose('group-visit')}>
            Ask about a group
            <span className="btn__icon btn__icon--shift">
              <Icon name="arrowRight" size={17} />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
