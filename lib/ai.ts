import Anthropic from '@anthropic-ai/sdk'
import { getFrameworkContext } from './content'

const client = new Anthropic()

const SYSTEM_BASE = `Du är en analytisk assistent specialiserad på det filosofiska ramverk som kallas Deeper Thought. Ramverket har fyra lager (0–3) och ett appendix (A):

- Lager 0 (Språk): definierar termerna systemet, tillstånd, övergång, observation, modell, nivå
- Lager 1 (Invarianter): fyra strukturella primitiver – asymmetri, begränsning, rekursion, selektion
- Lager 2 (Emergens): vad invarianterna producerar – komplexitetsgradienter, hierarkiska nivåer, historicitet, informationslagring
- Lager 3 (Självmodellering): aggregat som bär en intern representation av sig själva som system
- Appendix A (Embryo): tillämpning och experimentdesign

Regler för dina svar:
- Var precis, kortfattad och analytisk. Undvik floskler och "thought leadership"-retorik
- Identifiera konkret vilka lager och invarianter som är relevanta
- Om ett påstående inte kan prövas mot ramverket, säg det explicit
- Använd svenska genomgående
- Referera aldrig till dig själv som AI i analysen`

export async function streamAnalysis(text: string): Promise<ReadableStream<Uint8Array>> {
  const context = await getFrameworkContext()

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `${SYSTEM_BASE}\n\nRamverkets fullständiga innehåll:\n${context}`,
    messages: [
      {
        role: 'user',
        content: `Gör en koherensanalys av följande text mot ramverket. Identifiera:\n1. Vilka lager och invarianter texten berör\n2. Vad som är koherent med ramverket\n3. Vad som krockar eller är underspecificerat\n4. Vilka påståenden som inte är falsifierbara i ramverkets mening\n\nText:\n${text}`,
      },
    ],
  })

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })
}

export async function streamExplanation(question: string): Promise<ReadableStream<Uint8Array>> {
  const context = await getFrameworkContext()

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `${SYSTEM_BASE}\n\nRamverkets fullständiga innehåll:\n${context}`,
    messages: [
      {
        role: 'user',
        content: `Förklara följande fråga om ramverket. Var pedagogisk men precis. Peka alltid ut vilket lager du rör dig i.\n\nFråga: ${question}`,
      },
    ],
  })

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })
}

export async function streamComparison(thinker: string): Promise<ReadableStream<Uint8Array>> {
  const context = await getFrameworkContext()

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: `${SYSTEM_BASE}\n\nRamverkets fullständiga innehåll:\n${context}`,
    messages: [
      {
        role: 'user',
        content: `Analysera ${thinker}s centrala idéer mot ramverkets invarianter och lager. Strukturera analysen:\n\n1. Vad ${thinker} hävdar (kortfattat)\n2. Granskning mot lager 1 (asymmetri, begränsning, rekursion, selektion)\n3. Koherens med lager 2 och 3\n4. Sammanfattning: vad håller, vad krockar, vad är underspecificerat`,
      },
    ],
  })

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })
}

export async function analyzeArticleCoherence(articleContent: string, articleTitle: string): Promise<string> {
  const context = await getFrameworkContext()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: `${SYSTEM_BASE}\n\nRamverkets fullständiga innehåll:\n${context}`,
    messages: [
      {
        role: 'user',
        content: `Du granskar en artikel som vill inkluderas i Deeper Thought-bibliotekets peer-review-process.

Artikel: "${articleTitle}"

Innehåll:
${articleContent}

Ge en strukturerad granskning:

## Koherensanalys

**Lager som artikeln berör:**
[Lista relevanta lager 0–3 och A]

**Styrkor:**
[Vad är välargumenterat och ramverkskoherent]

**Svagheter:**
[Vad är inkoherent, underspecificerat, eller empiriskt tomt]

**Falsifierbarhet:**
[Gör artikeln falsifierbara påståenden? Vilka?]

## Rekommendation

[Godkänd / Godkänd med revisioner / Avvisad] + motivering

## Specifika förslag

[Konkreta punkter för revision om tillämpligt]`,
      },
    ],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}
