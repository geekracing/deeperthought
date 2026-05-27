import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LAYERS, getLayer, getLayerContent } from '@/lib/content'
import LayerBadge from '@/components/LayerBadge'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return LAYERS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const layer = getLayer(slug)
  if (!layer) return {}
  const prefix = layer.isAppendix ? `Appendix ${layer.slug}` : `Lager ${layer.slug}`
  return {
    title: `${prefix} – ${layer.title}`,
    description: layer.subtitle,
  }
}

export default async function LayerPage({ params }: Props) {
  const { slug } = await params
  const layer = getLayer(slug)
  if (!layer) notFound()

  const data = await getLayerContent(slug)
  if (!data) notFound()

  const currentIndex = LAYERS.findIndex(l => l.slug === slug)
  const prev = currentIndex > 0 ? LAYERS[currentIndex - 1] : null
  const next = currentIndex < LAYERS.length - 1 ? LAYERS[currentIndex + 1] : null

  const prefix = layer.isAppendix ? `Appendix ${layer.slug}` : `Lager ${layer.slug}`

  return (
    <div className="mx-auto max-w-[65ch] pt-16 pb-16">
      <div className="flex items-center gap-3 mb-10">
        <LayerBadge slug={layer.slug} size="lg" />
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
          >
            {prefix}
          </div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}
          >
            {layer.title}
          </h1>
        </div>
      </div>

      <p
        className="text-base mb-12 pb-8 border-b"
        style={{
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          borderColor: 'var(--color-border)',
        }}
      >
        {layer.subtitle}
      </p>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      <nav
        className="mt-16 pt-8 border-t flex justify-between text-sm"
        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-sans)' }}
      >
        {prev ? (
          <Link
            href={`/lager/${prev.slug}`}
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            <span>←</span>
            <span>
              {prev.isAppendix ? 'Appendix' : 'Lager'} {prev.slug} – {prev.title}
            </span>
          </Link>
        ) : <span />}

        {next ? (
          <Link
            href={`/lager/${next.slug}`}
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            <span>
              {next.isAppendix ? 'Appendix' : 'Lager'} {next.slug} – {next.title}
            </span>
            <span>→</span>
          </Link>
        ) : <span />}
      </nav>
    </div>
  )
}
