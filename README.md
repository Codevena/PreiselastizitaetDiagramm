# Interaktive Lern-Landingpage: Preisbildung

Eine moderne, interaktive Lernplattform zum Thema Preisbildung in der Mikroökonomie mit Fokus auf Preiselastizität und Kreuzpreiselastizität.

## Features

- 🎯 **Interaktives Diagramm**: Angebot-Nachfrage-Kurven mit Echtzeit-Manipulation
- 📊 **Datenvisualisierung**: Responsive Charts mit Recharts
- 🎮 **Interaktives Quiz**: 7 Fragen mit detaillierten Erklärungen
- 🎨 **Modernes Design**: Dunkles Theme mit Glasmorphismus-Effekten
- 📱 **Responsive**: Optimiert für alle Bildschirmgrößen
- ⚡ **Performance**: Next.js 15 mit Turbopack
- 🎭 **Animationen**: Smooth Framer Motion Übergänge

## Technologie-Stack

- **Framework**: Next.js 15 mit App Router
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **TypeScript**: Vollständige Typisierung

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
npm start
```

## Deployment auf Vercel

1. Repository zu GitHub pushen
2. Vercel Dashboard öffnen
3. "New Project" → Repository auswählen
4. Deploy klicken

Oder via Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Lernziele

Die Plattform vermittelt:
- Grundlagen der Preiselastizität
- Angebot-Nachfrage-Mechanismen
- Marktgleichgewicht
- Staatliche Preisregulierung
- Schwarze und graue Märkte

## Struktur

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── HeroSection.tsx
    ├── IntroductionSection.tsx
    ├── DefinitionSection.tsx
    ├── InteractiveDiagram.tsx
    ├── QuizSection.tsx
    └── ProgressBar.tsx
```

## Lizenz

MIT License
