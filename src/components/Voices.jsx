import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'

const KEY = 'nimboni-feedback-v2'
const STARS = [1, 2, 3, 4, 5]

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

export default function Voices() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', rating: 5, message: '' })
  const [hover, setHover] = useState(0)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  // Read after mount so localStorage never blocks the first paint.
  useEffect(() => setList(read()), [])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim() || saving) return
    setSaving(true)
    const entry = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      rating: form.rating,
      message: form.message.trim(),
      date: new Date().toISOString(),
    }
    const updated = [entry, ...list].slice(0, 60)
    setList(updated)
    try {
      localStorage.setItem(KEY, JSON.stringify(updated))
    } catch {
      /* private mode — the entry still shows for this session */
    }
    setForm({ name: '', rating: 5, message: '' })
    setOpen(false)
    setSaving(false)
  }

  const avg = list.length
    ? (list.reduce((sum, i) => sum + (Number(i.rating) || 0), 0) / list.length).toFixed(1)
    : null

  return (
    <section id="voices" className="section section--paper-2 voices" aria-labelledby="voices-title">
      <div className="container">
        <div className="voices__head">
          <Reveal>
            <p className="eyebrow">Guest book</p>
            <h2 id="voices-title" className="sec-head__title">
              What people say on the drive home.
            </h2>
          </Reveal>

          <Reveal delay={90} className="voices__head-side">
            {avg ? (
              <p className="voices__avg">
                <strong>{avg}</strong>
                <span aria-hidden="true">★★★★★</span>
                <small>
                  from {list.length} {list.length === 1 ? 'note' : 'notes'}
                </small>
              </p>
            ) : (
              <p className="voices__avg voices__avg--empty">
                <strong>—</strong>
                <small>No notes yet</small>
              </p>
            )}
            <button type="button" className="btn btn--ink" onClick={() => setOpen((v) => !v)}>
              <Icon name="quote" size={17} />
              {open ? 'Close the book' : 'Leave a note'}
            </button>
          </Reveal>
        </div>

        {open && (
          <Reveal className="voices__form-wrap">
            <form className="voices__form" onSubmit={submit}>
              <div className="voices__form-row">
                <label className="field">
                  <span className="field__label">Your name</span>
                  <input
                    className="field__input"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Who stayed with us?"
                    required
                    maxLength={60}
                  />
                </label>

                <div className="field">
                  <span className="field__label" id="rating-label">
                    Rating
                  </span>
                  <div className="rating" role="radiogroup" aria-labelledby="rating-label">
                    {STARS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === s}
                        aria-label={`${s} star${s > 1 ? 's' : ''}`}
                        className={`rating__star ${form.rating >= s ? 'is-on' : ''} ${hover >= s ? 'is-hover' : ''}`}
                        onClick={() => setForm((p) => ({ ...p, rating: s }))}
                        onMouseEnter={() => setHover(s)}
                        onMouseLeave={() => setHover(0)}
                        onFocus={() => setHover(s)}
                        onBlur={() => setHover(0)}
                      >
                        <Icon name="star" size={22} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="field">
                <span className="field__label">Your note</span>
                <textarea
                  className="field__input field__input--area"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="The morning bird walk, the food, the thing you did not expect…"
                  required
                  maxLength={600}
                />
              </label>

              <div className="voices__form-actions">
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  Pin it to the book
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </Reveal>
        )}

        {list.length === 0 ? (
          <Reveal className="voices__empty">
            <span className="voices__empty-mark" aria-hidden="true">
              <Icon name="leaf" size={26} />
            </span>
            <h3>Be the first to write in it.</h3>
            <p>
              We would rather start this wall empty and honest than fill it with words nobody
              said. If you have stayed with us, the first note is yours.
            </p>
            <button type="button" className="btn btn--leaf" onClick={() => setOpen(true)}>
              Write the first note
            </button>
          </Reveal>
        ) : (
          <ul className="voices__wall" role="list">
            {list.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(i, 5) * 70}
                className={`vcard ${i === 0 ? 'vcard--lead' : ''}`}
              >
                <div className="vcard__top">
                  <span className="vcard__avatar" aria-hidden="true">
                    {initials(item.name)}
                  </span>
                  <div>
                    <p className="vcard__name">{item.name}</p>
                    <time className="vcard__date" dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
                <p className="vcard__stars" aria-label={`${item.rating} out of 5 stars`}>
                  {STARS.map((s) => (
                    <span key={s} className={s <= item.rating ? 'is-on' : ''} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </p>
                <p className="vcard__msg">{item.message}</p>
              </Reveal>
            ))}
          </ul>
        )}

        <p className="voices__disclaimer">
          Notes are saved on this device for now. To publish them for every visitor, point this
          form at a real backend or a review platform — ask your developer to wire it up.
        </p>
      </div>
    </section>
  )
}
