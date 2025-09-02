'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Dot, Area, AreaChart } from 'recharts'
import { TrendingUp, Sliders, Info, Play, Pause, RotateCcw, Zap, Target, AlertTriangle } from 'lucide-react'

export default function InteractiveDiagram() {
  const [selectedPrice, setSelectedPrice] = useState(50)

  const [showExplanation, setShowExplanation] = useState(false)
  const [animationMode, setAnimationMode] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<'P1' | 'P2' | 'P3' | null>(null)
  const [showSurplus, setShowSurplus] = useState(true)

  // Animation effect
  useEffect(() => {
    if (animationMode) {
      const interval = setInterval(() => {
        setSelectedPrice(prev => {
          const newPrice = prev + 2
          return newPrice > 90 ? 10 : newPrice
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [animationMode])

  // Generate supply and demand data - EXACTLY like in the original image
  const generateData = () => {
    const data = []
    for (let quantity = 0; quantity <= 100; quantity += 1) {
      // Demand curve: Simple linear downward slope P = 100 - Q (like in the image)
      const demandPrice = Math.max(0, 100 - quantity)
      // Supply curve: Simple linear upward slope P = Q (like in the image)
      const supplyPrice = quantity

      data.push({
        quantity,
        demand: demandPrice,
        supply: supplyPrice,
      })
    }
    return data
  }

  const data = generateData()

  // Fixed equilibrium point - exactly like in the image (where lines cross)
  const equilibrium = { quantity: 50, price: 50 }

  // Calculate quantities at selected price - simple linear functions like in the image
  const getQuantityDemanded = (price: number) => {
    // Simple demand: Q = 100 - P
    return Math.max(0, 100 - price)
  }

  const getQuantitySupplied = (price: number) => {
    // Simple supply: Q = P
    return Math.max(0, price)
  }

  const quantityDemanded = getQuantityDemanded(selectedPrice)
  const quantitySupplied = getQuantitySupplied(selectedPrice)

  // Predefined price points - EXACTLY like in the original image
  const pricePoints = {
    P1: { price: 75, label: 'P1', color: '#EF4444', description: 'Hoher Preis (über Gleichgewicht)' },
    P2: { price: 50, label: 'P2', color: '#10B981', description: 'Gleichgewichtspreis' },
    P3: { price: 25, label: 'P3', color: '#3B82F6', description: 'Niedriger Preis (unter Gleichgewicht)' }
  }

  const getPriceAnalysis = () => {
    const tolerance = 3
    if (Math.abs(selectedPrice - equilibrium.price) < tolerance) {
      return {
        type: 'Gleichgewicht',
        description: 'Angebot und Nachfrage sind im Gleichgewicht. Der Markt ist ausgeglichen.',
        color: 'text-green-400',
        situation: 'P2 - Gleichgewichtspreis',
        surplus: 0,
        shortage: 0
      }
    } else if (selectedPrice > equilibrium.price) {
      const surplus = quantitySupplied - quantityDemanded
      return {
        type: 'Angebotsüberschuss',
        description: `Der Preis liegt über dem Gleichgewichtspreis. Es entsteht ein Angebotsüberschuss von ${surplus.toFixed(1)} Einheiten.`,
        color: 'text-red-400',
        situation: selectedPrice > 70 ? 'P1 - Hoher Preis' : 'Über Gleichgewicht',
        surplus: surplus,
        shortage: 0
      }
    } else {
      const shortage = quantityDemanded - quantitySupplied
      return {
        type: 'Nachfrageüberschuss',
        description: `Der Preis liegt unter dem Gleichgewichtspreis. Es entsteht ein Nachfrageüberschuss von ${shortage.toFixed(1)} Einheiten.`,
        color: 'text-blue-400',
        situation: selectedPrice < 30 ? 'P3 - Niedriger Preis' : 'Unter Gleichgewicht',
        surplus: 0,
        shortage: shortage
      }
    }
  }

  const analysis = getPriceAnalysis()

  // Calculate elasticity at current point
  const calculateElasticity = () => {
    const priceChange = 1
    const newQuantityDemanded = getQuantityDemanded(selectedPrice + priceChange)
    const percentChangeQuantity = ((newQuantityDemanded - quantityDemanded) / quantityDemanded) * 100
    const percentChangePrice = (priceChange / selectedPrice) * 100
    return Math.abs(percentChangeQuantity / percentChangePrice)
  }

  const currentElasticity = calculateElasticity()

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
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Interaktives Angebot-Nachfrage-Diagramm</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setAnimationMode(!animationMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animationMode
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {animationMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setSelectedPrice(50)
                setSelectedPoint(null)
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-300 mb-8">
          Experimentiere mit verschiedenen Preisen und Elastizitäten, um zu verstehen, wie sich Märkte verhalten.
          Nutze die Steuerungen unten, um das Diagramm anzupassen.
        </p>

        {/* Quick Price Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-400" />
            Schnellauswahl Preispunkte
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(pricePoints).map(([key, point]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedPrice(point.price)
                  setSelectedPoint(key as 'P1' | 'P2' | 'P3')
                }}
                className={`p-4 rounded-xl border transition-all ${
                  selectedPoint === key
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-600 bg-dark-700/50 hover:border-dark-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: point.color }}
                  />
                  <div className="text-left">
                    <div className="font-semibold text-white">{point.label}</div>
                    <div className="text-sm text-gray-400">{point.price.toFixed(1)}€</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 mb-8">
          {/* Interactive Chart */}
          <div className="xl:col-span-2 bg-dark-700/50 rounded-xl p-6 border border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Diagramm</h3>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={showSurplus}
                    onChange={(e) => setShowSurplus(e.target.checked)}
                    className="rounded"
                  />
                  Überschuss/Mangel anzeigen
                </label>
              </div>
            </div>

            <div className="h-96 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
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

                  {/* Selected price line */}
                  <ReferenceLine
                    y={selectedPrice}
                    stroke="#F59E0B"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Advanced Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">Preis: {selectedPrice.toFixed(1)}€</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  step="0.5"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  className="w-full h-3 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Nachfrage-Elastizität: {demandElasticity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={demandElasticity}
                  onChange={(e) => setDemandElasticity(Number(e.target.value))}
                  className="w-full h-3 bg-blue-600/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>Unelastisch (0.2)</span>
                  <span>Elastisch (3.0)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-red-400" />
                  <span className="text-white font-medium">Angebots-Elastizität: {supplyElasticity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={supplyElasticity}
                  onChange={(e) => setSupplyElasticity(Number(e.target.value))}
                  className="w-full h-3 bg-red-600/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>Unelastisch (0.2)</span>
                  <span>Elastisch (3.0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Analysis Panel */}
          <div className="space-y-6">
            <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Live Marktanalyse
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Aktueller Preis</div>
                    <div className="text-lg font-bold text-white">{selectedPrice.toFixed(1)}€</div>
                  </div>
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Gleichgewichtspreis</div>
                    <div className="text-lg font-bold text-green-400">{equilibrium.price.toFixed(1)}€</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                    <div className="text-xs text-blue-400 mb-1">Nachgefragte Menge</div>
                    <div className="text-lg font-bold text-blue-400">{quantityDemanded.toFixed(1)}</div>
                  </div>
                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-lg">
                    <div className="text-xs text-red-400 mb-1">Angebotene Menge</div>
                    <div className="text-lg font-bold text-red-400">{quantitySupplied.toFixed(1)}</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.type === 'Gleichgewicht' ? 'bg-green-400' :
                      analysis.type === 'Angebotsüberschuss' ? 'bg-red-400' : 'bg-blue-400'
                    }`}></div>
                    <span className={`font-semibold ${analysis.color}`}>{analysis.type}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{analysis.description}</p>
                  <p className="text-xs text-gray-400">{analysis.situation}</p>
                </div>

                <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
                  <div className="text-sm font-semibold text-purple-400 mb-2">Preiselastizität der Nachfrage</div>
                  <div className="text-2xl font-bold text-white mb-1">{currentElasticity.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">
                    {currentElasticity > 1 ? 'Elastische Nachfrage' :
                     currentElasticity === 1 ? 'Einheitselastische Nachfrage' :
                     'Unelastische Nachfrage'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Info className="w-5 h-5" />
              {showExplanation ? 'Erklärung ausblenden' : 'Detaillierte Erklärung anzeigen'}
            </button>
          </div>
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8"
          >
            <h4 className="font-semibold text-white mb-4">Wie funktioniert das interaktive Diagramm?</h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <h5 className="font-medium text-blue-400 mb-2">Nachfragekurve (Blau)</h5>
                <p>Zeigt, wie viel Konsumenten bei verschiedenen Preisen kaufen möchten. Die Elastizität bestimmt, wie stark die Kurve gekrümmt ist.</p>
              </div>
              <div>
                <h5 className="font-medium text-red-400 mb-2">Angebotskurve (Rot)</h5>
                <p>Zeigt, wie viel Produzenten bei verschiedenen Preisen anbieten möchten. Höhere Elastizität bedeutet stärkere Reaktion auf Preisänderungen.</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-400 mb-2">Interaktive Steuerung</h5>
                <p>Nutze die Slider, um Preise und Elastizitäten zu ändern. Beobachte, wie sich Überschüsse und Mängel entwickeln.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-dark-700/50 rounded-lg">
              <h5 className="font-medium text-green-400 mb-2">Lernziele</h5>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Verstehe den Zusammenhang zwischen Preis und Menge</li>
                <li>• Erkenne, wie Elastizität die Kurvenform beeinflusst</li>
                <li>• Identifiziere Marktungleichgewichte und ihre Ursachen</li>
                <li>• Lerne die Auswirkungen von Preisregulierung kennen</li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
