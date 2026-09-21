import { useReveal } from '../lib/hooks.js'

/**
 * Scroll-reveal wrapper. Renders one element (default `div`) that fades and
 * lifts into place the first time it enters the viewport.
 *
 *   <Reveal delay={120} variant="mask">…</Reveal>
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant,
  className = '',
  style,
  ...rest
}) {
  const [ref, visible] = useReveal()

  const cls = [
    'reveal',
    variant === 'mask' ? 'reveal--mask' : '',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={cls} style={{ '--reveal-delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
