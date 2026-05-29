import Link from 'next/link'
import { LAYERS } from '@/lib/layers'
import { getAllArticles, getAllEmbryos } from '@/lib/content'
import LayerBadge from '@/components/LayerBadge'

export default async function Home() {
  const [articles, embryos] = await Promise.all([getAllArticles(), getAllEmbryos()])

  return (
    <div className="mx-auto max-w-[65ch] pt-20 pb-16">

      <header className="mb-16">
        <h1
          className="text-4xl font-bold tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
        >
          Deeper Thought
        </h1>
        <p
          className="text-lg leading-relaxed mb-4"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-serif)' }}
        >
          Douglas Adams Deep Thought räknade fram svaret 42 och insikten blev att
          frågan saknades. Det här projektet försöker hitta bättre frågor genom
          att gå nedåt i mekanism, inte bredare i svar.
        </p>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          Ramverket är öppet, falsifierbart, och under fortsatt korrigering.
          Alla är fria att forka, bidra, och invända.
        </p>
      </header>

      <section className="mb-16">
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-8"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          Ramverket
        </h2>

        <div className="space-y-px">
          {LAYERS.map((layer) => (
            <Link
              key={layer.slug}
              href={`/lager/${layer.slug}`}
              className="flex items-start gap-5 py-5 group"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <LayerBadge slug={layer.slug} size="sm" />
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold mb-0.5 group-hover:opacity-75 transition-opacity"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Lager {layer.slug} – {layer.title}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
                  {layer.subtitle}
                </div>
              </div>
              <span
                className="mt-0.5 group-hover:translate-x-1 transition-transform"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
          >
            Artiklar
          </h2>
          <Link
            href="/artiklar"
            className="text-xs hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
          >
            Alla artiklar →
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
            Inga publicerade artiklar ännu.{' '}
            <Link href="/artiklar" style={{ color: 'var(--color-accent)' }}>Bidra →</Link>
          </p>
        ) : (
          <div>
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/artiklar/${article.slug}`}
                className="flex items-start justify-between gap-4 py-4 group"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className="font-medium text-sm mb-0.5 group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {article.title}
                  </div>
                  {article.thinker && (
                    <div className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
                      {article.thinker}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  {article.layers.map((l) => (
                    <LayerBadge key={l} slug={String(l)} size="sm" />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
          >
            Embryon
          </h2>
          <Link
            href="/embryon"
            className="text-xs hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
          >
            Alla embryon →
          </Link>
        </div>

        {embryos.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
            Inga embryon ännu.{' '}
            <Link href="/embryon" style={{ color: 'var(--color-accent)' }}>Bidra →</Link>
          </p>
        ) : (
          <div>
            {embryos.slice(0, 3).map((embryo) => (
              <Link
                key={embryo.slug}
                href={`/embryon/${embryo.slug}`}
                className="flex items-start justify-between gap-4 py-4 group"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className="font-medium text-sm mb-0.5 group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {embryo.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
                    {embryo.status}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {embryo.layers.map((l) => (
                    <LayerBadge key={l} slug={String(l)} size="sm" />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          Delta
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <a
            href="https://github.com/geekracing/deeperthought"
            className="p-4 rounded border hover:opacity-75 transition-opacity"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div className="font-semibold mb-1">Forka ramverket</div>
            <div style={{ color: 'var(--color-muted)' }}>
              GitHub — fork, edit, pull request
            </div>
          </a>
          <a
            href="https://github.com/geekracing/deeperthought/discussions"
            className="p-4 rounded border hover:opacity-75 transition-opacity"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div className="font-semibold mb-1">Diskutera</div>
            <div style={{ color: 'var(--color-muted)' }}>
              GitHub Discussions — öppna frågor och invändningar
            </div>
          </a>
          <Link
            href="/artiklar"
            className="p-4 rounded border hover:opacity-75 transition-opacity"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div className="font-semibold mb-1">Artikelbibliotek</div>
            <div style={{ color: 'var(--color-muted)' }}>
              Granskningar av tänkare och idéer mot ramverket
            </div>
          </Link>
        </div>
      </section>

      <section>
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          AI-stöd
        </h2>
        <p
          className="mb-4"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}
        >
          Använd AI för att analysera ett argument mot ramverket, jämföra
          en tänkare med invarianterna, eller få en interaktiv guide
          genom ett specifikt lager.
        </p>
        <Link
          href="/ai"
          className="text-sm font-medium hover:opacity-75 transition-opacity"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
        >
          Öppna AI-assistenten →
        </Link>
      </section>
    </div>
  )
}
