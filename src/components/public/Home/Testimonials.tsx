import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, MapPin, Star } from 'lucide-react'
import { Variants } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'

interface Testimonial {
  id: number
  parentName: string
  rating: number
  text: string
  location: string
}

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = [
    {
      id: 1,
      parentName: 'Courtney Henry',
      rating: 5,
      text: 'My child has become more confident and active since joining this school. The teachers genuinely care about each student.',
      location: 'Doha, Qatar',
    },
    {
      id: 2,
      parentName: 'Courtney Henry',
      rating: 5,
      text: 'My child has become more confident and active since joining this school. The teachers genuinely care about each student.',
      location: 'Doha, Qatar',
    },
    {
      id: 3,
      parentName: 'Courtney Henry',
      rating: 5,
      text: 'My child has become more confident and active since joining this school. The teachers genuinely care about each student.',
      location: 'Doha, Qatar',
    },
    {
      id: 4,
      parentName: 'Courtney Henry',
      rating: 5,
      text: 'My child has become more confident and active since joining this school. The teachers genuinely care about each student.',
      location: 'Doha, Qatar',
    },
  ],
}) => {
  const swiperRef = useRef<any>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  // Animation variants
  const headerVariants:Variants = {
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

  const badgeVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants:Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: index * 0.1,
      },
    }),
  }

  const navigationVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.4,
      },
    },
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden rounded-3xl mx-6 lg:mx-20">
      {/* Gradient background - Brown to Green */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            'linear-gradient(135deg, #820203 0%, #043D2A 100%)',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6"
          >
            <Quote className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-medium text-gray-800">
              Testimonial
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-3xl lg:text-4xl font-bold text-white mb-2"
          >
            What{' '}
            <span className="font-extrabold">Student's Parents Say</span> About
            Us
          </motion.h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="mb-8"
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  variants={cardVariants}
                  custom={index}
                  className="h-full"
                >
                  <div
                    className="h-full rounded-[20px] p-6 lg:p-8 text-white flex flex-col justify-between"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {/* Top Content */}
                    <div className="flex-1">
                      {/* Parent Name */}
                      <h3 className="text-lg font-bold mb-2">
                        {testimonial.parentName}
                      </h3>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-sm lg:text-base leading-relaxed text-white text-opacity-90 mb-4">
                        "{testimonial.text}"
                      </p>
                    </div>

                    {/* Bottom - Location & Quote Icon */}
                    <div className="flex items-end justify-between pt-4 border-t border-white border-opacity-20">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <div className='w-4 h-[1px] bg-white '></div>
                        <MapPin className="w-4 h-4 text-white text-opacity-70 ml-[-6px]" />
                        <span className="text-xs lg:text-sm text-white text-opacity-80">
                           {testimonial.location}
                        </span>
                      </div>

                      {/* Quote Icon */}
                      <Quote className="w-6 h-6 text-white text-opacity-30" />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Navigation & Pagination */}
        <motion.div
          variants={navigationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center gap-6"
        >
          {/* Previous Button */}
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#451F17] transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination */}
          <div className="text-white text-sm font-medium">
            {String(activeSlide + 1).padStart(2, '0')} /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </div>

          {/* Next Button */}
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#451F17] transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials