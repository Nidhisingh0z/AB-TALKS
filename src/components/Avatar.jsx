export default function Avatar({ name, initials, avatarUrl, size = 44 }) {
  const dim = { width: size, height: size }
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={dim}
        className="rounded-full object-cover border border-[var(--color-line)]"
      />
    )
  }
  // Empty-profile edge case: no photo uploaded yet — fall back to initials
  // (or a neutral glyph if we don't even have a name) instead of a broken image.
  const label = initials || (name ? name.slice(0, 2).toUpperCase() : '—')
  return (
    <div
      style={dim}
      className="rounded-full flex items-center justify-center font-[var(--font-display)] font-semibold text-[var(--color-ink)]"
      title={name || 'Profile photo not added yet'}
    >
      <div
        style={{ ...dim, background: 'linear-gradient(135deg, var(--color-amber), var(--color-mint))' }}
        className="rounded-full flex items-center justify-center w-full h-full"
      >
        <span style={{ fontSize: size * 0.38 }}>{label}</span>
      </div>
    </div>
  )
}
