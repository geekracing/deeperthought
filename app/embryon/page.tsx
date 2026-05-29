import Link from 'next/link'
import { getAllEmbryos, type EmbryoStatus } from '@/lib/content'
import LayerBadge from '@/components/LayerBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Embryon',
  description: 'Öppna förslag under prövning: experimentdesigner, mekanismskisser och prediktioner som väntar på test.',
}

const STATUS_LABELS: Record<EmbryoStatus, string> = {
  'oprövad': 'Oprövad',
  'under prövning': 'Under prövning',
  'promoverad': 'Promoverad',
  'förkastad': 'Förkastad',
}

const STATUS_COLORS: Record<EmbryoStatus, string> = {
  'oprövad': 'var(--color-muted)',
  'under prövning': 'var(--color-layer-2)',
  'promoverad': 'var(--color-layer-3)',
  'förkastad': 'var(--color-layer-A)',
}

export default async function EmbryonPage() {
  const embryos = await getAllEmbryos()

  return (
    <div className="mx-auto max-w-[65ch] pt-16 pb-16">
      <header className="mb-12">
        <h1
          className="text-3xl font-bold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
        >
          Embryon
        </h1>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          Embryon är öppna förslag som ännu inte prövats: experimentdesigner,
          mekanismskisser och prediktioner som väntar på test.
        </p>
        <p className="mt-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          De skiljer sig från artiklarna genom riktningen. En artikel applicerar det
          etablerade ramverket på något externt. Ett embryo är internt och framåtriktat –
          det föreslår något ramverket ännu inte innehåller och specificerar hur det
          skulle prövas.
        </p>
        <p className="mt-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          Det som klarar prövning kan promoveras till en lagersektion eller en artikel.
          Det som faller blir kvar som dokumenterat dött spår – vilket i sig är information
          om vad som prövats.
        </p>
      </header>

      {embryos.length === 0 ? (
        <div
          className="py-16 text-center"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
        >
          <p className="mb-4">Inga embryon ännu.</p>
          <a
            href="https://github.com/geekracing/deeperthought/blob/main/CONTRIBUTING.md"
            className="text-sm hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
          >
            Bidra med ett embryo →
          </a>
        </div>
      ) : (
        <div className="space-y-0">
          {embryos.map((embryo) => (
            <Link
              key={embryo.slug}
              href={`/embryon/${embryo.slug}`}
              className="block py-6 group"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2
                      className="font-semibold group-hover:opacity-75 transition-opacity"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {embryo.title}
                    </h2>
                    <span
                      className="text-xs font-medium shrink-0"
                      style={{
                        color: STATUS_COLORS[embryo.status],
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {STATUS_LABELS[embryo.status]}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
                  >
                    {embryo.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                  >
                    <span>{embryo.author}</span>
                    <span>{embryo.date}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 mt-0.5">
                  {embryo.layers.map((l) => (
                    <LayerBadge key={l} slug={String(l)} size="sm" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div
        className="mt-12 pt-8 border-t text-sm"
        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-sans)' }}
      >
        <p style={{ color: 'var(--color-muted)' }} className="mb-3">
          Vill du föreslå ett embryo?
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/geekracing/deeperthought/blob/main/CONTRIBUTING.md"
            className="hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Bidragsguide →
          </a>
          <a
            href="https://github.com/geekracing/deeperthought/discussions"
            className="hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Diskussioner →
          </a>
        </div>
      </div>
    </div>
  )
}
