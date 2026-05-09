# Fysikkhjelpen MEK1400

Statisk nettside med repetisjonsoppgaver til Young & Freedman *University Physics with Modern Physics* (15. utg., SI).
Designet for å hostes **gratis** på GitHub Pages.

374 oppgaver, 12 kapitler, ingen byggeprosess. Dobbeltklikk `index.html` lokalt for å se siden uten internett.

---

## Filstruktur

```
fysikkhjelpenMEK1400/
├── index.html              # Forside
├── style.css               # Stilark
├── quiz.js                 # Quiz-logikk (JavaScript)
├── kapittel-1.html ... kapittel-23.html
├── om.html                 # Om-side
├── studietips.html         # Studietips
├── .nojekyll               # Tvinger GitHub til å levere filene rått
└── README.md               # Denne fila
```

Alle interne lenker er relative (`href="kapittel-1.html"`), så siden virker både
lokalt på din egen maskin og under et hvilket som helst subpath på GitHub Pages.

---

## Slik publiserer du på GitHub Pages

To valg å ta først, så fem klikk.

### Velg URL-stil

| URL-stil                              | Repo-navn                    | Resultat                                          |
|---------------------------------------|------------------------------|---------------------------------------------------|
| **Project page** *(enklest)*          | hva som helst, f.eks. `fysikkhjelpen-mek1400` | `https://<brukernavn>.github.io/fysikkhjelpen-mek1400/` |
| **User page** *(litt kortere URL)*    | nøyaktig `<brukernavn>.github.io` | `https://<brukernavn>.github.io/`                |

Project page er det enkleste. User page gir en penere URL, men du får
kun ÉN slik per GitHub-konto. Hvis du allerede har et `.github.io`-repo,
hold deg til project page.

### Steg-for-steg

1. **Lag GitHub-konto** på [github.com](https://github.com) hvis du ikke har det. Brukernavnet ditt blir synlig i URL-en — velg noe du står inne for.

2. **Lag et nytt repository:**
   - Klikk **+ → New repository** øverst til høyre.
   - Repository name:
     - Project page: `fysikkhjelpen-mek1400` (eller hva du vil).
     - User page: nøyaktig `<dittbrukernavn>.github.io`.
   - Visibility: **Public**.
   - Ikke huk av for README/license/gitignore — vi har det allerede.
   - Klikk **Create repository**.

3. **Last opp filene:**
   - På den tomme repo-siden, klikk lenken **uploading an existing file** (i den grå boksen).
   - Pakk ut zipen lokalt først. Dra så hele *innholdet* i `fysikkhjelpenMEK1400`-mappa
     (alle HTML-filene, `style.css`, `quiz.js`, `.nojekyll`, `README.md`) inn i opplastingsfeltet.
   - **Viktig**: dra innholdet, ikke selve mappa. Filene skal ligge i roten av repoet,
     ikke i en undermappe.
   - `.nojekyll` er en skjult fil. Vis skjulte filer i Finder (Cmd+Shift+.) eller
     Explorer (View → Hidden items) hvis du ikke ser den.
   - Scroll ned, klikk **Commit changes**.

4. **Skru på GitHub Pages:**
   - Gå til **Settings → Pages** (i sidemenyen til repoet).
   - Under **Source**: velg `Deploy from a branch`.
   - Branch: `main`. Folder: `/ (root)`. Klikk **Save**.

5. **Vent ca. 1–2 minutter.** Refresh Pages-siden, så viser den at siden er live, med URL-en din.

Du er ferdig. Siden ligger nå gratis på internett.

---

## Vedlikehold

For å oppdatere innholdet:

1. Rediger HTML-filene direkte i GitHub-grensesnittet (klikk på fila, så blyantikonet),
   eller redger lokalt og last opp.
2. Hver kapittel-fil har spørsmålsdataene som JSON i en `<script>`-blokk nederst.
   Gyldig JSON er kritisk: bruk doble anførselstegn (`"`), komma mellom elementer,
   og ingen avsluttende komma før `]`. Bryt JSON-en og siden slutter å virke.
3. Commit endringen. GitHub Pages bygger om siden automatisk i løpet av et minutt.

For å legge til en ny side: lag fila, lenk til den fra `topbar`-blokken i alle de
andre filene (eller fra forsiden), commit.

---

## Hvis du senere vil ha eget domene

Du kan alltids legge på et eget domene senere uten å miste noe — GitHub-URL-en
fortsetter å virke som backup. Da legger du inn en `CNAME`-fil med domenenavnet
i roten av repoet, og setter DNS hos registraren mot GitHub sine IP-er
(185.199.108.153–111.153 som A-poster). Mer detaljer i GitHub sin dokumentasjon
under "Managing a custom domain for your GitHub Pages site".

---

## Lisens og opphavsrett

- **Spørsmålsbanken**: originalt formulert studiestoff. Bruk fritt til personlig studiebruk.
- **Læreboka** *University Physics with Modern Physics* © Pearson Education. Ikke gjengitt på siden.
- **Kildekoden** (HTML/CSS/JS): bruk gjerne fritt.
