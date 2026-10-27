import React, { useRef } from 'react'
import { Variants } from 'framer-motion'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Building2,
  BookOpen,
  Cpu,
  Trophy,
} from 'lucide-react'

interface Program {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface ProgramsProps {
  programs?: Program[]
}

export const Programs: React.FC<ProgramsProps> = ({
  programs = [
    {
      id: 1,
      title: 'Creche & Kg',
      description:
        'Early learning lays the foundation. Our Creche & Kg programs create a fun, secure where children play, explore, and grow.',
      icon: <Building2 className="w-8 h-8" />,
      color: '#8B0000',
    },
    {
      id: 2,
      title: 'Nursery Primary School',
      description:
        'Learning is an adventure at our combined education at Zoe combines academics with creative discovery, technology, and more.',
      icon: <BookOpen className="w-8 h-8" />,
      color: '#451F17',
    },
    {
      id: 3,
      title: 'High School',
      description:
        'High school doesn\'t just teach subjects—we develop the leaders of tomorrow, with emphasis on excellence and character development.',
      icon: <Building2 className="w-8 h-8" />,
      color: '#02BB22',
    },
    {
      id: 4,
      title: 'Digital Learning',
      description:
        'From today\'s digital world. Coding, robotics, artificial intelligence, and computational thinking—preparing students for tomorrow.',
      icon: <Cpu className="w-8 h-8" />,
      color: '#2c5aa0',
    },
    {
      id: 5,
      title: 'Extra-Curricular Activities',
      description:
        'Finding their talents through sports, arts, and competitions. Enrichment activities build confident, well-rounded students.',
      icon: <Trophy className="w-8 h-8" />,
      color: '#f39c12',
    },
  ],
}) => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()

  // Parallax effect for cards
  const y = useTransform(scrollY, [0, 300], [0, 50])

  // Container animation with stagger
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

  // Section title animation
  const titleVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  // Subtitle animation
  const subtitleVariants:Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.1,
      },
    },
  }

  // Card animation
  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Icon animation - rotate on entrance
  const iconVariants:Variants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }



  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-white overflow-hidden"
    >
        {/* star */}
          <div className='absolute left-[-30px] top-[-200px] w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>
                    <div className='absolute right-[-180px] top-60 w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl md:mx-13 mx-2 px-4  px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-2 lg:mb-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Our <span className="text-[#02BB22]"><i>Programs</i></span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Discover our comprehensive educational programs designed to nurture
            every aspect of student development.
          </motion.p>
        </motion.div>
{/* Decorative dividers */}
        <div className="mt-2 lg:mt-2 flex items-center justify-center gap-4">
          <div className="w-8 h-1 bg-gradient-to-r from-[#02BB22] to-transparent" />
          <div className="w-2 h-2 bg-[#02BB22] rounded-full" />
          <div className="w-8 h-1 bg-gradient-to-l from-[#02BB22] to-transparent" />
        </div>


        {/* Programs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ y }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col items-center text-center p-6 rounded-[25px] border border-gray-100 cursor-pointer transition-all duration-300"
              style={{
                background: `radial-gradient(ellipse at top left, ${program.color}08, transparent 60%), white`,
              }}
            >
              {/* Icon Container with Pulse */}
              <motion.div
                variants={iconVariants}
                className="mb-4 p-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: program.color,
                }}
              >
                <motion.div
                  animate="pulse"

                  className="flex items-center justify-center"
                  style={{
                    color: program.color,
                  }}
                >
                  {program.icon}
                </motion.div>
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 w-full leading-relaxed flex-grow">
                {program.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  )
}

export default Programs