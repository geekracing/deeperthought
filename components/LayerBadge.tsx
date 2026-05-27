interface LayerBadgeProps {
  slug: string
  size?: 'sm' | 'lg'
}

const layerColors: Record<string, string> = {
  '0': 'var(--color-layer-0)',
  '1': 'var(--color-layer-1)',
  '2': 'var(--color-layer-2)',
  '3': 'var(--color-layer-3)',
  'A': 'var(--color-layer-A)',
}

export default function LayerBadge({ slug, size = 'sm' }: LayerBadgeProps) {
  const color = layerColors[slug] ?? 'var(--color-muted)'
  const dim = size === 'lg' ? '2.5rem' : '1.75rem'
  const fontSize = size === 'lg' ? '1.1rem' : '0.8rem'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: '50%',
        border: `1.5px solid ${color}`,
        color,
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize,
        flexShrink: 0,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {slug}
    </span>
  )
}
