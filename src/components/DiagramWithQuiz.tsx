'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Dot } from 'recharts'
import { TrendingUp, Target, CheckCircle, XCircle, RotateCcw, Eye, EyeOff, Info, DollarSign, BookOpen, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import confetti from 'canvas-confetti'



const questions = [
  {
    id: 'a',
    question: 'Bei welchem Preis befindet sich der Markt im Gleichgewicht?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 1,
    explanation: 'Im Gleichgewicht schneiden sich Angebots- und Nachfragekurve. Dies geschieht bei P2 (50€), wo sich die beiden Linien kreuzen.'
  },
  {
    id: 'b',
    question: 'Welcher Preis stellt einen staatlich festgesetzten Höchstpreis dar?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Ein Höchstpreis liegt UNTER dem Gleichgewichtspreis. P3 (25€) ist niedriger als P2 (50€) und würde als Höchstpreis fungieren.'
  },
  {
    id: 'c',
    question: 'Welcher Preis stellt einen staatlich festgesetzten Mindestpreis dar?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Ein Mindestpreis liegt ÜBER dem Gleichgewichtspreis. P1 (75€) ist höher als P2 (50€) und würde als Mindestpreis fungieren.'
  },
  {
    id: 'd',
    question: 'Bei welchem Preis besteht ein Angebotsmengenüberschuss?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Bei P1 (75€) ist der Preis hoch. Angebotene Menge (75) > Nachgefragte Menge (25). Es gibt einen Überschuss von 50 Einheiten.'
  },
  {
    id: 'e',
    question: 'Bei welchem Preis besteht ein Nachfragemengenüberschuss?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Bei P3 (25€) ist der Preis niedrig. Nachgefragte Menge (75) > Angebotene Menge (25). Es gibt einen Nachfrageüberschuss von 50 Einheiten.'
  },
  {
    id: 'f',
    question: 'Bei welchem Preis kommt es zur Bildung sogenannter &quot;Schwarzer Märkte&quot;?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 2,
    explanation: 'Schwarze Märkte entstehen bei Höchstpreisen (P3). Die hohe Nachfrage kann nicht legal befriedigt werden, daher entstehen illegale Märkte.'
  },
  {
    id: 'g',
    question: 'Bei welchem Preis kommt es zur Bildung sogenannter &quot;Grauer Märkte&quot;?',
    options: ['P1 (hoher Preis)', 'P2 (mittlerer Preis)', 'P3 (niedriger Preis)'],
    correct: 0,
    explanation: 'Graue Märkte entstehen bei Mindestpreisen (P1). Produzenten haben Überschüsse und versuchen diese in anderen Märkten zu verkaufen.'
  }
]

export default function DiagramWithQuiz() {
  // Advanced diagram states (independent)
  const [advancedPrice, setAdvancedPrice] = useState(50)
  const [demandElasticity, setDemandElasticity] = useState(1)
  const [supplyElasticity, setSupplyElasticity] = useState(1)

  // Quiz diagram states (independent)
  const [selectedPrice, setSelectedPrice] = useState(50)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
  const [showAnswers, setShowAnswers] = useState(false)
  const [highlightedQuestion, setHighlightedQuestion] = useState<string | null>(null)

  // Animation states
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Generate data for advanced diagram
  const generateAdvancedData = () => {
    const data = []
    for (let quantity = 0; quantity <= 100; quantity += 2) {
      data.push({
        quantity,
        demand: Math.max(0, 100 - (quantity * demandElasticity)), // Elasticity affects curve steepness
        supply: Math.min(100, quantity * supplyElasticity), // Elasticity affects curve steepness
      })
    }
    return data
  }

  // Generate simple linear data for quiz diagram
  const generateQuizData = () => {
    const data = []
    for (let quantity = 0; quantity <= 100; quantity += 2) {
      data.push({
        quantity,
        demand: Math.max(0, 100 - quantity), // Simple linear demand
        supply: quantity, // Simple linear supply
      })
    }
    return data
  }

  const advancedData = generateAdvancedData()
  const quizData = generateQuizData()

  // Price points exactly like in the image
  const pricePoints = {
    P1: { price: 75, label: 'P1', color: '#EF4444' },
    P2: { price: 50, label: 'P2', color: '#10B981' },
    P3: { price: 25, label: 'P3', color: '#3B82F6' }
  }

  // Calculate quantities for quiz diagram
  const quantityDemanded = Math.max(0, 100 - selectedPrice)
  const quantitySupplied = Math.max(0, selectedPrice)

  // Calculate quantities for advanced diagram
  const advancedQuantityDemanded = Math.max(0, 100 - (advancedPrice * demandElasticity))
  const advancedQuantitySupplied = Math.min(100, advancedPrice * supplyElasticity)

  // Smooth price transition function
  const handlePriceChange = (newPrice: number) => {
    setIsTransitioning(true)
    setSelectedPrice(newPrice)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }



  const calculateScore = useCallback(() => {
    let correct = 0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++
      }
    })
    return correct
  }, [selectedAnswers])

  // Confetti animation for perfect score
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
    })
  }

  // Check for perfect score and trigger confetti
  useEffect(() => {
    if (showAnswers && Object.keys(selectedAnswers).length === questions.length) {
      const score = calculateScore()
      if (score === questions.length) {
        setTimeout(triggerConfetti, 500)
      }
    }
  }, [showAnswers, selectedAnswers, calculateScore])

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-dark-700"
      >


        {/* Advanced Interactive Diagram - The one you wanted restored! */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-4 sm:p-6 border border-indigo-700/30">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
            <span className="hidden sm:inline">Interaktive Marktanalyse</span>
            <span className="sm:hidden">Marktanalyse</span>
          </h3>

          <div className="grid xl:grid-cols-3 gap-6">
            {/* Advanced Chart */}
            <div className="xl:col-span-2 bg-dark-700/50 rounded-xl p-6 border border-dark-600">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Live-Diagramm</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAdvancedPrice(50)
                      setDemandElasticity(1)
                      setSupplyElasticity(1)
                    }}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Enhanced Chart */}
              <div className="h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={advancedData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="quantity"
                      stroke="#9CA3AF"
                      label={{ value: 'Menge (Q)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      label={{ value: 'Preis (P)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                    />

                    {/* Demand curve */}
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      dot={false}
                      name="Nachfrage"
                    />

                    {/* Supply curve */}
                    <Line
                      type="monotone"
                      dataKey="supply"
                      stroke="#EF4444"
                      strokeWidth={4}
                      dot={false}
                      name="Angebot"
                    />

                    {/* Current price line */}
                    <ReferenceLine
                      y={advancedPrice}
                      stroke="#F59E0B"
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      label={{ value: `${advancedPrice.toFixed(1)}€`, position: "left" }}
                    />

                    {/* Equilibrium point */}
                    <Dot cx={250} cy={150} r={8} fill="#10B981" stroke="#ffffff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Advanced Controls - Under the chart */}
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Preis: {advancedPrice.toFixed(1)}€
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    step="0.5"
                    value={advancedPrice}
                    onChange={(e) => setAdvancedPrice(Number(e.target.value))}
                    className="w-full h-4 bg-gradient-to-r from-yellow-600/40 to-yellow-500/40 rounded-lg appearance-none cursor-pointer slider-yellow"
                  />
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>5€</span>
                    <span>95€</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 rotate-180" />
                    Nachfrage-Elastizität: {demandElasticity.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={demandElasticity}
                    onChange={(e) => setDemandElasticity(Number(e.target.value))}
                    className="w-full h-4 bg-gradient-to-r from-blue-600/40 to-blue-500/40 rounded-lg appearance-none cursor-pointer slider-blue"
                  />
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Elastisch</span>
                    <span>Unelastisch</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-red-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Angebots-Elastizität: {supplyElasticity.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={supplyElasticity}
                    onChange={(e) => setSupplyElasticity(Number(e.target.value))}
                    className="w-full h-4 bg-gradient-to-r from-red-600/40 to-red-500/40 rounded-lg appearance-none cursor-pointer slider-red"
                  />
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Elastisch</span>
                    <span>Unelastisch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Statistics Panel */}
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-700/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Marktstatistiken
              </h4>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                    <div className="text-sm text-yellow-400 mb-1">Aktueller Status</div>
                    <div className="text-base font-bold text-white">
                      {advancedQuantitySupplied === advancedQuantityDemanded ? 'Gleichgewicht' :
                       advancedQuantitySupplied > advancedQuantityDemanded ? 'Angebotsüberschuss' : 'Nachfrageüberschuss'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Überschuss/Mangel</div>
                    <div className="text-xl font-bold text-white">
                      {Math.abs(advancedQuantitySupplied - advancedQuantityDemanded).toFixed(0)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded-lg">
                    <div className="text-sm text-green-400 mb-1">Konsumentenrente</div>
                    <div className="text-base font-bold text-green-400">
                      {((100 - advancedPrice) * advancedQuantityDemanded / 2).toFixed(0)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-red-600/10 border border-red-600/30 rounded-lg">
                    <div className="text-sm text-red-400 mb-1">Produzentenrente</div>
                    <div className="text-base font-bold text-red-400">
                      {(advancedPrice * advancedQuantitySupplied / 2).toFixed(0)}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-indigo-600/10 border border-indigo-600/30 rounded-lg">
                  <div className="text-sm text-indigo-400 mb-1">Preiselastizität</div>
                  <div className="text-base font-bold text-white">
                    {advancedPrice > 0 ? (advancedQuantityDemanded / advancedPrice).toFixed(2) : '∞'}
                  </div>
                  <div className="text-sm text-gray-400">
                    {(advancedQuantityDemanded / advancedPrice) > 1 ? 'Elastisch' : 'Unelastisch'}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Prohibitivpreis Explanation */}
        <div className="mb-8 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-700/30">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              Der Prohibitivpreis
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Der <strong className="text-amber-400">Prohibitivpreis</strong> ist der Preis, bei dem die Nachfrage nach einem Gut vollständig zum Erliegen kommt.
                Er markiert den höchsten Punkt auf der Nachfragekurve, bei dem die Menge null beträgt.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4 border border-amber-700/20">
                  <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 rotate-180" />
                    Nachfrage-Prohibitivpreis
                  </h4>
                  <p className="text-base text-gray-300">
                    In unserem Diagramm liegt er bei <strong className="text-blue-400">100€</strong>.
                    Oberhalb dieses Preises kauft niemand mehr das Produkt.
                  </p>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4 border border-amber-700/20">
                  <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Angebots-Mindestpreis
                  </h4>
                  <p className="text-base text-gray-300">
                    Bei <strong className="text-red-400">0€</strong> bietet niemand das Produkt an.
                    Dies ist der niedrigste Preis für ein Angebot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consumer and Producer Surplus Explanation */}
        <div className="mb-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-green-400" />
              Konsumentenrente und Produzentenrente
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Diese beiden Konzepte zeigen, wie viel <strong className="text-green-400">Nutzen</strong> Käufer und Verkäufer
                aus einem Markt ziehen können.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4 border border-green-700/20">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 rotate-180" />
                    Konsumentenrente
                  </h4>
                  <p className="text-base text-gray-300 mb-2">
                    Der <strong className="text-green-400">zusätzliche Nutzen</strong> für Käufer, die bereit wären,
                    mehr zu zahlen als den aktuellen Marktpreis.
                  </p>
                  <div className="text-sm text-green-200 bg-green-900/20 p-2 rounded">
                    <strong>Beispiel:</strong> Du würdest 80€ für ein Produkt zahlen, bekommst es aber für 50€.
                    Deine Konsumentenrente = 30€
                  </div>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4 border border-green-700/20">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Produzentenrente
                  </h4>
                  <p className="text-base text-gray-300 mb-2">
                    Der <strong className="text-red-400">zusätzliche Gewinn</strong> für Verkäufer, die bereit wären,
                    für weniger zu verkaufen als den aktuellen Marktpreis.
                  </p>
                  <div className="text-sm text-red-200 bg-red-900/20 p-2 rounded">
                    <strong>Beispiel:</strong> Du würdest für 20€ verkaufen, bekommst aber 50€.
                    Deine Produzentenrente = 30€
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-red-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-yellow-400" />
                  Warum ist das wichtig?
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-base">
                  <div>
                    <p className="text-green-300 mb-1"><strong>Konsumentenrente zeigt:</strong></p>
                    <ul className="text-sm text-gray-300 space-y-1 ml-2">
                      <li>• Wie zufrieden Käufer sind</li>
                      <li>• Ob Preise &quot;fair&quot; sind</li>
                      <li>• Wohlfahrt der Verbraucher</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-300 mb-1"><strong>Produzentenrente zeigt:</strong></p>
                    <ul className="text-sm text-gray-300 space-y-1 ml-2">
                      <li>• Wie profitabel Verkäufer sind</li>
                      <li>• Anreize für Unternehmen</li>
                      <li>• Wohlfahrt der Produzenten</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Rules Section */}
        <div className="mb-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Wichtige Regeln
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-base text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-red-400" />
                Hoher Preis (P1):
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• Wenige Kunden kaufen (niedrige Nachfrage)</li>
                <li>• Viele Verkäufer bieten an (hohes Angebot)</li>
                <li>• Ergebnis: <strong className="text-red-400">Angebotsüberschuss</strong></li>
                <li>• Kann zu &quot;Grauen Märkten&quot; führen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-blue-400" />
                Niedriger Preis (P3):
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• Viele Kunden wollen kaufen (hohe Nachfrage)</li>
                <li>• Wenige Verkäufer bieten an (niedriges Angebot)</li>
                <li>• Ergebnis: <strong className="text-blue-400">Nachfrageüberschuss</strong></li>
                <li>• Kann zu &quot;Schwarzen Märkten&quot; führen</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <Minus className="w-4 h-4 text-green-400" />
              Gleichgewichtspreis (P2):
            </h4>
            <p className="text-gray-300">Perfekte Balance! Angebot = Nachfrage. Alle sind zufrieden, kein Überschuss, kein Mangel.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left side: Simple Quiz Diagram */}
          <div className="space-y-6">
            <div className="bg-dark-700/50 rounded-xl p-4 sm:p-6 border border-dark-600 h-[500px] sm:h-[600px] flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Angebot-Nachfrage-Diagramm</h3>
              
              {/* Price point selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Preispunkte auswählen:
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(pricePoints).map(([key, point]) => (
                    <motion.button
                      key={key}
                      onClick={() => handlePriceChange(point.price)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                        selectedPrice === point.price
                          ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                          : 'border-dark-600 bg-dark-600/50 hover:border-dark-500 hover:bg-dark-600/70'
                      } ${isTransitioning ? 'animate-pulse' : ''}`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: point.color }}
                        />
                        <span className="font-semibold text-white">{point.label}</span>
                      </div>
                      <div className="text-xs text-gray-400">{point.price}€</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quizData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="quantity" 
                      stroke="#9CA3AF"
                      label={{ value: 'Menge', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      label={{ value: 'Preis', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                    />
                    
                    {/* Demand curve */}
                    <Line 
                      type="monotone" 
                      dataKey="demand" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={false}
                      name="Nachfrage"
                    />
                    
                    {/* Supply curve */}
                    <Line 
                      type="monotone" 
                      dataKey="supply" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      dot={false}
                      name="Angebot"
                    />
                    
                    {/* Price lines for P1, P2, P3 */}
                    <ReferenceLine y={75} stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: "P1", position: "left" }} />
                    <ReferenceLine y={50} stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" label={{ value: "P2", position: "left" }} />
                    <ReferenceLine y={25} stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" label={{ value: "P3", position: "left" }} />
                    
                    {/* Current selected price */}
                    <ReferenceLine 
                      y={selectedPrice} 
                      stroke="#F59E0B" 
                      strokeWidth={4} 
                      strokeDasharray="8 4"
                    />
                    
                    {/* Equilibrium point */}
                    <Dot cx={200} cy={120} r={6} fill="#10B981" stroke="#ffffff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Current values display */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                  <div className="text-xs text-yellow-400 mb-1">Aktueller Preis</div>
                  <div className="text-lg font-bold text-white">{selectedPrice}€</div>
                </div>
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                  <div className="text-xs text-blue-400 mb-1">Nachfrage</div>
                  <div className="text-lg font-bold text-blue-400">{quantityDemanded}</div>
                </div>
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-lg">
                  <div className="text-xs text-red-400 mb-1">Angebot</div>
                  <div className="text-lg font-bold text-red-400">{quantitySupplied}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Quiz Questions */}
          <div className="space-y-4">
            <div className="bg-dark-700/50 rounded-xl p-4 sm:p-6 border border-dark-600 h-[500px] sm:h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Quiz-Fragen</h3>
                {showAnswers && (
                  <div className="text-sm">
                    <span className="text-green-400">{calculateScore()}</span>
                    <span className="text-gray-400"> / {questions.length} richtig</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto">
                {questions.map((question) => (
                  <div 
                    key={question.id}
                    className={`p-4 rounded-lg border transition-all ${
                      highlightedQuestion === question.id 
                        ? 'border-primary-500 bg-primary-500/10' 
                        : 'border-dark-600 bg-dark-600/30'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-sm font-bold text-primary-400 bg-primary-400/20 px-2 py-1 rounded">
                        {question.id})
                      </span>
                      <p className="text-base text-white font-medium flex-1">{question.question}</p>
                      {showAnswers && (
                        <div className="flex-shrink-0">
                          {selectedAnswers[question.id] === question.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 ml-8">
                      {question.options.map((option, optionIndex) => (
                        <motion.button
                          key={optionIndex}
                          onClick={() => handleAnswer(question.id, optionIndex)}
                          whileHover={{ scale: 1.01, x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: optionIndex * 0.1 }}
                          className={`w-full text-left p-2 rounded text-base transition-all duration-300 ${
                            selectedAnswers[question.id] === optionIndex
                              ? showAnswers && optionIndex === question.correct
                                ? 'bg-green-600/20 border border-green-600/50 text-green-300 shadow-lg shadow-green-600/20'
                                : showAnswers && optionIndex !== question.correct
                                ? 'bg-red-600/20 border border-red-600/50 text-red-300 shadow-lg shadow-red-600/20'
                                : 'bg-primary-600/20 border border-primary-600/50 text-primary-300 shadow-lg shadow-primary-600/20'
                              : showAnswers && optionIndex === question.correct
                              ? 'bg-green-600/10 border border-green-600/30 text-green-400'
                              : 'bg-dark-500/50 border border-dark-500 text-gray-300 hover:bg-dark-500/70 hover:border-dark-400'
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                    
                    {showAnswers && (
                      <div className="mt-3 ml-8 p-3 bg-primary-500/10 border border-primary-500/30 rounded text-sm text-gray-300">
                        <strong className="text-primary-400">Erklärung:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quiz Control Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6 pt-4 border-t border-dark-600">
                <motion.button
                  onClick={() => setShowAnswers(!showAnswers)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-2 sm:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                    showAnswers
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20'
                  }`}
                >
                  {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="hidden sm:inline">
                    {showAnswers ? 'Antworten ausblenden' : 'Antworten anzeigen'}
                  </span>
                  <span className="sm:hidden">
                    {showAnswers ? 'Ausblenden' : 'Anzeigen'}
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedPrice(50)
                    setSelectedAnswers({})
                    setShowAnswers(false)
                    setHighlightedQuestion(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-gray-600/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Zurücksetzen</span>
                  <span className="sm:hidden">Reset</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
