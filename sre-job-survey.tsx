"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const questions = [
  {
    id: 1,
    text: "Does the job posting mention 'Site Reliability Engineering' or 'SRE' explicitly?",
    options: ["Yes", "No", "Not sure"]
  },
  {
    id: 2,
    text: "Does the role involve working with both development and operations teams?",
    options: ["Yes", "No", "Not mentioned"]
  },
  {
    id: 3,
    text: "Are there responsibilities related to monitoring system performance and reliability?",
    options: ["Yes", "No", "Unclear"]
  },
  {
    id: 4,
    text: "Does the posting mention automation of operational tasks?",
    options: ["Yes", "No", "Not explicitly stated"]
  },
  {
    id: 5,
    text: "Is there a focus on scalability and performance optimization?",
    options: ["Yes", "No", "Not emphasized"]
  }
]

export default function SREJobSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateSREScore = () => {
    const positiveAnswers = Object.values(answers).filter(answer => answer === "Yes").length
    return (positiveAnswers / questions.length) * 100
  }

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  }

  return (
    <div className={`flex flex-col min-h-screen bg-[#0A0A0A] text-[#E2E8F0] ${inter.className}`}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#1C1C1C]">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-6 w-6 text-[#D97706]" />
          <span className={`ml-2 text-lg font-bold ${spaceGrotesk.className}`}>IsItSRE?</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/recruiters">
            Recruiters
          </Link>
          <Link className="text-sm font-medium hover:text-[#D97706]" href="/job-ads">
            Job Ads
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <h1 className={`text-3xl font-bold text-center text-[#E2E8F0] mb-8 ${spaceGrotesk.className}`}>SRE Job Posting Survey</h1>
          <div className="w-full bg-[#2C2C2C] h-2 rounded-full mb-8">
            <div
              className="bg-[#D97706] h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${showResult ? 100 : ((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className={`text-2xl font-bold mb-6 text-[#E2E8F0] ${spaceGrotesk.className}`}>{questions[currentQuestion].text}</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="text-lg py-4 px-6 bg-[#2C2C2C] hover:bg-[#3C3C3C] border border-[#3C3C3C] text-[#E2E8F0]"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <h2 className={`text-3xl font-bold mb-6 text-[#E2E8F0] ${spaceGrotesk.className}`}>Survey Complete!</h2>
                <p className="text-xl mb-4 text-[#E2E8F0]">
                  Based on your answers, this job posting is
                  <span className={`font-bold text-2xl block mt-2 text-[#D97706] ${spaceGrotesk.className}`}>
                    {calculateSREScore() >= 60 ? "likely" : "unlikely"} to be a true SRE role.
                  </span>
                </p>
                <p className="text-lg mb-8 text-[#E2E8F0]">
                  SRE Match Score: {calculateSREScore().toFixed(0)}%
                </p>
                <Button onClick={() => {setCurrentQuestion(0); setAnswers({}); setShowResult(false)}} className="bg-[#D97706] hover:bg-[#B45309] text-white">
                  Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && currentQuestion > 0 && (
            <Button onClick={handlePrevious} className="mt-8 bg-[#2C2C2C] hover:bg-[#3C3C3C] text-[#E2E8F0]">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
        </div>
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