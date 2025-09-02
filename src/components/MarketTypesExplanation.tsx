'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Shield, DollarSign, Users, Building, Gavel } from 'lucide-react'

export default function MarketTypesExplanation() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Schwarze und Graue Märkte</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Schwarze Märkte */}
          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-xl p-6 border border-red-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-red-400">Schwarze Märkte</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <Gavel className="w-4 h-4" />
                  Entstehung bei Höchstpreisen (P3)
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  Wenn der Staat einen Höchstpreis festlegt (z.B. P3 = 25€), entsteht ein Nachfrageüberschuss. 
                  Die hohe Nachfrage kann nicht legal befriedigt werden, daher entstehen illegale Märkte.
                </p>
                <div className="text-xs text-red-200 bg-red-900/20 p-2 rounded">
                  <strong>Formel:</strong> Nachfrage (75) &gt; Angebot (25) = Mangel von 50 Einheiten
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  Beispiele aus der Realität:
                </h4>
                <div className="space-y-3">
                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-red-300 mb-1">🏠 Mietpreisbremse</h5>
                    <p className="text-xs text-gray-300">
                      Staat begrenzt Mieten auf 800€. Nachfrage ist hoch, aber wenige Vermieter bieten an. 
                      Schwarzmarkt: Illegale &quot;Zusatzgebühren&quot; oder Untervermietung zu höheren Preisen.
                    </p>
                  </div>
                  
                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-red-300 mb-1">⛽ Benzinrationierung</h5>
                    <p className="text-xs text-gray-300">
                      Kriegszeiten: Benzin wird auf 1€/Liter begrenzt. Hohe Nachfrage, wenig Angebot. 
                      Schwarzmarkt: Benzin wird illegal für 5€/Liter verkauft.
                    </p>
                  </div>

                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-red-300 mb-1">🎫 Konzerttickets</h5>
                    <p className="text-xs text-gray-300">
                      Tickets für 50€ begrenzt, aber 10.000 wollen welche. 
                      Schwarzmarkt: Tickets werden illegal für 500€ weiterverkauft.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <h5 className="font-medium text-red-300 mb-2">⚠️ Probleme:</h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Illegale Aktivitäten und Kriminalität</li>
                  <li>• Keine Qualitätskontrolle oder Garantien</li>
                  <li>• Sehr hohe Preise für Konsumenten</li>
                  <li>• Staat verliert Steuereinnahmen</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Graue Märkte */}
          <div className="bg-gradient-to-br from-gray-900/20 to-blue-900/20 rounded-xl p-6 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-600/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400">Graue Märkte</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Gavel className="w-4 h-4" />
                  Entstehung bei Mindestpreisen (P1)
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  Wenn der Staat einen Mindestpreis festlegt (z.B. P1 = 75€), entsteht ein Angebotsüberschuss. 
                  Produzenten haben zu viel und suchen alternative, legale Verkaufswege.
                </p>
                <div className="text-xs text-gray-200 bg-gray-900/20 p-2 rounded">
                  <strong>Formel:</strong> Angebot (75) &gt; Nachfrage (25) = Überschuss von 50 Einheiten
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Beispiele aus der Realität:
                </h4>
                <div className="space-y-3">
                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-300 mb-1">💰 Mindestlohn</h5>
                    <p className="text-xs text-gray-300">
                      Mindestlohn 12€/Stunde. Viele wollen arbeiten, aber wenige Jobs. 
                      Grauer Markt: Schwarzarbeit, Praktika, &quot;Selbstständigkeit&quot; unter Mindestlohn.
                    </p>
                  </div>
                  
                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-300 mb-1">🥛 Milchpreisgarantie</h5>
                    <p className="text-xs text-gray-300">
                      EU garantiert Milchpreis von 40 Cent/Liter. Bauern produzieren viel, wenig Nachfrage. 
                      Grauer Markt: Export in andere Länder, Verarbeitung zu Käse/Butter.
                    </p>
                  </div>

                  <div className="bg-dark-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-300 mb-1">📱 Parallelimporte</h5>
                    <p className="text-xs text-gray-300">
                      iPhone kostet in Deutschland 1000€, in USA nur 800€. 
                      Grauer Markt: Legaler Import und Verkauf zu günstigeren Preisen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/20 border border-gray-700/50 rounded-lg p-3">
                <h5 className="font-medium text-gray-300 mb-2">ℹ️ Eigenschaften:</h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Legal, aber umgeht offizielle Kanäle</li>
                  <li>• Oft günstigere Preise für Konsumenten</li>
                  <li>• Keine Garantie oder Support</li>
                  <li>• Hersteller verliert Kontrolle über Vertrieb</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🎯 Zusammenfassung:</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Schwarze Märkte:</h4>
              <p>Entstehen bei <strong>Höchstpreisen (P3)</strong> → Nachfrageüberschuss → Illegale Märkte mit sehr hohen Preisen</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 mb-2">Graue Märkte:</h4>
              <p>Entstehen bei <strong>Mindestpreisen (P1)</strong> → Angebotsüberschuss → Legale alternative Verkaufswege</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
