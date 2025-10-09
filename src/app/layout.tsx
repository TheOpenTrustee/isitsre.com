import { Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { GoogleTagManager } from '@next/third-parties/google'


import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'IsItSRE? - Decode SRE Job Postings',
  description: 'Analyze job postings to determine if they truly align with Site Reliability Engineering principles.',
  keywords: ['SRE', 'Site Reliability Engineering', 'Job Analysis', 'Tech Careers'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#E2E8F0]">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#1C1C1C]">
          <Link className="flex items-center justify-center" href="/">
            <BookOpen className="h-6 w-6 text-[#D97706]" />
            <span className="ml-2 text-lg font-bold font-space-grotesk">IsItSRE?</span>
            <span className="pl-2 text-xs">alpha-0.0.1</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-[#D97706]" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-[#D97706]" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-[#D97706]" href="/tree">
              Tree of SRE
            </Link>
            <Link className="text-sm font-medium hover:text-[#D97706]" href="/coverage">
              Coverage Map
            </Link>
            {/* <Link className="text-sm font-medium hover:text-[#D97706]" href="/recruiters">
              Recruiters
            </Link>
            <Link className="text-sm font-medium hover:text-[#D97706]" href="/job-ads">
              Job Ads
            </Link> */}
          </nav>
        </header>
          {children}
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1C1C1C]">
          <p className="text-xs text-[#A0AEC0]">&copy; 2024 <a href="https://pltfrm.team">pltfrm.team</a> All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            {/* <Link className="text-xs hover:text-[#D97706]" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs hover:text-[#D97706]" href="/privacy">
              Privacy
            </Link> */}
          </nav>
        </footer>
        <GoogleTagManager gtmId={""} />
      </body>
    </html>
  )
}