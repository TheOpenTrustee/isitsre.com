'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building2, ClipboardCheck, BrainCircuit } from "lucide-react"
import { Inter, Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function Homepage() {
  const [jobUrl, setJobUrl] = useState('')
  const [analysisResult, setAnalysisResult] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    // Simulating an API call
    setTimeout(() => {
      setAnalysisResult('This job posting appears to be a genuine SRE role.')
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <main className="flex-1 h-full">
        <section className="w-full py-6 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-8">
                <h1 className={`text-xl text-[#D97706] sm:text-xl md:text-2xl lg:text-4xl/none ${spaceGrotesk.className}`}>Have you been playing the SRE lottery?</h1>
                <h2 className={`text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-8xl/none ${spaceGrotesk.className}`}>
                  Is It SRE?
                </h2>
                <p className="mx-auto max-w-[700px] text-[#A0AEC0] md:text-xl">
                Whether you're in a job and having a mental schism or looking for SRE positions and wondering where the mention of SRE practice is, this site can help you navigate the SRE opportunities through surveys and tools.
                </p>
              </div>
              {/* <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input 
                    className="max-w-lg flex-1 bg-[#1C1C1C] border-[#2C2C2C] text-[#E2E8F0]" 
                    placeholder="Paste job description URL" 
                    type="url" 
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isAnalyzing} className="bg-[#D97706] hover:bg-[#B45309] text-white">
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </form>
                <p className="text-xs text-[#A0AEC0]">
                  Or upload a job description file
                </p>
              </div> */}
              {analysisResult && (
                <div className="mt-4 p-4 bg-[#1C1C1C] text-[#D97706] rounded-md border border-[#D97706]">
                  {analysisResult}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-3 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <BrainCircuit className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className={`text-[#E2E8F0] ${spaceGrotesk.className}`}>Test Your SRE Knowledge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0] mb-4">
                    Challenge yourself with our comprehensive SRE quiz and assess your expertise in the field.
                  </p>
                  <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                    <Link href="/quiz">Take the Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <ClipboardCheck className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className={`text-[#E2E8F0] ${spaceGrotesk.className}`}>Is It SRE Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0] mb-4">
                    Use our interactive checklist to determine if a job truly aligns with SRE principles and practices.
                  </p>
                  <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                    <Link href="/checklist">Start Checklist</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl ${spaceGrotesk.className}`}>What's involved in being an SRE?</h2>
                <p className="max-w-[900px] text-[#A0AEC0] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See the SRE skill tree as an interactive map.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                  <Link href="/tree">View the Skill Tree</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className={`text-[#E2E8F0] ${spaceGrotesk.className}`}>Job Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0]">
                    Our AI-powered tool analyzes job postings to determine if they truly reflect SRE principles and responsibilities.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <Building2 className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className={`text-[#E2E8F0] ${spaceGrotesk.className}`}>Company Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0]">
                    Access our curated database of companies with genuine SRE roles and their engineering cultures.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl ${spaceGrotesk.className}`}>Join the SRE Community *</h2>
                <p className="max-w-[900px] text-[#A0AEC0] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  * Reliability.org is a community for people interested in achieving better software application and infrastructure reliability through design, development, and operations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                  <Link href="https://join.slack.com/t/reliability-org/shared_invite/zt-2ksxyvzvm-GzTE0M8Cxw2u_G0xdPLYFA" target="_blank" rel="noopener noreferrer">
                    Join Reliability.org Slack
                  </Link>
                </Button>
              </div>
              <p>
                * IsItSre.com is not affiliated with reliability.org
              </p>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl ${spaceGrotesk.className}`}>Approved Recruiters & Verified Job Ads</h2>
                <p className="max-w-[900px] text-[#A0AEC0] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find trusted recruiters and verified SRE job opportunities.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                  <Link href="/recruiters">View Approved Recruiters</Link>
                </Button>
                <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white" asChild>
                  <Link href="/job-ads">Browse Verified Job Ads</Link>
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>
  )
}