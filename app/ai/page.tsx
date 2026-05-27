import type { Metadata } from 'next'
import AIAssistant from './AIAssistant'

export const metadata: Metadata = {
  title: 'AI-assistent',
  description: 'Analysera argument, jämför tänkare, och utforska ramverket med AI-stöd.',
}

export default function AIPage() {
  return (
    <div className="mx-auto max-w-[65ch] pt-16 pb-16">
      <header className="mb-10">
        <h1
          className="text-3xl font-bold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
        >
          AI-assistent
        </h1>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}>
          Analyser mot ramverket, jämförelse av tänkare med invarianterna,
          och interaktiv guide genom lagren.
        </p>
      </header>

      <AIAssistant />
    </div>
  )
}
