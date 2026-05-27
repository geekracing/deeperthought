# Bidra till Deeper Thought

Alla är välkomna att forka, invända, och bidra med artiklar. Det finns
tre sätt att delta:

## 1. Diskutera

Öppna en diskussion på [GitHub Discussions](https://github.com/kjellandersson/deeperthought/discussions).
Kategorierna är:

- **Invändningar** – argument mot ett lager eller en invariant
- **Frågor** – om ramverkets definitioner eller metod
- **Experiment** – förslag till nya experiment för Appendix A
- **Allmänt** – övrigt

## 2. Forka ramverket

Du är fri att forka repot och bygga vidare på ramverket i valfri riktning.
Om du gör substantiella ändringar, lägg gärna upp en diskussion om varför.

## 3. Bidra med en artikel till biblioteket

Artiklar är analyser av filosofer, teorier, eller idéer mot ramverkets
lager och invarianter. De granskas via en kombination av AI-koherensanalys
och community peer review.

### Format

Skapa filen `content/artiklar/ditt-slug.md` med denna frontmatter:

```yaml
---
title: "Artikelns titel"
author: "Ditt namn"
date: "ÅÅÅÅ-MM-DD"
thinker: "Tänkarens namn (om tillämpligt)"
layers: [1, 2, 3]  # vilka lager artikeln primärt berör
status: draft      # lämna som draft, ändras till published efter granskning
---
```

### Krav på artikeln

En artikel ska:

1. Specificera vilket system eller vilka påståenden som analyseras
2. Koppla analysen explicit till minst ett lager (0–3) eller en invariant
3. Identifiera vad som är koherent och vad som krockar med ramverket
4. Göra minst ett falsifierbart påstående
5. Inte vara ett referat – det ska vara en analys

### Granskningsprocess

1. Öppna en Pull Request med din artikel
2. En GitHub Action kör automatiskt en AI-koherensanalys och postar
   resultatet som kommentar på PR:en
3. Minst 2 community-granskare approvar PR:en (review på GitHub)
4. Kärngranskning av projektadministratör → merge → status sätts till `published`

### Vad som avvisas

- Artiklar utan explicit koppling till ramverkets lager eller invarianter
- Referat utan analytisk tillämpning
- Påståenden som inte är operationaliserbara
- Politiska eller ideologiska argument som saknar empirisk specificering

## Kodstandard (för sajtutveckling)

Projektet använder Next.js med TypeScript. Kör `npm run build` och se till
att det inte finns TypeScript-fel innan du öppnar en PR med kodändringar.

## Licensfrågor

Ramverkets textinnehåll (`content/`) är licensierat under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Källkoden (`app/`, `components/`, `lib/`) är licensierad under MIT.
