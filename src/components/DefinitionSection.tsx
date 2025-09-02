'use client'

import { motion } from 'framer-motion'
import { Calculator, ArrowRight, Info } from 'lucide-react'
import { useState } from 'react'

export default function DefinitionSection() {
  const [selectedElasticity, setSelectedElasticity] = useState<'elastic' | 'unit' | 'inelastic' | null>(null)

  const elasticityTypes = [
    {
      id: 'elastic' as const,
      title: 'Elastische Nachfrage',
      condition: '|E| > 1',
      description: 'Die Nachfrage reagiert stark auf Preisänderungen',
      example: 'Luxusgüter, Freizeitaktivitäten',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'unit' as const,
      title: 'Einheitselastische Nachfrage',
      condition: '|E| = 1',
      description: 'Preisänderung und Mengenänderung sind proportional',
      example: 'Theoretischer Idealfall',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'inelastic' as const,
      title: 'Unelastische Nachfrage',
      condition: '|E| < 1',
      description: 'Die Nachfrage reagiert schwach auf Preisänderungen',
      example: 'Grundnahrungsmittel, Medikamente',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 card-hover"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Definition und Berechnung</h2>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-300 mb-6">
            Die Preiselastizität der Nachfrage (E) wird berechnet als:
          </p>

          <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600 mb-6">
            <div className="text-center">
              <div className="text-2xl font-mono text-white mb-2">
                E = (% Änderung der Menge) / (% Änderung des Preises)
              </div>
              <div className="text-sm text-gray-400">
                oder mathematisch: E = (ΔQ/Q) / (ΔP/P)
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Arten der Preiselastizität</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {elasticityTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedElasticity(selectedElasticity === type.id ? null : type.id)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 ${
                  selectedElasticity === type.id
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-600 bg-dark-700/50 hover:border-dark-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3`}>
                  <span className="text-white font-bold text-sm">{type.condition}</span>
                </div>
                <h4 className="font-semibold text-white mb-2">{type.title}</h4>
                <p className="text-sm text-gray-300 mb-2">{type.description}</p>
                <p className="text-xs text-gray-400">{type.example}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedElasticity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-2">
                  {elasticityTypes.find(t => t.id === selectedElasticity)?.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {selectedElasticity === 'elastic' && 
                    "Bei elastischer Nachfrage führt eine 1%ige Preiserhöhung zu mehr als 1% Rückgang der Nachfrage. Unternehmen sollten vorsichtig mit Preiserhöhungen sein."
                  }
                  {selectedElasticity === 'unit' && 
                    "Bei einheitselastischer Nachfrage bleibt der Umsatz bei Preisänderungen konstant, da sich Preis und Menge proportional ändern."
                  }
                  {selectedElasticity === 'inelastic' && 
                    "Bei unelastischer Nachfrage führt eine 1%ige Preiserhöhung zu weniger als 1% Rückgang der Nachfrage. Preiserhöhungen können den Umsatz steigern."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}


      </motion.div>
    </section>
  )
}
