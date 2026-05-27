import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om',
  description: 'Om Deeper Thought – metod, syfte och hur du bidrar.',
}

export default function OmPage() {
  return (
    <div className="mx-auto max-w-[65ch] pt-16 pb-16">
      <h1
        className="text-3xl font-bold tracking-tight mb-10"
        style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
      >
        Om Deeper Thought
      </h1>

      <article className="prose">
        <h2>Vad det är</h2>
        <p>
          Deeper Thought är ett öppet filosofiskt ramverk med fyra lager och ett appendix.
          Det är inte en doktrin, inte en ideologi, och inte ett svar. Det är ett försök att
          formulera de frågor som producerar förklaringskraft när de ställs om biologiska,
          kognitiva och sociala system.
        </p>

        <h2>Metod</h2>
        <p>
          Ramverket är byggt underifrån. Lager 0 definierar termerna. Lager 1 identifierar
          de strukturella primitiver som håller oavsett system. Lager 2 beskriver vad dessa
          primitiver producerar i tid och rekursion. Lager 3 behandlar aggregat som modellerar
          sig själva. Appendix A är testplatsen – där principerna möter konkreta frågor.
        </p>
        <p>
          Varje påstående ska vara falsifierbart. Om en distinktion inte gör någon empirisk
          skillnad i minst ett tänkbart scenario tas den bort. Det är inte ett ideal – det är
          ett krav för att ramverket ska räknas som ramverk snarare än retorik.
        </p>

        <h2>Varför öppet</h2>
        <p>
          Ramverket är öppet av metodologiska skäl. Ett falsifierbart ramverk måste kunna
          angripas, revideras och forkas. Stängd kod kan inte falsifieras. Alla är välkomna
          att fork:a, bidra med artiklar, och invända i diskussionsforumet.
        </p>
        <p>
          Bidrag granskas via en kombination av AI-koherensanalys och community peer review.
          Artiklar som accepteras in i biblioteket har genomgått processen beskriven i
          CONTRIBUTING.md på GitHub.
        </p>

        <h2>Vad det inte är</h2>
        <ul>
          <li>Inte ett politiskt projekt</li>
          <li>Inte en religionskritik</li>
          <li>Inte ett anspråk på att ha svaret på existentiella frågor</li>
          <li>Inte ett substitut för facklitteratur inom de ämnen det berör</li>
        </ul>
        <p>
          Ramverket berör frågor som behandlas i biologi, kognitionsvetenskap, systemteori
          och filosofi. Det ersätter inte dessa fält – det försöker hitta de frågor som är
          produktiva att ställa mellan dem.
        </p>

        <h2>Hur du bidrar</h2>
        <p>
          Det enklaste sättet är att öppna en diskussion på GitHub med en invändning, en
          fråga, eller ett förslag till ett nytt experiment i Appendix A. Om du vill bidra
          med en artikel, läs CONTRIBUTING.md för format och granskningsprocess.
        </p>

        <h2>Kontakt</h2>
        <p>
          Alla diskussioner förs öppet på{' '}
          <a href="https://github.com/geekracing/deeperthought/discussions">
            GitHub Discussions
          </a>
          . Det finns ingen privat e-postadress för projektfrågor.
        </p>
      </article>
    </div>
  )
}
