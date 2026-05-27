'use client'

import { useState } from 'react'

type Mode = 'analyze' | 'explain' | 'compare'

const MODES: { id: Mode; label: string; placeholder: string; description: string }[] = [
  {
    id: 'analyze',
    label: 'Koherensanalys',
    placeholder: 'Klistra in ett argument, en tes, eller ett stycke text...',
    description: 'Analysera om ett argument är koherent med ramverkets lager och invarianter.',
  },
  {
    id: 'explain',
    label: 'Förklara ett lager',
    placeholder: 'Vad är skillnaden mellan lager 2 och lager 3? Vad menar ramverket med emergens?',
    description: 'Ställ en fråga om ramverket och få en interaktiv förklaring.',
  },
  {
    id: 'compare',
    label: 'Jämför en tänkare',
    placeholder: 'Skriv ett namn – t.ex. Nietzsche, Darwin, Kant, Machiavelli...',
    description: 'Analysera hur en tänkares idéer förhåller sig till ramverkets invarianter.',
  },
]

export default function AIAssistant() {
  const [mode, setMode] = useState<Mode>('analyze')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentMode = MODES.find(m => m.id === mode)!

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setResult('')
    setError('')

    try {
      const res = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Något gick fel')
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('Ingen ström tillgänglig')

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setResult(accumulated)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Okänt fel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        className="flex gap-0 mb-8 border rounded overflow-hidden text-sm"
        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-sans)' }}
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setInput(''); setResult(''); setError('') }}
            className="flex-1 px-3 py-2.5 transition-colors text-center"
            style={{
              backgroundColor: mode === m.id ? 'var(--color-accent)' : 'transparent',
              color: mode === m.id ? 'var(--color-bg)' : 'var(--color-muted)',
              borderRight: m.id !== 'compare' ? `1px solid var(--color-border)` : 'none',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p
        className="text-sm mb-4"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
      >
        {currentMode.description}
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={currentMode.placeholder}
          rows={mode === 'analyze' ? 6 : 3}
          className="w-full rounded border px-4 py-3 text-base resize-none outline-none transition-colors mb-4"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.7',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded text-sm font-medium transition-opacity disabled:opacity-40"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {loading ? 'Analyserar…' : 'Analysera'}
        </button>
      </form>

      {error && (
        <div
          className="rounded border px-4 py-3 text-sm mb-6"
          style={{
            borderColor: 'var(--color-layer-A)',
            color: 'var(--color-layer-A)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          className="border-t pt-8"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
          >
            Analys
          </div>
          <div
            className="prose whitespace-pre-wrap"
            style={{ fontSize: '0.95rem' }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
