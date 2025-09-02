'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-sm border-b border-dark-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Fortschritt: {current} von {total} Abschnitten
          </span>
          <span className="text-sm font-medium text-primary-400">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full bg-dark-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}
