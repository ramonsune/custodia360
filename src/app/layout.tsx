import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'custodia360 - Cumplimiento LOPIVI Automático',
  description: 'Implementación LOPIVI completa en 24 horas. Protege tu entidad con menores de forma automática y cumple la normativa. Ahorra 97% vs consultorías tradicionales.',
  keywords: 'LOPIVI, protección menores, cumplimiento normativo, entidades deportivas, centros educativos',
  authors: [{ name: 'custodia360' }],
  openGraph: {
    title: 'custodia360 - Cumplimiento LOPIVI Automático',
    description: 'Implementación LOPIVI completa en 24 horas. Protege tu entidad con menores.',
    type: 'website',
    url: 'https://custodia360.es',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
