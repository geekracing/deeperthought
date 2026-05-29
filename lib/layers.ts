export interface Layer {
  slug: string
  number: string
  title: string
  subtitle: string
  isAppendix: boolean
}

export const LAYERS: Layer[] = [
  { slug: '0', number: '0', title: 'Språk', subtitle: 'Verktygsorden ramverket använder', isAppendix: false },
  { slug: '1', number: '1', title: 'Invarianter', subtitle: 'Strukturella primitiver', isAppendix: false },
  { slug: '2', number: '2', title: 'Emergens', subtitle: 'Vad invarianterna producerar i tid och rekursion', isAppendix: false },
  { slug: '3', number: '3', title: 'Självmodellering', subtitle: 'Aggregat som modellerar sig själva', isAppendix: false },
]

export function getLayer(slug: string): Layer | undefined {
  return LAYERS.find(l => l.slug === slug)
}
