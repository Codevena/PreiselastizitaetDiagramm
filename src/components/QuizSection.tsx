'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, HelpCircle, Lightbulb, RotateCcw } from 'lucide-react'

const questions = [
  {
    id: 'a',
    question: 'Bei welchem Preis befindet sich der Markt im Gleichgewicht?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 1,
    explanation: 'Im Gleichgewicht schneiden sich Angebots- und Nachfragekurve. Dies geschieht bei P2, dem mittleren Preis, wo Angebot und Nachfrage ausgeglichen sind.'
  },
  {
    id: 'b',
    question: 'Welcher Preis stellt einen staatlich festgesetzten Höchstpreis dar?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Ein Höchstpreis liegt unter dem Gleichgewichtspreis P2. P3 ist der niedrigste Preis und würde als Höchstpreis fungieren, um Verbraucher zu schützen.'
  },
  {
    id: 'c',
    question: 'Welcher Preis stellt einen staatlich festgesetzten Mindestpreis dar?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Ein Mindestpreis liegt über dem Gleichgewichtspreis P2. P1 ist der höchste Preis und würde als Mindestpreis fungieren, um Produzenten zu schützen.'
  },
  {
    id: 'd',
    question: 'Bei welchem Preis besteht ein Angebotsmengenüberschuss?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Bei P1 ist der Preis hoch, wodurch das Angebot die Nachfrage übersteigt. Produzenten möchten mehr verkaufen, als Konsumenten kaufen wollen.'
  },
  {
    id: 'e',
    question: 'Bei welchem Preis besteht ein Nachfragemengenüberschuss?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Bei P3 ist der Preis niedrig, wodurch die Nachfrage das Angebot übersteigt. Konsumenten möchten mehr kaufen, als Produzenten anbieten.'
  },
  {
    id: 'f',
    question: 'Bei welchem Preis kommt es zur Bildung sogenannter "Schwarzer Märkte"?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Schwarze Märkte entstehen bei Höchstpreisen (P3), wenn die Nachfrage das legale Angebot übersteigt. Menschen sind bereit, höhere Preise auf illegalen Märkten zu zahlen.'
  },
  {
    id: 'g',
    question: 'Bei welchem Preis kommt es zur Bildung sogenannter "Grauer Märkte"?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Graue Märkte entstehen bei Mindestpreisen (P1), wenn Produzenten versuchen, ihre Überschüsse in anderen Märkten oder durch Umgehung der Regulierung zu verkaufen.'
  }
]

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({})

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const handleShowExplanation = (questionIndex: number) => {
    setShowExplanation(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }))
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setShowExplanation({})
    setCurrentQuestion(0)
  }

  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 card-hover"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Quiz & Vertiefung</h2>
          </div>
          
          {showResults && (
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Wiederholen
            </button>
          )}
        </div>

        {!showResults ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-400">
                Frage {currentQuestion + 1} von {questions.length}
              </span>
              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index <= currentQuestion ? 'bg-primary-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswer(currentQuestion, optionIndex)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          selectedAnswers[currentQuestion] === optionIndex
                            ? 'border-primary-500 bg-primary-500/10 text-white'
                            : 'border-dark-600 bg-dark-600/50 text-gray-300 hover:border-dark-500 hover:bg-dark-600/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === optionIndex
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-500'
                          }`}>
                            {selectedAnswers[currentQuestion] === optionIndex && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-medium transition-colors"
                  >
                    Zurück
                  </button>
                  
                  {currentQuestion === questions.length - 1 ? (
                    <button
                      onClick={() => setShowResults(true)}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Ergebnisse anzeigen
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Weiter
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                percentage >= 80 ? 'bg-green-500/20' : percentage >= 60 ? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <span className={`text-3xl font-bold ${
                  percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {percentage}%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {score} von {questions.length} Fragen richtig
              </h3>
              <p className="text-gray-300">
                {percentage >= 80 ? 'Ausgezeichnet! Du hast das Thema sehr gut verstanden.' :
                 percentage >= 60 ? 'Gut gemacht! Du hast die Grundlagen verstanden.' :
                 'Nicht schlecht! Wiederhole das Material und versuche es erneut.'}
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="bg-dark-700/50 rounded-xl p-6 border border-dark-600">
                  <div className="flex items-start gap-3 mb-3">
                    {selectedAnswers[index] === question.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{question.question}</h4>
                      <p className="text-sm text-gray-300 mb-3">
                        Deine Antwort: <span className={selectedAnswers[index] === question.correct ? 'text-green-400' : 'text-red-400'}>
                          {question.options[selectedAnswers[index]] || 'Nicht beantwortet'}
                        </span>
                      </p>
                      {selectedAnswers[index] !== question.correct && (
                        <p className="text-sm text-green-400 mb-3">
                          Richtige Antwort: {question.options[question.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleShowExplanation(index)}
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showExplanation[index] ? 'Erklärung ausblenden' : 'Erklärung anzeigen'}
                  </button>
                  
                  <AnimatePresence>
                    {showExplanation[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg"
                      >
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
