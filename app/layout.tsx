import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Deeper Thought',
    default: 'Deeper Thought',
  },
  description:
    'Ett öppet filosofiskt ramverk för att hitta bättre frågor genom att gå nedåt i mekanism.',
  openGraph: {
    siteName: 'Deeper Thought',
    locale: 'sv_SE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div
            className="min-h-screen"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          >
            <Navigation />
            <main className="px-6 pb-24">{children}</main>
            <footer
              className="border-t px-6 py-8 text-sm"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div className="mx-auto max-w-[65ch] flex flex-col sm:flex-row justify-between gap-4">
                <span>Deeper Thought — öppet ramverk under korrigering</span>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/kjellandersson/deeperthought"
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://github.com/kjellandersson/deeperthought/discussions"
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Diskussioner
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
