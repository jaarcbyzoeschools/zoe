import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'

interface Stat {
  id: number
  value: number
  suffix: string
  label: string
}

interface JourneyProps {
  stats?: Stat[]
  title?: string
}

const Counter: React.FC<{ value: number; suffix: string }> = ({
  value,
  suffix,
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref.current!)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let animationFrameId: number
    // const startValue = 0
    const endValue = value
    const duration = 2000 // 2 seconds
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const currentValue = Math.floor(progress * endValue)
      setCount(currentValue)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-bold text-white">
      {count}
      <span className="text-4xl lg:text-5xl">{suffix}</span>
    </div>
  )
}

export const Journey: React.FC<JourneyProps> = ({
  stats = [
    {
      id: 1,
      value: 1500,
      suffix: '',
      label: 'Total Students',
    },
    {
      id: 2,
      value: 200,
      suffix: '+',
      label: 'Total Teachers',
    },
    {
      id: 3,
      value: 800,
      suffix: '+',
      label: 'Total Parents',
    },
    {
      id: 4,
      value: 10,
      suffix: '+',
      label: 'Years of Institute',
    },
  ],
  title = 'Our Journey of Growth, Excellence, and Unmatched Educational Impact',
}) => {
  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants:Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="relative py-16 lg:py-24  overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 rounded-[40px]  md:mx-20 mx-6 my-8 lg:my-12"
        style={{
          background: 'linear-gradient(135deg, #8B1C1C 0%, #1B4D2B 100%)',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="px-20 px-4  relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Heading */}
          <motion.h2
            variants={titleVariants}
            className="text-3xl lg:text-3xl font-bold text-white mb-12 lg:mb-16 leading-tight"
          >
            {title.split(' ').map((word, index) => {
              let textColor = 'text-white'
              if (
                word === 'Growth,' ||
                word === 'Excellence,' ||
                word === 'Educational'
              ) {
                textColor = 'text-gray-300'
              }
              return (
                <span key={index} className={textColor}>
                  {word}{' '}
                </span>
              )
            })}
          </motion.h2>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover="hover"
               className="relative rounded-[25px] p-6 lg:p-8 backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300 cursor-default overflow-hidden group"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderTop: '1.5px solid rgba(255, 255, 255, 0.4)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.3)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              
              >
                {/* Counter */}
                <Counter value={stat.value} suffix={stat.suffix} />

                {/* Label */}
                <p className="text-white text-sm lg:text-base font-medium tracking-widest uppercase mt-4">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Journey