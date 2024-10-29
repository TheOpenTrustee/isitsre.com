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
      question: "What is a Service Level Objective (SLO)?",
      options: [
        "A target value or range for a service’s reliability",
        "A detailed report on failures",
        "A list of tasks to improve reliability",
        "A roadmap for infrastructure upgrades"
      ],
      correctAnswer: 0
    },
    {
      question: "What is an acceptable percentage for a Service Level Agreement (SLA) breach?",
      options: [
        "1%",
        "0.01%",
        "Depends on the service contract",
        "Always 0%"
      ],
      correctAnswer: 2
    },
    {
      question: "Which of the following is NOT a reliability pattern?",
      options: [
        "Circuit Breaker",
        "Load Balancer",
        "Redundant Array of Independent Disks (RAID)",
        "Feature Flag"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the purpose of an error budget?",
      options: [
        "To allocate resources for error correction",
        "To balance feature velocity with reliability",
        "To define costs for outages",
        "To measure overall system performance"
      ],
      correctAnswer: 1
    },
    {
      question: "What is 'toil' in SRE terminology?",
      options: [
        "Repetitive, automatable operational tasks",
        "High-urgency incidents",
        "System logging processes",
        "Code that needs refactoring"
      ],
      correctAnswer: 0
    },
    {
      question: "Which tool is commonly used for monitoring in SRE?",
      options: [
        "Git",
        "Prometheus",
        "Docker",
        "Terraform"
      ],
      correctAnswer: 1
    },
    {
      question: "What does MTTR stand for?",
      options: [
        "Mean Time To Reliability",
        "Mean Time To Repair",
        "Most Time Taken to Restore",
        "Maximum Time to Resilience"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the difference between proactive and reactive incident management?",
      options: [
        "Proactive is solving issues before they occur; reactive is solving them afterward",
        "Proactive is using automation; reactive is using manual intervention",
        "Proactive is monitoring logs; reactive is analyzing reports",
        "There is no difference"
      ],
      correctAnswer: 0
    },
    {
      question: "What type of testing is crucial for SRE practices?",
      options: [
        "Unit Testing",
        "Chaos Testing",
        "Smoke Testing",
        "Integration Testing"
      ],
      correctAnswer: 1
    },
    {
      question: "In SRE, what does 'blameless postmortem' mean?",
      options: [
        "No one is held accountable for incidents",
        "Learning from incidents without focusing on individual fault",
        "All team members are equally blamed for failures",
        "Documenting errors in a fault-tolerant system"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of these is a primary goal of SRE?",
      options: [
        "Automating manual tasks",
        "Maximizing feature releases",
        "Improving system reliability",
        "Increasing security measures"
      ],
      correctAnswer: 2
    },
    {
      question: "What does 'availability' mean in SRE?",
      options: [
        "The system's uptime percentage",
        "The number of users the system can support",
        "The number of backup servers",
        "The latency of the system"
      ],
      correctAnswer: 0
    },
    {
      question: "Which SRE metric is most relevant to user experience?",
      options: [
        "Latency",
        "Throughput",
        "Capacity",
        "Scalability"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of a 'runbook' in SRE?",
      options: [
        "To document system features",
        "To guide response to incidents",
        "To list daily tasks",
        "To track development progress"
      ],
      correctAnswer: 1
    },
    {
      question: "What is 'observability' in the context of SRE?",
      options: [
        "The ability to monitor application performance",
        "The ability to understand a system's internal state by examining its outputs",
        "The process of storing logs for analysis",
        "A testing method for resilience"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a key metric in SRE?",
      options: [
        "Availability",
        "Latency",
        "Revenue",
        "Throughput"
      ],
      correctAnswer: 2
    },
    {
      question: "What is a common method for reducing toil?",
      options: [
        "Adding more staff",
        "Automating repetitive tasks",
        "Increasing working hours",
        "Reducing monitoring"
      ],
      correctAnswer: 1
    },
    {
      question: "Which tool is commonly used for alerting in SRE?",
      options: [
        "GitHub",
        "Slack",
        "PagerDuty",
        "Docker"
      ],
      correctAnswer: 2
    },
    {
      question: "In SRE, what is a 'service degradation'?",
      options: [
        "An increase in the cost of a service",
        "A decrease in service quality or performance",
        "A complete service failure",
        "A reduction in service availability by choice"
      ],
      correctAnswer: 1
    },
    {
      question: "What does SLA stand for in SRE?",
      options: [
        "Service Level Agreement",
        "System Log Analysis",
        "Service Level Assurance",
        "System Latency Analysis"
      ],
      correctAnswer: 0
    },
    {
      question: "Which of these is an example of a proactive reliability measure?",
      options: [
        "Incident response",
        "Routine server maintenance",
        "Postmortem analysis",
        "Blameless review"
      ],
      correctAnswer: 1
    },
    {
      question: "What is 'latency' in the context of SRE?",
      options: [
        "The time it takes to complete a system request",
        "The amount of data the system can handle",
        "The number of users the system supports",
        "The delay between updates"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the goal of a blameless culture in SRE?",
      options: [
        "Encouraging accountability",
        "Promoting open and honest learning",
        "Reducing employee turnover",
        "Increasing reliability"
      ],
      correctAnswer: 1
    }
  ];  

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