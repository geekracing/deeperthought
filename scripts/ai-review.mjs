import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getChangedArticles() {
  const output = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' })
  return output
    .split('\n')
    .filter(f => f.startsWith('content/artiklar/') && f.endsWith('.md'))
}

function getFrameworkContext() {
  const files = {
    '0': 'content/lager/0_sprak.md',
    '1': 'content/lager/1_invarianter.md',
    '2': 'content/lager/2_emergens.md',
    '3': 'content/lager/3_sjalvmodellering.md',
    'A': 'content/lager/A_embryo.md',
  }
  let ctx = ''
  for (const [slug, path] of Object.entries(files)) {
    if (existsSync(path)) {
      ctx += `\n\n## Lager ${slug}\n\n${readFileSync(path, 'utf8')}`
    }
  }
  return ctx.trim()
}

async function reviewArticle(filePath, frameworkContext) {
  if (!existsSync(filePath)) return null

  const content = readFileSync(filePath, 'utf8')
  const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m)
  const title = titleMatch?.[1] ?? filePath

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: `Du är en analytisk granskare för det filosofiska ramverket Deeper Thought. Ramverkets fyra lager och appendix:\n\n${frameworkContext}`,
    messages: [
      {
        role: 'user',
        content: `Granska denna artikel för koherens med ramverket.

Artikel: "${title}"
Innehåll:
${content}

Strukturera svaret:

**Berörda lager:** [Lista 0–3 och A]

**Styrkor:** [Vad är ramverkskoherent]

**Svagheter:** [Vad är inkoherent eller underspecificerat]

**Falsifierbarhet:** [Gör artikeln testbara påståenden?]

**Rekommendation:** Godkänd / Godkänd med revisioner / Avvisad

**Förslag:** [Max 3 konkreta revisionspunkter]`,
      },
    ],
  })

  return {
    title,
    file: filePath,
    review: message.content[0].type === 'text' ? message.content[0].text : '',
  }
}

async function main() {
  const articles = getChangedArticles()

  if (articles.length === 0) {
    console.log('Inga artiklar att granska')
    writeFileSync('ai-review-output.md', 'Inga artikeländringar hittades i denna PR.')
    return
  }

  const frameworkContext = getFrameworkContext()
  const results = []

  for (const file of articles) {
    console.log(`Granskar: ${file}`)
    const result = await reviewArticle(file, frameworkContext)
    if (result) results.push(result)
  }

  const output = results
    .map(r => `### ${r.title}\n\n\`${r.file}\`\n\n${r.review}`)
    .join('\n\n---\n\n')

  writeFileSync('ai-review-output.md', output)
  console.log('Granskning klar')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
