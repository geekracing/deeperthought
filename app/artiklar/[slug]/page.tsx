import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getAllArticles, getLayer } from '@/lib/content'
import LayerBadge from '@/components/LayerBadge'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await getArticle(slug)
  if (!result) return {}
  return {
    title: result.article.title,
    description: result.article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const result = await getArticle(slug)
  if (!result) notFound()

  const { article, content } = result

  return (
    <div className="mx-auto max-w-[65ch] pt-16 pb-16">
      <Link
        href="/artiklar"
        className="text-sm hover:opacity-75 transition-opacity mb-10 inline-block"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
      >
        ← Alla artiklar
      </Link>

      <header className="mb-10">
        <h1
          className="text-3xl font-bold tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
        >
          {article.title}
        </h1>

        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm pb-6 border-b"
          style={{
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-sans)',
            borderColor: 'var(--color-border)',
          }}
        >
          {article.thinker && (
            <span>
              Tänkare: <span style={{ color: 'var(--color-text)' }}>{article.thinker}</span>
            </span>
          )}
          <span>
            Av: <span style={{ color: 'var(--color-text)' }}>{article.author}</span>
          </span>
          <span>{article.date}</span>
          <div className="flex items-center gap-2">
            <span>Lager:</span>
            {article.layers.map((l) => {
              const layer = getLayer(String(l))
              return (
                <Link
                  key={l}
                  href={`/lager/${l}`}
                  className="hover:opacity-75 transition-opacity"
                  title={layer?.title}
                >
                  <LayerBadge slug={String(l)} size="sm" />
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div
        className="mt-16 pt-8 border-t text-sm"
        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-sans)' }}
      >
        <p style={{ color: 'var(--color-muted)' }} className="mb-3">
          Invändningar? Kompletteringar?
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/geekracing/deeperthought/discussions"
            className="hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Diskutera på GitHub →
          </a>
          <Link
            href="/ai"
            className="hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Analysera med AI →
          </Link>
        </div>
      </div>
    </div>
  )
}
