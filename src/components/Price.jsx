const nf = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/**
 * Rupee amounts.
 *
 * Neither Instrument Serif nor Inter ships U+20B9 (₹) — it is outside the
 * Google Fonts `latin` subset — so the browser resolves it from a system font
 * either way. Rather than let that happen by accident, the symbol is set
 * deliberately in the sans voice at a smaller size, so it reads as a
 * considered currency mark next to the serif numerals instead of a mismatch.
 */
export default function Price({ value, className = '' }) {
  return (
    <span className={`price ${className}`.trim()}>
      <span className="price__sym">₹</span>
      <span className="price__num">{nf.format(value)}</span>
    </span>
  )
}
