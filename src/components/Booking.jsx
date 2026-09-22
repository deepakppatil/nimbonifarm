import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import { Icon, WhatsAppGlyph } from './Icons.jsx'
import { EXPERIENCES, GROUP_ENQUIRY, CONTACTS, whatsappLink } from '../data/site.js'
import Price from './Price.jsx'
import { useScrollTo } from '../lib/hooks.js'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const OPTIONS = [
  ...EXPERIENCES.map((e) => ({
    id: e.id,
    label: e.title,
    price: e.price,
    requiresWeekend: e.requiresWeekend,
    hasNights: e.id === 'farm-stay',
    contact: e.id === 'permaculture-course' ? 1 : 0,
  })),
  {
    id: GROUP_ENQUIRY.id,
    label: GROUP_ENQUIRY.title,
    price: null,
    requiresWeekend: false,
    hasNights: false,
    contact: 1,
  },
]

const todayISO = () => new Date().toISOString().slice(0, 10)

const isWeekend = (iso) => {
  if (!iso) return false
  const d = new Date(`${iso}T00:00:00`)
  return d.getDay() === 0 || d.getDay() === 6
}

const longDate = (iso) => {
  if (!iso) return '—'
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[\d\s+\-()]{10,16}$/

export default function Booking({ intent, onIntentHandled }) {
  const scrollTo = useScrollTo()
  const headingRef = useRef(null)

  const [service, setService] = useState('farm-stay')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [nights, setNights] = useState(1)
  const [contact, setContact] = useState({ name: '', email: '', phone: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  const option = useMemo(() => OPTIONS.find((o) => o.id === service) ?? OPTIONS[0], [service])

  // An "I want this one" click anywhere on the page lands here.
  useEffect(() => {
    if (!intent) return
    setService(intent)
    setErrors({})
    setSent(null)
    scrollTo('booking')
    onIntentHandled?.()
    requestAnimationFrame(() => headingRef.current?.focus?.())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent])

  const estimate = option.price == null ? null : option.hasNights ? option.price * guests * nights : option.price * guests

  const validate = () => {
    const e = {}
    if (!contact.name.trim()) e.name = 'We need a name for the booking.'
    if (!EMAIL_RE.test(contact.email.trim())) e.email = 'That email does not look right.'
    if (!PHONE_RE.test(contact.phone.trim())) e.phone = 'Enter a phone number we can reach you on.'
    if (!date) e.date = 'Pick a date.'
    else if (option.requiresWeekend && !isWeekend(date))
      e.date = 'The course runs on Saturdays and Sundays only.'
    else if (new Date(`${date}T00:00:00`) < new Date(todayISO()))
      e.date = 'That date has already passed.'
    if (guests < 1) e.guests = 'At least one guest.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const buildMessage = () =>
    [
      `Hello Nimboni Farm,`,
      ``,
      `I would like to book a visit. Here are my details:`,
      ``,
      `Experience: ${option.label}`,
      `Date: ${longDate(date)}`,
      option.hasNights ? `Nights: ${nights}` : null,
      `Guests: ${guests}`,
      estimate != null ? `Estimated: ${inr.format(estimate)}` : `Estimated: on request`,
      ``,
      `Name: ${contact.name.trim()}`,
      `Email: ${contact.email.trim()}`,
      `Phone: ${contact.phone.trim()}`,
      contact.notes.trim() ? `` : null,
      contact.notes.trim() ? `Notes: ${contact.notes.trim()}` : null,
      ``,
      `Please confirm availability. Thank you!`,
    ]
      .filter((l) => l !== null)
      .join('\n')

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) {
      // Move focus to the first invalid field so the error is announced.
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }

    const payload = {
      service: option.id,
      date,
      guests,
      nights: option.hasNights ? nights : null,
      estimate,
      ...contact,
      createdAt: new Date().toISOString(),
    }

    // Keep a local copy so enquiries are not lost if WhatsApp does not open.
    try {
      const key = 'nimboni-enquiries'
      const all = JSON.parse(localStorage.getItem(key) ?? '[]')
      localStorage.setItem(key, JSON.stringify([payload, ...all].slice(0, 100)))
    } catch {
      /* storage unavailable — the WhatsApp handoff still carries the booking */
    }

    window.open(whatsappLink(CONTACTS[option.contact].number, buildMessage()), '_blank', 'noopener')
    setSent({ service: option.label, date, guests, estimate, to: CONTACTS[option.contact] })
    setContact({ name: '', email: '', phone: '', notes: '' })
    setDate('')
  }

  const set = (key) => (e) => setContact((p) => ({ ...p, [key]: e.target.value }))

  return (
    <section id="booking" className="section booking" aria-labelledby="booking-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow">Plan a visit</p>
            <h2 id="booking-title" className="sec-head__title" tabIndex={-1} ref={headingRef}>
              Tell us when. We will hold the dates.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              No payment gateway, no card details. Fill this in and it goes straight to the farm
              on WhatsApp — we reply with availability, usually within a few hours.
            </p>
          </Reveal>
        </div>

        <div className="booking__layout">
          <Reveal className="booking__form-wrap">
            {sent ? (
              <div className="booking__done" role="status">
                <span className="booking__done-mark" aria-hidden="true">
                  <Icon name="check" size={30} strokeWidth={2.4} />
                </span>
                <h3>Your request is with {sent.to.person}.</h3>
                <p className="booking__done-summary">
                  {sent.service} · {longDate(sent.date)} · {sent.guests}{' '}
                  {sent.guests === 1 ? 'guest' : 'guests'}
                  {sent.estimate != null ? (
                    <>
                      {' · '}
                      <Price value={sent.estimate} /> estimated
                    </>
                  ) : null}
                </p>
                <p>
                  A WhatsApp window should already be open with everything filled in — send it and
                  it lands on the farm phone. Nothing is confirmed until we reply.
                </p>
                <div className="booking__done-actions">
                  <a
                    className="btn btn--whatsapp"
                    href={whatsappLink(
                      sent.to.number,
                      'Hello Nimboni Farm — I just sent a booking request and wanted to add something.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppGlyph size={18} />
                    Open WhatsApp again
                  </a>
                  <button type="button" className="btn btn--ghost" onClick={() => setSent(null)}>
                    Book another visit
                  </button>
                </div>
              </div>
            ) : (
              <form className="booking__form" onSubmit={submit} noValidate>
                <div className="field">
                  <label className="field__label" htmlFor="b-service">
                    What are you booking?
                  </label>
                  <div className="select">
                    <select
                      id="b-service"
                      className="field__input select__control"
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value)
                        setErrors({})
                      }}
                    >
                      {OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                          {/* TODO: Restore `o.price != null ? \` — from ${inr.format(o.price)}\` : ' — on request'` when public pricing is ready. */}
                          {o.price != null ? ' — XXXX' : ' — on request'}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronRight" size={18} className="select__chevron" />
                  </div>
                </div>

                <div className="booking__row booking__row--date">
                  <label className="field">
                    <span className="field__label">
                      Preferred date
                    </span>
                    <input
                      id="b-date"
                      type="date"
                      className={`field__input ${errors.date ? 'has-error' : ''}`}
                      value={date}
                      min={todayISO()}
                      onChange={(e) => setDate(e.target.value)}
                      aria-invalid={errors.date ? 'true' : undefined}
                      aria-describedby="b-date-hint"
                    />
                    <span className="field__hint" id="b-date-hint">
                      {option.requiresWeekend
                        ? 'Course dates: Saturdays & Sundays, 9 AM – 5 PM.'
                        : 'Any date works for a stay. Weekends fill first.'}
                    </span>
                    {errors.date && (
                      <span className="field__error" role="alert">
                        {errors.date}
                      </span>
                    )}
                  </label>

                  <label className="field field--sm">
                    <span className="field__label">
                      Guests
                    </span>
                    <input
                      id="b-guests"
                      type="number"
                      className={`field__input ${errors.guests ? 'has-error' : ''}`}
                      value={guests}
                      min="1"
                      max="20"
                      onChange={(e) => setGuests(Math.max(1, Math.min(6, Number(e.target.value) || 1)))}
                      aria-invalid={errors.guests ? 'true' : undefined}
                    />
                    <span className="field__hint" id="b-guests-hint">
                      {option.guests > 6
                        ? 'Max 6, larger groups can enquire.'
                        : 'Max 6 Guests for a stay.'}
                    </span>
                    {errors.guests && (
                      <span className="field__error" role="alert">
                        {errors.guests}
                      </span>
                    )}
                  </label>

                  {option.hasNights && (
                    <label className="field field--sm">
                      <span className="field__label">
                        Nights
                      </span>
                      <div className="select">
                        <select
                          id="b-nights"
                          className="field__input select__control"
                          value={nights}
                          onChange={(e) => setNights(Number(e.target.value))}
                        >
                          {[1, 2].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevronRight" size={18} className="select__chevron" />
                      </div>
                      <span className="field__hint" id="b-nights-hint">
                        {option.hasNights && nights > 2
                          ? 'Max 2 Nights.' 
                          : 'Min 1 night.'}
                      </span>
                      {errors.nights && (
                      <span className="field__error" role="alert">
                        {errors.nights}
                      </span>
                    )}
                    </label>
                  )}
                </div>

                <div className="booking__row">
                  <label className="field">
                    <span className="field__label">
                      Your name
                    </span>
                    <input
                      id="b-name"
                      className={`field__input ${errors.name ? 'has-error' : ''}`}
                      value={contact.name}
                      onChange={set('name')}
                      autoComplete="name"
                      placeholder="Full name"
                      aria-invalid={errors.name ? 'true' : undefined}
                    />
                    {errors.name && (
                      <span className="field__error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  <label className="field">
                    <span className="field__label">
                      Email
                    </span>
                    <input
                      id="b-email"
                      type="email"
                      inputMode="email"
                      className={`field__input ${errors.email ? 'has-error' : ''}`}
                      value={contact.email}
                      onChange={set('email')}
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? 'true' : undefined}
                    />
                    {errors.email && (
                      <span className="field__error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>

                <div className="booking__row">
                  <label className="field">
                    <span className="field__label">
                      Phone / WhatsApp
                    </span>
                    <input
                      id="b-phone"
                      type="tel"
                      inputMode="tel"
                      className={`field__input ${errors.phone ? 'has-error' : ''}`}
                      value={contact.phone}
                      onChange={set('phone')}
                      autoComplete="tel"
                      placeholder="+91 XXXXX XXXXX"
                      aria-invalid={errors.phone ? 'true' : undefined}
                    />
                    {errors.phone && (
                      <span className="field__error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>

                <label className="field">
                  <span className="field__label">
                    Anything we should know?
                  </span>
                  <textarea
                    id="b-notes"
                    className="field__input field__input--area"
                    rows={3}
                    value={contact.notes}
                    onChange={set('notes')}
                    placeholder="Dietary needs, kids, accessibility, pets, arrival time…"
                    maxLength={500}
                  />
                </label>

                <button type="submit" className="btn btn--primary btn--lg btn--block booking__submit">
                  <WhatsAppGlyph size={19} />
                  Send it to the farm on WhatsApp
                </button>

                <p className="booking__smallprint">
                  Sending opens WhatsApp with your details pre-written. We confirm availability by
                  reply — nothing is booked until then.
                </p>
              </form>
            )}
          </Reveal>

          {/* ---- Estimate rail ------------------------------------------ */}
          <Reveal className="booking__aside" delay={90}>
            <div className="est">
              <p className="est__label">Your request</p>
              <h3 className="est__title">{option.label}</h3>

              <dl className="est__lines">
                <div>
                  <dt>Date</dt>
                  <dd>{longDate(date)}</dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{guests}</dd>
                </div>
                {option.hasNights && (
                  <div>
                    <dt>Nights</dt>
                    <dd>{nights}</dd>
                  </div>
                )}
              </dl>

              <div className="est__total">
                <span>Estimate</span>
                <strong>{estimate != null ? <Price value={estimate} /> : 'On request'}</strong>
              </div>
              <p className="est__note">
                {estimate != null
                  ? 'Indicative only — the final figure is confirmed on WhatsApp.'
                  : GROUP_ENQUIRY.summary}
              </p>

              <ul className="est__list" role="list">
                <li>
                  <Icon name="check" size={15} strokeWidth={2.4} />
                  No advance payment
                </li>
                <li>
                  <Icon name="check" size={15} strokeWidth={2.4} />
                  Reply within a few hours
                </li>
                <li>
                  <Icon name="check" size={15} strokeWidth={2.4} />
                  Free cancellation, 48 h notice
                </li>
              </ul>

              <div className="est__people">
                <p className="est__label">Or message directly</p>
                {CONTACTS.map((c) => (
                  <a
                    key={c.number}
                    className="est__person"
                    href={whatsappLink(
                      c.number,
                      'Hello Nimboni Farm — I would like to ask about a visit.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppGlyph size={16} />
                    <span>
                      <strong>{c.person}</strong>
                      <small>
                        {c.role} · {c.number}
                      </small>
                    </span>
                    <Icon name="arrowRight" size={16} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
