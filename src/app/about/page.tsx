'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Target } from "lucide-react"
import { Space_Grotesk } from 'next/font/google'

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
    <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[#1C1C1C]">
        <section className={`w-full py-12 md:py-24 lg:py-32  ${spaceGrotesk.className}`}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <Lightbulb className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className="text-[#E2E8F0]">Why IsItSRE was born</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0] mb-4">
                    IsItSRE.com was born from a simple observation: many job postings labeled as &quot;Site Reliability Engineering&quot; (SRE) roles don&apos;t actually align with the principles and practices of SRE.
                  </p>
                  <p className="text-sm text-[#A0AEC0] mb-4">
                    The site owner shared this idea on LinkedIn:
                  </p>
                  <blockquote className="border-l-4 border-[#D97706] pl-4 italic mb-4 text-sm text-[#A0AEC0]">
                  &quot;I&apos;m tempted to start a website called isitsre.com. Have it do simple keyword analysis to see if the job posting is actually an SRE job or if it has nothing to do with the activities of an SRE.&quot;
                  </blockquote>
                  <p className="text-sm text-[#A0AEC0]">
                    This idea resonated with many in the SRE community despite being a joke, highlighting the need for a tool to help both job seekers and employers better understand what truly constitutes an SRE role.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#2C2C2C] border-[#3C3C3C]">
                <CardHeader>
                  <Target className="h-8 w-8 mb-2 text-[#D97706]" />
                  <CardTitle className="text-[#E2E8F0]">So what&apos;s the point?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#A0AEC0] mb-4">
                    The point of IsItSRE is to bring clarity to the field of Site Reliability Engineering by:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-[#A0AEC0]">
                    <li>Educating both employers and job seekers about what constitutes a true SRE role</li>
                    <li>Analyzing job postings to determine their alignment with SRE principles</li>
                    <li>Providing links to resources for SREs to assess their skills and knowledge</li>
                    <li>Linking to communities of SRE professionals and enthusiasts</li>
                  </ul>
                  <p className="text-sm text-[#A0AEC0]">
                    By improving the accuracy of SRE job postings, companies build more effective teams and help retain SREs in roles that truly match their skills and interests.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
  )
}