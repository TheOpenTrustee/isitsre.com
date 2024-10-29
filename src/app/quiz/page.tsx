'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const questions = [
  {
    question: "What does SRE stand for?",
    options: [
      "Software Reliability Engineering",
      "System Reliability Engineering",
      "Site Reliability Engineering",
      "Service Reliability Engineering"
    ],
    correctAnswer: 2
  },
  {
    question: "Which of the following is NOT one of the SRE principles?",
    options: [
      "Embracing Risk",
      "Eliminating Toil",
      "Monitoring",
      "Avoiding Automation"
    ],
    correctAnswer: 3
  },
  {
    question: "What is the primary goal of SRE?",
    options: [
      "To increase system complexity",
      "To balance reliability and innovation",
      "To eliminate all system failures",
      "To replace traditional operations teams"
    ],
    correctAnswer: 1
  },
  {
    question: "What is an SLO in SRE?",
    options: [
      "Service Level Objective",
      "System Load Optimizer",
      "Software Lifecycle Operation",
      "Site Latency Observation"
    ],
    correctAnswer: 0
  },
  {
    question: "Which practice is central to SRE's approach to managing failures?",
    options: [
      "Avoiding all risks",
      "Blameless postmortems",
      "Immediate system shutdown",
      "Hiring more engineers"
    ],
    correctAnswer: 1
  }
]

export default function SREQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setSelectedAnswer(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <h1 className={`text-3xl font-bold text-center text-[#E2E8F0] mb-4 ${spaceGrotesk.className}`}>SRE Basics Quiz</h1>
          <p className="text-center text-[#A0AEC0] mb-8">
            Test your knowledge of Site Reliability Engineering principles
          </p>
          {!quizCompleted ? (
            <>
              <h2 className={`text-lg font-semibold mb-4 text-[#E2E8F0] ${spaceGrotesk.className}`}>
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-lg mb-4 text-[#E2E8F0]">{questions[currentQuestion].question}</p>
              <RadioGroup value={selectedAnswer?.toString()} className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      onClick={() => handleAnswerSelection(index)}
                      className="border-[#D97706]"
                    />
                    <Label htmlFor={`option-${index}`} className="text-[#E2E8F0]">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between items-center mt-8">
                {selectedAnswer !== null && (
                  <div className="flex items-center">
                    {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle2 className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="text-red-500 mr-2" />
                    )}
                    <p className="text-[#E2E8F0]">
                      {selectedAnswer === questions[currentQuestion].correctAnswer
                        ? "Correct!"
                        : "Incorrect. Try again!"}
                    </p>
                  </div>
                )}
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-[#D97706] hover:bg-[#B45309] text-white"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 text-[#E2E8F0] ${spaceGrotesk.className}`}>Quiz Completed!</h2>
              <p className="text-lg mb-2 text-[#E2E8F0]">Your score:</p>
              <p className={`text-3xl font-bold mb-4 text-[#D97706] ${spaceGrotesk.className}`}>{score} / {questions.length}</p>
              <p className="mb-8 text-[#A0AEC0]">
                {score === questions.length
                  ? "Perfect score! You're an SRE expert!"
                  : score >= questions.length / 2
                  ? "Great job! You have a good understanding of SRE principles."
                  : "Keep learning! SRE has a lot to offer."}
              </p>
              <Button onClick={resetQuiz} className="w-full bg-[#D97706] hover:bg-[#B45309] text-white">Retake Quiz</Button>
            </div>
          )}
        </div>
      </main>
  )
}