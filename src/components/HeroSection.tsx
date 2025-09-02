'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center py-20 px-4">
        {/* Animated Curve Eyecatcher */}
        <div className="mb-8">
          <motion.svg
            viewBox="0 0 800 200"
            className="w-full max-w-3xl h-24 md:h-32 mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint grid lines */}
            <g stroke="#334155" strokeWidth="1" opacity="0.35">
              <line x1="0" y1="160" x2="800" y2="160" />
              <line x1="0" y1="120" x2="800" y2="120" />
              <line x1="0" y1="80" x2="800" y2="80" />
            </g>

            {/* Backing shadow path (more dramatic, wavy) */}
            <motion.path
              d="M 0 150 C 80 130, 160 50, 240 70 S 400 180, 480 120 S 640 40, 720 80 S 800 150, 800 150"
              stroke="#0ea5e9"
              strokeOpacity="0.2"
              strokeWidth="8"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            />

            {/* Main animated curve (more dramatic, wavy) */}
            <motion.path
              d="M 0 150 C 80 130, 160 50, 240 70 S 400 180, 480 120 S 640 40, 720 80 S 800 150, 800 150"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}
            />

            {/* Small moving indicator dot */}
            <motion.circle
              r="5"
              fill="#22d3ee"
              filter="url(#glow)"
              initial={{ cx: 0, cy: 150 }}
              animate={{
                cx: [0, 80, 160, 240, 400, 480, 640, 720, 800],
                cy: [150, 130, 50, 70, 180, 120, 40, 80, 150]
              }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.svg>
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 mb-6 leading-tight">
            Preiselastizität und Kreuzpreiselastizität
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
        >
          Wie sich Preisänderungen auf die Nachfrage auswirken
        </motion.p>
      </div>
    </section>
  )
}
