'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceArea, ReferenceDot, Customized } from 'recharts'
import { TrendingUp, Sliders, Info, Play, Pause, RotateCcw, Zap, AlertTriangle } from 'lucide-react'

export default function InteractiveDiagram() {
  const [selectedPrice, setSelectedPrice] = useState(50)
  const [demandElasticity, setDemandElasticity] = useState(1)
  const [supplyElasticity, setSupplyElasticity] = useState(1)

  const [showExplanation, setShowExplanation] = useState(false)
  const [animationMode, setAnimationMode] = useState(false)

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

  // Generate supply and demand data using elasticities
  const generateData = () => {
    const data = []
    for (let quantity = 0; quantity <= 100; quantity += 1) {
      // Demand curve: P(Q) = 100 - dE * Q
      const demandPrice = Math.max(0, 100 - demandElasticity * quantity)
      // Supply curve: P(Q) = sE * Q
      const supplyPrice = Math.min(100, supplyElasticity * quantity)

      data.push({
        quantity,
        demand: demandPrice,
        supply: supplyPrice,
      })
    }
    return data
  }

  const data = generateData()

  // Dynamic equilibrium from elasticities
  // Solve 100 - dE*Q = sE*Q => Q* = 100/(dE + sE), P* = sE*Q*
  const equilibrium = {
    quantity: 100 / (demandElasticity + supplyElasticity),
    price: (100 * supplyElasticity) / (demandElasticity + supplyElasticity)
  }

  // Quantities at selected price (inverse functions)
  const getQuantityDemanded = (price: number) => {
    // QD(P) = (100 - P)/dE
    return Math.max(0, Math.min(100, (100 - price) / demandElasticity))
  }

  const getQuantitySupplied = (price: number) => {
    // QS(P) = P/sE
    return Math.max(0, Math.min(100, price / supplyElasticity))
  }

  const quantityDemanded = getQuantityDemanded(selectedPrice)
  const quantitySupplied = getQuantitySupplied(selectedPrice)

  // Removed predefined price points

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
        type: 'Angebotsüberhang',
        description: `Der Preis liegt über dem Gleichgewichtspreis. Es entsteht ein Angebotsüberschuss von ${surplus.toFixed(1)} Einheiten.`,
        color: 'text-red-400',
        situation: selectedPrice > 70 ? 'P1 - Hoher Preis' : 'Über Gleichgewicht',
        surplus: surplus,
        shortage: 0
      }
    } else {
      const shortage = quantityDemanded - quantitySupplied
      return {
        type: 'Nachfrageüberhang',
        description: `Der Preis liegt unter dem Gleichgewichtspreis. Es entsteht ein Nachfrageüberschuss von ${shortage.toFixed(1)} Einheiten.`,
        color: 'text-blue-400',
        situation: selectedPrice < 30 ? 'P3 - Niedriger Preis' : 'Unter Gleichgewicht',
        surplus: 0,
        shortage: shortage
      }
    }
  }

  const analysis = getPriceAnalysis()

  // Point price elasticity of demand at current point: |E| = P/(dE * QD)
  const calculateElasticity = () => {
    if (selectedPrice <= 0 || quantityDemanded <= 0) return Infinity
    return Math.abs(selectedPrice / (demandElasticity * quantityDemanded))
  }

  const currentElasticity = calculateElasticity()

  // Traded quantity (short side)
  const tradedQuantity = Math.min(quantityDemanded, quantitySupplied)

  // Surpluses under linear curves up to traded quantity
  // Demand curve: P = 100 - dE Q; Supply curve: P = sE Q
  const consumerSurplus = Math.max(
    0,
    (100 - selectedPrice) * tradedQuantity - 0.5 * demandElasticity * tradedQuantity * tradedQuantity
  )
  const producerSurplus = Math.max(
    0,
    selectedPrice * tradedQuantity - 0.5 * supplyElasticity * tradedQuantity * tradedQuantity
  )

  // Custom shaded band to guarantee visibility across Recharts versions
  const ShadedBand = ({ x1, x2, color, label }: { x1: number; x2: number; color: string; label: string }) => (
    <Customized
      component={({ xAxisMap, yAxisMap, offset }: any) => {
        const xKey = Object.keys(xAxisMap)[0]
        const yKey = Object.keys(yAxisMap)[0]
        const xScale = xAxisMap[xKey]?.scale
        const yScale = yAxisMap[yKey]?.scale
        if (!xScale || !yScale) return null

        const left = xScale(Math.min(x1, x2))
        const right = xScale(Math.max(x1, x2))
        const top = yScale(100)
        const bottom = yScale(0)
        const width = Math.max(0, right - left)
        const height = Math.max(0, bottom - top)

        return (
          <g transform={`translate(${offset.left}, ${offset.top})`} pointerEvents="none">
            <rect x={left} y={top} width={width} height={height} fill={color} opacity={0.28} stroke={color} strokeDasharray="4 4" />
            <text x={left + width / 2} y={top + 16} textAnchor="middle" fontWeight={700} fill={color}>
              {label}
            </text>
          </g>
        )
      }}
    />
  )

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
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Removed intro text as requested */}

        {/* Removed quick price selection */}

        <div className="grid xl:grid-cols-3 gap-8 mb-8">
          {/* Interactive Chart */}
          <div className="xl:col-span-2 bg-dark-700/50 rounded-xl p-6 border border-dark-600">


            <div className="h-96 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    xAxisId={0}
                    dataKey="quantity"
                    type="number"
                    domain={[0, 100]}
                    allowDecimals
                    stroke="#9CA3AF"
                    label={{ value: 'Menge (Q)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                  />
                  <YAxis
                    yAxisId={0}
                    type="number"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickMargin={8}
                    stroke="#9CA3AF"
                    label={{ value: 'Preis (P)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                  />

                  {/* Demand curve */}
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type="monotone"
                    dataKey="demand"
                    stroke="#3B82F6"
                    strokeWidth={4}
                    dot={false}
                    name="Nachfrage"
                  />

                  {/* Supply curve */}
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type="monotone"
                    dataKey="supply"
                    stroke="#EF4444"
                    strokeWidth={4}
                    dot={false}
                    name="Angebot"
                  />

                  {/* Selected price line (always visible) */}
                  <ReferenceLine
                    y={selectedPrice}
                    stroke="#F59E0B"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    label={{ value: `Preis: ${selectedPrice.toFixed(1)}€`, position: 'left', style: { fill: '#F59E0B', fontWeight: 700 } }}
                  />

                  {/* Equilibrium reference lines */}
                  <>
                    <ReferenceLine
                      yAxisId={0}
                      y={equilibrium.price}
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      strokeOpacity={0.8}
                      label={{ value: `P*: ${equilibrium.price.toFixed(1)}€`, position: 'right' }}
                    />
                    <ReferenceLine
                      xAxisId={0}
                      x={equilibrium.quantity}
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      strokeOpacity={0.6}
                      label={{ value: `Q*: ${equilibrium.quantity.toFixed(1)}`, position: 'top' }}
                    />
                    <ReferenceDot
                      xAxisId={0}
                      yAxisId={0}
                      x={equilibrium.quantity}
                      y={equilibrium.price}
                      r={6}
                      fill="#10B981"
                      stroke="#fff"
                      label={{ value: 'Gleichgewicht', position: 'top', style: { fill: '#10B981', fontWeight: 700 } }}
                    />
                  </>

                  {/* Supply surplus (when price > equilibrium) */}
                  {selectedPrice > equilibrium.price && quantitySupplied > quantityDemanded && (
                    <>
                      {/* Robust shaded band using Customized to avoid version quirks */}
                      <ShadedBand x1={quantityDemanded} x2={quantitySupplied} color="#EF4444" label="Angebotsüberhang" />
                      {/* ReferenceArea fallback */}
                      <ReferenceArea
                        xAxisId={0}
                        yAxisId={0}
                        x1={quantityDemanded}
                        x2={quantitySupplied}
                        y1={0}
                        y2={100}
                        fill="#EF4444"
                        fillOpacity={0.18}
                        stroke="#EF4444"
                        strokeDasharray="4 4"
                      />
                      {/* Label anchor (no-op) */}
                      <ReferenceDot x={(quantityDemanded + quantitySupplied) / 2} y={equilibrium.price} r={0} />
                    </>
                  )}

                  {/* Demand surplus (when price < equilibrium) */}
                  {selectedPrice < equilibrium.price && quantityDemanded > quantitySupplied && (
                    <>
                      {/* Robust shaded band using Customized to avoid version quirks */}
                      <ShadedBand x1={quantitySupplied} x2={quantityDemanded} color="#3B82F6" label="Nachfrageüberhang" />
                      {/* ReferenceArea fallback */}
                      <ReferenceArea
                        xAxisId={0}
                        yAxisId={0}
                        x1={quantitySupplied}
                        x2={quantityDemanded}
                        y1={0}
                        y2={100}
                        fill="#3B82F6"
                        fillOpacity={0.18}
                        stroke="#3B82F6"
                        strokeDasharray="4 4"
                      />
                      {/* Add a no-op dot to keep label ordering consistent */}
                      <ReferenceDot x={(quantitySupplied + quantityDemanded) / 2} y={equilibrium.price} r={0} />
                    </>
                  )}

                  {/* Quantity guides: always show for visual feedback */}
                  <>
                    <ReferenceLine
                      x={quantityDemanded}
                      stroke="#3B82F6"
                      strokeWidth={3}
                      strokeDasharray="6 6"
                      label={{
                        value: `Nachfrage: ${quantityDemanded.toFixed(1)}`,
                        position: "bottom",
                        style: { fill: '#3B82F6', fontWeight: 'bold' }
                      }}
                    />
                    <ReferenceLine
                      x={quantitySupplied}
                      stroke="#EF4444"
                      strokeWidth={3}
                      strokeDasharray="6 6"
                      label={{
                        value: `Angebot: ${quantitySupplied.toFixed(1)}`,
                        position: "bottom",
                        style: { fill: '#EF4444', fontWeight: 'bold' }
                      }}
                    />
                  </>
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
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-yellow"
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
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-blue"
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
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-red"
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
                Marktanalyse
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Aktueller Preis</div>
                    <div className="text-lg font-bold text-white">{selectedPrice.toFixed(1)}€</div>
                  </div>
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Gleichgewichtspreis (P*)</div>
                    <div className="text-lg font-bold text-green-400">{equilibrium.price.toFixed(1)}€</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Gleichgewichtsmenge (Q*)</div>
                    <div className="text-lg font-bold text-green-400">{equilibrium.quantity.toFixed(1)}</div>
                  </div>
                  <div className="p-3 bg-dark-600/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Überschuss/Mangel</div>
                    <div className="text-lg font-bold text-white">{Math.abs(quantitySupplied - quantityDemanded).toFixed(1)}</div>
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
                      analysis.type === 'Angebotsüberhang' ? 'bg-red-400' : 'bg-blue-400'
                    }`}></div>
                    <span className={`font-semibold ${analysis.color}`}>{analysis.type}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{analysis.description}</p>
                  <p className="text-xs text-gray-400">{analysis.situation}</p>
                </div>

                <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
                  <div className="text-sm font-semibold text-purple-400 mb-2">Preiselastizität der Nachfrage</div>
                  <div className="text-2xl font-bold text-white mb-1">{currentElasticity === Infinity ? '∞' : currentElasticity.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">
                    {currentElasticity > 1 ? 'Elastische Nachfrage' :
                     currentElasticity === 1 ? 'Einheitselastische Nachfrage' :
                     'Unelastische Nachfrage'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-600/10 border border-green-600/30 rounded-lg">
                    <div className="text-xs text-green-400 mb-1">Konsumentenrente (≈)</div>
                    <div className="text-lg font-bold text-green-400">{consumerSurplus.toFixed(0)}</div>
                  </div>
                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-lg">
                    <div className="text-xs text-red-400 mb-1">Produzentenrente (≈)</div>
                    <div className="text-lg font-bold text-red-400">{producerSurplus.toFixed(0)}</div>
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
                <h5 className="font-medium text-green-400 mb-2">Was passiert gerade?</h5>
                <p>
                  Aktueller Preis: <span className="text-white font-medium">{selectedPrice.toFixed(1)}€</span>.
                  Gleichgewicht: <span className="text-green-400 font-medium">P* {equilibrium.price.toFixed(1)}€, Q* {equilibrium.quantity.toFixed(1)}</span>.
                </p>
                <p>
                  Bei diesem Preis wollen Käufer etwa <span className="text-blue-400 font-medium">{quantityDemanded.toFixed(1)}</span> Einheiten,
                  Verkäufer bieten etwa <span className="text-red-400 font-medium">{quantitySupplied.toFixed(1)}</span> Einheiten an.
                </p>
                <p>
                  {selectedPrice > equilibrium.price ? (
                    <>
                      Der Preis liegt über P*. Es gibt einen <span className="text-red-400 font-semibold">Angebotsüberhang</span> von
                      {' '}{(quantitySupplied - quantityDemanded).toFixed(1)} Einheiten. Zu viele Waren, zu wenige Käufer.
                    </>
                  ) : selectedPrice < equilibrium.price ? (
                    <>
                      Der Preis liegt unter P*. Es gibt einen <span className="text-blue-400 font-semibold">Nachfrageüberhang</span> von
                      {' '}{(quantityDemanded - quantitySupplied).toFixed(1)} Einheiten. Viele wollen kaufen, aber es gibt zu wenig.
                    </>
                  ) : (
                    <>Preis und P* sind gleich: <span className="text-green-400 font-semibold">Gleichgewicht</span>. Angebot = Nachfrage.</>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
