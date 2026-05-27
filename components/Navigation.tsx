'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LAYERS } from '@/lib/layers'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className="px-6 py-5 border-b"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div className="mx-auto max-w-[65ch] flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-bold tracking-tight text-base hover:opacity-75 transition-opacity"
          style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
        >
          Deeper Thought
        </Link>

        <div className="flex items-center gap-1 text-sm flex-wrap">
          {LAYERS.map((layer) => (
            <Link
              key={layer.slug}
              href={`/lager/${layer.slug}`}
              className="px-2 py-1 rounded transition-colors hover:opacity-75"
              style={{
                color: isActive(`/lager/${layer.slug}`)
                  ? 'var(--color-accent)'
                  : 'var(--color-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
              title={layer.title}
            >
              {layer.isAppendix ? 'A' : layer.number}
            </Link>
          ))}

          <span
            className="mx-1 select-none"
            style={{ color: 'var(--color-border)' }}
          >
            |
          </span>

          <Link
            href="/artiklar"
            className="px-2 py-1 rounded transition-colors hover:opacity-75 text-sm"
            style={{
              color: isActive('/artiklar') ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            Artiklar
          </Link>

          <Link
            href="/om"
            className="px-2 py-1 rounded transition-colors hover:opacity-75 text-sm"
            style={{
              color: isActive('/om') ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            Om
          </Link>

          <Link
            href="/ai"
            className="px-2 py-1 rounded transition-colors hover:opacity-75 text-sm"
            style={{
              color: isActive('/ai') ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            AI
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2 px-2 py-1 rounded transition-colors hover:opacity-75"
              style={{ color: 'var(--color-muted)' }}
              aria-label="Byt tema"
            >
              {theme === 'dark' ? '○' : '●'}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
