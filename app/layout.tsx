import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product AI Prompts - Validate Your Product Idea in 2 Weeks',
  description: 'Interactive AI validation system for creators, founders, and online sellers. Get a personalized report with validation score, risks, opportunities, and 30-day action plan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
