import { useEffect, useState } from 'react'
import { WhatsAppGlyph, Icon } from './Icons.jsx'
import { CONTACTS, whatsappLink } from '../data/site.js'
import { useScrollTo } from '../lib/hooks.js'

/** Sticky bottom bar on small screens — the booking CTA is never off-screen. */
export default function MobileCta() {
  const scrollTo = useScrollTo()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9
      const atEnd = window.scrollY + window.innerHeight > document.body.scrollHeight - 420
      setShow(past && !atEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={`mcta ${show ? 'is-on' : ''}`} aria-hidden={!show}>
      <button
        type="button"
        className="mcta__btn mcta__btn--ghost"
        onClick={() => scrollTo('booking')}
        tabIndex={show ? 0 : -1}
      >
        <Icon name="calendar" size={17} />
        Check dates
      </button>
      <a
        className="mcta__btn mcta__btn--wa"
        href={whatsappLink(CONTACTS[0].number, 'Hello Nimboni Farm — I would like to check availability.')}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        <WhatsAppGlyph size={18} />
        Chat with the farm
      </a>
    </div>
  )
}
