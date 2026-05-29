import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { LAYERS, getLayer } from './layers'

export type { Layer } from './layers'
export { LAYERS, getLayer }

const contentDir = path.join(process.cwd(), 'content')

const LAYER_FILES: Record<string, string> = {
  '0': '0_sprak.md',
  '1': '1_invarianter.md',
  '2': '2_emergens.md',
  '3': '3_sjalvmodellering.md',
}

async function mdToHtml(content: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)
  return processed.toString()
}

export async function getLayerContent(slug: string): Promise<{ content: string; frontmatter: Record<string, unknown> } | null> {
  const filename = LAYER_FILES[slug]
  if (!filename) return null
  const filePath = path.join(contentDir, 'lager', filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return { content: await mdToHtml(content), frontmatter: data }
}

export interface Article {
  slug: string
  title: string
  author: string
  date: string
  thinker?: string
  layers: number[]
  excerpt: string
  status: 'draft' | 'published'
}

export async function getAllArticles(): Promise<Article[]> {
  const dir = path.join(contentDir, 'artiklar')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  const articles: Article[] = []

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    if (data.status === 'published') {
      articles.push({
        slug: file.replace('.md', ''),
        title: data.title ?? 'Utan titel',
        author: data.author ?? 'Anonym',
        date: data.date ?? '',
        thinker: data.thinker,
        layers: data.layers ?? [],
        excerpt: content.split('\n\n')[0].slice(0, 200).replace(/[#*_]/g, ''),
        status: data.status,
      })
    }
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getArticle(slug: string): Promise<{ article: Article; content: string } | null> {
  const filePath = path.join(contentDir, 'artiklar', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  if (data.status !== 'published') return null

  return {
    article: {
      slug,
      title: data.title ?? 'Utan titel',
      author: data.author ?? 'Anonym',
      date: data.date ?? '',
      thinker: data.thinker,
      layers: data.layers ?? [],
      excerpt: content.split('\n\n')[0].slice(0, 200).replace(/[#*_]/g, ''),
      status: data.status,
    },
    content: await mdToHtml(content),
  }
}

export type EmbryoStatus = 'oprövad' | 'under prövning' | 'promoverad' | 'förkastad'

export interface Embryo {
  slug: string
  title: string
  author: string
  date: string
  layers: number[]
  excerpt: string
  status: EmbryoStatus
}

export async function getAllEmbryos(): Promise<Embryo[]> {
  const dir = path.join(contentDir, 'embryon')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  const embryos: Embryo[] = []

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    embryos.push({
      slug: file.replace('.md', ''),
      title: data.title ?? 'Utan titel',
      author: data.author ?? 'Anonym',
      date: data.date ?? '',
      layers: data.layers ?? [],
      excerpt: content.split('\n\n')[0].slice(0, 200).replace(/[#*_]/g, ''),
      status: data.status ?? 'oprövad',
    })
  }

  return embryos.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getEmbryo(slug: string): Promise<{ embryo: Embryo; content: string } | null> {
  const filePath = path.join(contentDir, 'embryon', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    embryo: {
      slug,
      title: data.title ?? 'Utan titel',
      author: data.author ?? 'Anonym',
      date: data.date ?? '',
      layers: data.layers ?? [],
      excerpt: content.split('\n\n')[0].slice(0, 200).replace(/[#*_]/g, ''),
      status: data.status ?? 'oprövad',
    },
    content: await mdToHtml(content),
  }
}

export async function getFrameworkContext(): Promise<string> {
  let ctx = ''
  for (const [slug, filename] of Object.entries(LAYER_FILES)) {
    const filePath = path.join(contentDir, 'lager', filename)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { content } = matter(raw)
      const layer = getLayer(slug)
      ctx += `\n\n## Lager ${slug}: ${layer?.title}\n\n${content}`
    }
  }
  return ctx.trim()
}
