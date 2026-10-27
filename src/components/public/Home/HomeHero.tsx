import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Variants } from 'framer-motion'

interface StudentImage {
  id: number
  src: string
  alt: string
  bgColor: string
  borderRadius: string
}

interface HomeHeroProps {
  studentImages?: StudentImage[]
}

export const HomeHero: React.FC<HomeHeroProps> = ({
 studentImages = [
    {
      id: 1,
      src: '/images/students/Hero1.png', // Add your image paths here
      alt: 'Student 1',
      bgColor: '#1b6f3e',
      borderRadius: 'rounded-full' as const,
    },
    {
      id: 2,
      src: '/images/students/Hero2.png',
      alt: 'Student 2',
      bgColor: '#8B0000',
      borderRadius: 'rounded-[40px]' as const,
    },
    {
      id: 3,
      src: '/images/students/Hero3.png',
      alt: 'Student 3',
      bgColor: '#02BB22',
      borderRadius: 'rounded-[40px]' as const,
    },
    {
      id: 4,
      src: '/images/students/Hero4.png',
      alt: 'Student 4',
      bgColor: '#7dd3b0',
      borderRadius: 'rounded-tl-[300px] rounded-[40px]' as const,
    },
  ]

}) => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()

  // Parallax effects for decorative elements
  const decorBg1Y = useTransform(scrollY, [0, 300], [0, 100])
  const decorBg2Y = useTransform(scrollY, [0, 300], [0, -80])

  // Container animation - staggered children
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  // Badge animation
  const badgeVariants:Variants = {
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

  // Heading animation
  const headingVariants:Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  // Subheading animation
  const subheadingVariants:Variants = {
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

  // Button animation
  const buttonVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(69, 31, 23, 0.3)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.98,
    },
  }

  // Image grid animation
  const imageGridVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  }

  // Individual image animation
  const imageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.08,
      boxShadow: '0 25px 40px -10px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Float animation for images (continuous)
  const floatVariants:Variants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  // Decorative element animations
  const decorVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen  mx-auto px-4 lg:px-6 py-8 flex mt-10 items-center overflow-hidden bg-[#FDFAFA]"
    >
      {/* Decorative blurred elements with parallax */}

       <motion.div
        style={{ y: decorBg2Y }}
        variants={decorVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="absolute  right-140 w-24 top-10 h-24   blur-[1px] rounded-full "
      >
        <img src='/images/other/gradCap.png' alt='graduation cap' />
        </motion.div>
      
      <motion.div
        style={{ y: decorBg2Y }}
        variants={decorVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="absolute  left-1/2 w-24 top-70 h-24  bg-gradient-to-br from-[#8B0000] from-50% to-[#1b6f3e] blur-[3px] rounded-full "
      />

      <motion.div
        style={{ y: decorBg1Y }}
        variants={decorVariants}
        initial="hidden"
        animate="visible"
        className="absolute  right-1/2 w-8 h-8 top-115   bg-[#8B0000]  blur-[3px] rounded-full "

      />

      <div className="max-w-7xl md:mx-6 px-4  lg:px-6 none pb-12 pt-6 lg:py-2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Staggered animations */}
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border-2 border-gray-800 mb-8"
            >
              <GraduationCap className="w-5 h-5 text-gray-800" />
              <span className="text-sm font-medium text-gray-800">
                A Better Place to Learn
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={headingVariants}
              className="text-5xl lg:text-[75px] font-bold leading-tight mb-6"
            >
              <span className="text-gray-900">Education</span>
              <span className="text-gray-500"> for </span>
              <br />
              <span className="text-gray-900"> a </span>
              <span className="text-gray-500">Bright </span>
              <span className="text-gray-900">Future</span>
              <span className="text-gray-900">.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={subheadingVariants}
              className="text-lg text-gray-600 mb-8 leading-relaxed "
            >
              A modern learning environment where education meets innovation,
              inspiring every student to succeed.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-fit"
            >
              <Link
                to="/admission"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#451F17] from-60% to-[#02BB22] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
              >
                <GraduationCap className="w-5 h-5" />
                Apply Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Student Images Grid with staggered animation */}
          <motion.div
            className="relative h-96 lg:h-full min-h-96"
            variants={imageGridVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 gap-6 h-full">
              {studentImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={`relative overflow-hidden z-50 shadow-lg cursor-pointer ${
                    image.borderRadius
                  } ${index === 0 ? 'lg:col-span-1' : ''}`}
                  style={{
                    backgroundColor: image.bgColor,
                    aspectRatio: '1/1',
                  }}
                  variants={imageVariants}
                  whileHover="hover"
                  animate="float"
                >
                  {/* Float animation wrapper */}
                  <motion.div
                    className="w-full h-full"
                    variants={floatVariants}
                  >
                    {/* Image or Placeholder */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-50 ml-8 h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />

                    {/* Fallback gradient background if image not found */}
                    {/* <div
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: image.bgColor }}
                    >
                      <GraduationCap className="w-16 h-16 text-white/20" />
                    </div> */}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Floating decorative badges on images with parallax */}
            <motion.div
              style={{ y: decorBg1Y }}
              className="absolute bottom-6 right-50 w-14 h-14 bg-gradient-to-bl from-[#8B0000] to-80% to-[#fffff] blur-sm  rounded-full   pointer-events-none"
            />
          
          </motion.div>
        </div>
      </div>

  

    </section>
  )
}

export default HomeHero