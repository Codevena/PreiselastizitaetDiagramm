'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'

export default function IntroductionSection() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 card-hover"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Einführung</h2>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Die Preiselastizität der Nachfrage ist ein fundamentales Konzept der Mikroökonomie, das beschreibt, 
            wie stark die nachgefragte Menge eines Gutes auf Preisänderungen reagiert. Sie ist ein wichtiges 
            Instrument für Unternehmen bei der Preisgestaltung und für Ökonomen bei der Analyse von Märkten.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600">
              <h3 className="text-xl font-semibold text-white mb-3">Warum ist das wichtig?</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Preisstrategien entwickeln</li>
                <li>• Umsatzprognosen erstellen</li>
                <li>• Marktverhalten verstehen</li>
                <li>• Konsumentenreaktionen vorhersagen</li>
              </ul>
            </div>

            <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600">
              <h3 className="text-xl font-semibold text-white mb-3">Praktische Anwendung</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Einzelhandel & E-Commerce</li>
                <li>• Dienstleistungsbranche</li>
                <li>• Rohstoffmärkte</li>
                <li>• Politische Entscheidungen</li>
              </ul>
            </div>
          </div>
        </div>


      </motion.div>
    </section>
  )
}
