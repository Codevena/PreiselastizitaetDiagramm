import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Preiselastizität und Kreuzpreiselastizität',
  description: 'Verstehe, wie sich Preisänderungen auf die Nachfrage auswirken - Interaktive Wirtschaftslehre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
        {children}
      </body>
    </html>
  )
}
