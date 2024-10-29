import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Building, Calendar } from "lucide-react"
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function JobDetails() {
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
            <div className="mb-8">
              <h1 className={`text-3xl font-bold text-[#E2E8F0] mb-4 ${spaceGrotesk.className}`}>
                Senior SRE at TechCorp
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-[#A0AEC0]">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  TechCorp
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  San Francisco, CA (Remote)
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Posted on June 1, 2024
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${spaceGrotesk.className}`}>Job Description</h2>
                <p className="text-[#A0AEC0]">
                  TechCorp is seeking an experienced Senior SRE to join our growing team. In this role, you will be
                  responsible for designing, implementing, and maintaining our infrastructure to ensure high
                  availability, scalability, and performance of our systems.
                </p>
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${spaceGrotesk.className}`}>Requirements</h2>
                <ul className="list-disc list-inside text-[#A0AEC0] space-y-2">
                  <li>5+ years of experience in SRE or similar roles</li>
                  <li>Strong knowledge of cloud platforms (AWS, GCP, Azure)</li>
                  <li>Experience with containerization and orchestration (Docker, Kubernetes)</li>
                  <li>Proficiency in at least one programming language (Go, Python, Java)</li>
                  <li>Excellent problem-solving and communication skills</li>
                </ul>
              </div>
              <div className="pt-4">
                <Button className="bg-[#D97706] hover:bg-[#B45309] text-white">
                  Apply Now
                </Button>
              </div>
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