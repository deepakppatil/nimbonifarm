import { useEffect, useRef } from 'react'
import { Icon } from './Icons.jsx'
import { mediaSrc, mediaFallback, MEDIA } from '../data/site.js'
import { useBodyLock, useEscape, prefersReducedMotion } from '../lib/hooks.js'

/** Responsive <picture> pointed at the optimised WebP derivatives. */
export function Picture({ id, alt, className = '', sizes = '100vw', priority = false, style }) {
  return (
    <picture>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={`${mediaSrc(id, 640)} 640w, ${mediaSrc(id, 1280)} 1280w, ${mediaSrc(id, 1920)} 1920w`}
      />
      <img
        src={mediaFallback(id)}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}

/** Full-screen media viewer. Arrow keys navigate, Escape closes, focus is trapped. */
export function Lightbox({ index, onClose, onPrev, onNext }) {
  const item = MEDIA[index]
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useBodyLock(true)
  useEscape(onClose)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'Tab') {
        // One focusable control inside — keep focus in the dialog.
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNext, onPrev])

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.alt} — full view`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lb__panel" ref={panelRef}>
        <div className="lb__stage">
          {item.type === 'video' ? (
            <video
              className="lb__media"
              src="/media/drone-hero.mp4"
              poster="/media/drone-poster.webp"
              controls
              autoPlay={!prefersReducedMotion()}
              loop
              muted
              playsInline
            />
          ) : (
            <img className="lb__media" src={mediaSrc(item.id, 1920)} alt={item.alt} />
          )}
        </div>

        <div className="lb__bar">
          <p className="lb__caption">{item.caption}</p>
          <p className="lb__counter" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(MEDIA.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      <button type="button" className="lb__close" onClick={onClose} ref={closeRef} aria-label="Close">
        <Icon name="close" size={22} />
      </button>

      <button type="button" className="lb__nav lb__nav--prev" onClick={onPrev} aria-label="Previous">
        <Icon name="chevronLeft" size={24} />
      </button>
      <button type="button" className="lb__nav lb__nav--next" onClick={onNext} aria-label="Next">
        <Icon name="chevronRight" size={24} />
      </button>
    </div>
  )
}
