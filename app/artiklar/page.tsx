import Link from 'next/link'
import { getAllArticles } from '@/lib/content'
import LayerBadge from '@/components/LayerBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artiklar',
  description: 'Granskningar av filosofer och idéer mot ramverkets lager och invarianter.',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="mx-auto max-w-[65ch] pt-16">
      <header className="mb-12">
        <h1
          className="text-3xl font-bold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
        >
          Artikelbibliotek
        </h1>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          Granskningar av filosofer, teorier och idéer mot ramverkets lager
          och invarianter. Alla artiklar är peer-reviewade och AI-granskade
          för koherens.
        </p>
      </header>

      {articles.length === 0 ? (
        <div
          className="py-16 text-center"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
        >
          <p className="mb-4">Inga publicerade artiklar ännu.</p>
          <a
            href="https://github.com/kjellandersson/deeperthought/blob/main/CONTRIBUTING.md"
            className="text-sm hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
          >
            Bidra med en artikel →
          </a>
        </div>
      ) : (
        <div className="space-y-0">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/artiklar/${article.slug}`}
              className="block py-6 group"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2
                    className="font-semibold mb-1 group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {article.title}
                  </h2>
                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                  >
                    {article.thinker && <span>{article.thinker}</span>}
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 mt-0.5">
                  {article.layers.map((l) => (
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
          Vill du bidra med en analys?
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/kjellandersson/deeperthought/blob/main/CONTRIBUTING.md"
            className="hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Bidragsguide →
          </a>
          <a
            href="https://github.com/kjellandersson/deeperthought/discussions"
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
