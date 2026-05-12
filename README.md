# Beto vs Yadira — 5 años de batalla 🎌

App web de aniversario con temática de Kaguya-sama: Love is War.

## Setup

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy a Vercel

```bash
# Opción 1: desde CLI
npx vercel

# Opción 2: conecta el repo en vercel.com y hace auto-deploy
```

## Agregar los avatares anime

1. Genera los avatares con ChatGPT / Midjourney en formato cuadrado (512x512 mínimo)
2. Guárdalos como:
   - `public/avatars/yadira.png`
   - `public/avatars/beto.png`
3. En `src/components/screens/FinalScreen.tsx`, busca los comentarios `{/* Replace with: */}` y reemplaza el emoji por:

```tsx
import Image from "next/image";

<Image src="/avatars/yadira.png" alt="Yadira" width={80} height={80} className="object-cover" />
<Image src="/avatars/beto.png" alt="Beto" width={80} height={80} className="object-cover" />
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx       # Metadata + fonts
│   ├── page.tsx         # Orquestador de pantallas
│   └── globals.css      # Estilos globales + animaciones
├── components/
│   ├── NarratorBlock.tsx
│   ├── Petals.tsx
│   └── screens/
│       ├── IntroScreen.tsx
│       ├── RoundScreen.tsx
│       ├── ExpedienteScreen.tsx
│       └── FinalScreen.tsx
├── data/
│   └── content.ts       # ← Todo el contenido aquí
└── hooks/
    └── useTypewriter.ts
```

## Personalizar contenido

Todo el texto está en `src/data/content.ts`. Edita ahí si quieres cambiar algo antes de compartirlo.
