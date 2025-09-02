'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, ArrowUp, ArrowDown, Target } from 'lucide-react'

export default function SimpleExplanation() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">So einfach funktioniert&apos;s!</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 text-center">Das Diagramm verstehen</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span><strong className="text-blue-400">Blaue Linie</strong> = Nachfrage (was Kunden kaufen wollen)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span><strong className="text-red-400">Rote Linie</strong> = Angebot (was Verkäufer anbieten)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span><strong className="text-green-400">Grüner Punkt</strong> = Gleichgewicht (perfekte Balance)</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 text-center">Die drei Preise</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-red-400" />
                <span><strong className="text-red-400">P1 (75€)</strong> = Hoher Preis</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span><strong className="text-green-400">P2 (50€)</strong> = Gleichgewichtspreis</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-blue-400" />
                <span><strong className="text-blue-400">P3 (25€)</strong> = Niedriger Preis</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 text-center">Quiz lösen</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• Klicke auf P1, P2 oder P3 im Diagramm</p>
              <p>• Schaue dir die Werte an</p>
              <p>• Beantworte die Fragen rechts</p>
              <p>• Klicke &quot;Antworten anzeigen&quot; für Hilfe</p>
            </div>
          </div>
        </div>

        {/* Key concepts */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Wichtige Regeln 
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">🔴 Hoher Preis (P1):</h4>
              <ul className="space-y-1 ml-4">
                <li>• Wenige Kunden kaufen (niedrige Nachfrage)</li>
                <li>• Viele Verkäufer bieten an (hohes Angebot)</li>
                <li>• Ergebnis: <strong className="text-red-400">Angebotsüberschuss</strong></li>
                <li>• Kann zu &quot;Grauen Märkten&quot; führen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🔵 Niedriger Preis (P3):</h4>
              <ul className="space-y-1 ml-4">
                <li>• Viele Kunden wollen kaufen (hohe Nachfrage)</li>
                <li>• Wenige Verkäufer bieten an (niedriges Angebot)</li>
                <li>• Ergebnis: <strong className="text-blue-400">Nachfrageüberschuss</strong></li>
                <li>• Kann zu &quot;Schwarzen Märkten&quot; führen</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">🟢 Gleichgewichtspreis (P2):</h4>
            <p className="text-gray-300">Perfekte Balance! Angebot = Nachfrage. Alle sind zufrieden, kein Überschuss, kein Mangel.</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
