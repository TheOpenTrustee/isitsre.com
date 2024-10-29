import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase } from "lucide-react"
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function ApplyRecruiter() {
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
              Apply to Recruiter Directory
            </h1>
            <form className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                <Input id="name" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input id="email" type="email" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                <Input id="company" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium mb-2">Specialization</label>
                <Input id="specialization" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">Years of Experience in SRE Recruitment</label>
                <Input id="experience" type="number" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-2">Short Bio</label>
                <Textarea id="bio" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" rows={4} required />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
                <Input id="linkedin" type="url" className="w-full bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" required />
              </div>
              <Button type="submit" className="w-full bg-[#D97706] hover:bg-[#B45309] text-white">
                Submit Application
              </Button>
            </form>
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