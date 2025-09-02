'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import IntroductionSection from '@/components/IntroductionSection'
import DefinitionSection from '@/components/DefinitionSection'

import MarketTypesExplanation from '@/components/MarketTypesExplanation'
import DiagramWithQuiz from '@/components/DiagramWithQuiz'
import InteractiveDiagram from '@/components/InteractiveDiagram'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          id="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <IntroductionSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          <DefinitionSection />
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
        >
          <MarketTypesExplanation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
        >
          <InteractiveDiagram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
        >
          <DiagramWithQuiz />
        </motion.div>
      </div>
    </main>
  )
}
