import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Search, UserCheck } from "lucide-react"
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function RecruiterDirectory() {
  return (
    <div className={`flex flex-col min-h-screen bg-[#0A0A0A] text-[#E2E8F0] ${inter.className}`}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#1C1C1C]">
        <Link className="flex items-center justify-center" href="/">
          <Briefcase className="h-6 w-6 text-[#D97706]" />
          <span className={`ml-2 text-lg font-bold ${spaceGrotesk.className}`}>IsItSRE?</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/job-listings">
            Jobs
          </Link>
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/recruiters">
            Recruiters
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 ${spaceGrotesk.className}`}>
              SRE Recruiter Directory
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Input 
                className="max-w-lg flex-1 bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" 
                placeholder="Search recruiters..." 
                type="search"
              />
              <Button className="bg-[#D97706] hover:bg-[#B45309] text-white">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((recruiter) => (
                <div key={recruiter} className="p-6 bg-[#0F0F0F] border-l-4 border-[#D97706] rounded-r-lg hover:bg-[#1C1C1C] transition-colors duration-200">
                  <h2 className={`text-xl font-bold mb-2 text-[#E2E8F0] ${spaceGrotesk.className}`}>Jane Doe</h2>
                  <p className="text-sm text-[#A0AEC0] mb-2">TechRecruit Solutions</p>
                  <p className="text-sm text-[#A0AEC0] mb-4">Specializing in SRE and DevOps roles</p>
                  <Button asChild className="bg-[#D97706] hover:bg-[#B45309] text-white">
                    <Link href={`mailto:jane@techrecruit.com`}>Contact Recruiter</Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild className="bg-[#D97706] hover:bg-[#B45309] text-white">
                <Link href="/apply-recruiter">Apply to Directory</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1C1C1C]">
        <p className="text-xs text-[#A0AEC0]">© 2024 IsItSRE? All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-[#D97706]" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-[#D97706]" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}