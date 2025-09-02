'use client'

import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="text-center py-16 mb-16">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-8"
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-6xl font-bold text-white mb-6"
      >
        Preiselastizität und Kreuzpreiselastizität
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
      >
        Wie sich Preisänderungen auf die Nachfrage auswirken
      </motion.p>


    </section>
  )
}
