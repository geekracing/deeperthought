import { NextRequest } from 'next/server'
import { streamExplanation } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  if (!text || typeof text !== 'string' || text.length > 2000) {
    return Response.json({ error: 'Ogiltig indata' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'API-nyckel saknas' }, { status: 500 })
  }

  const stream = await streamExplanation(text)
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
