import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Variants } from 'framer-motion'

interface FooterProps {
  companyLinks?: { label: string; href: string }[]
  socialLinks?: { icon: React.ReactNode; href: string; label: string }[]
}

export const Footer: React.FC<FooterProps> = ({
  companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Admission', href: '/admission' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News and Events', href: '/news' },
  ],
  socialLinks = [
  {
    icon: <FaFacebook className="w-5 h-5" />,
    href: '#',
    label: 'Facebook',
  },
  {
    icon: <FaInstagram className="w-5 h-5" />,
    href: '#',
    label: 'Instagram',
  },
  {
    icon: <FaLinkedin className="w-5 h-5" />,
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: <FaTwitter className="w-5 h-5" />,
    href: '#',
    label: 'Twitter',
  },
]
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubscribed(true)
    setEmail('')
    setIsLoading(false)

    // Reset after 3 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 3000)
  }

  return (
    <footer className="relative bg-gray-100 py-16 overflow-hidden">
      {/* CTA Banner Section */}
      <motion.section
        className="relative py-16 lg:py-20 px-4 lg:px-6 md:mx-auto max-w-6xl rounded-[30px] mb-16 lg:mb-20 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/other/footer.jpg")',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 "
          style={{
            background: 'linear-gradient(135deg, rgba(139, 28, 28, 0.8) 0%, rgba(27, 77, 43, 0.8) 100%)',
          }}
        />

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-white font-medium tracking-widest uppercase mb-4"
          >
            ─ JOIN US ─
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            LET'S SECURE YOUR KID'S FUTURE
          </motion.h2>

          {/* CTA Button */}
          <motion.a
            variants={itemVariants}
            href="/admission"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#8B1C1C] transition-all duration-300 group"
          >
            Get Start
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Column - Logo & Social */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {/* Logo */}
            <div className='w-20'>
                <img src="/images/other/logo.png" alt="" />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
              Join thousands of families experiencing stress-free education with
              Zoe Schools. Where your child's future takes shape.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-600 hover:text-[#02BB22] transition-colors duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Middle Column - Company Links */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h4 className="text-lg font-bold text-gray-900 mb-6">Company</h4>
            <nav className="flex flex-col gap-3">
              {companyLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-[#02BB22] transition-colors duration-200 text-sm lg:text-base"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Newsletter</h4>

            {/* Newsletter Description */}
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
              Join thousands of families experiencing stress-free education with
              Zoe Schools.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex border-2 border-gray-300 rounded-full overflow-hidden focus-within:border-[#02BB22] transition-colors duration-200">
              <motion.input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-none focus:outline-none text-sm bg-transparent disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading || !email}
                className="px-6 py-3 bg-[#820203] text-white font-semibold hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200 whitespace-nowrap"
                 style={{
                background: `radial-gradient(ellipse at top left, #820203, transparent 120%), #043D2A`,
              }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : subscribed ? (
                  <span className="flex items-center gap-2">
                    Subscribed
                  </span>
                ) : (
                  <>
                  <span className='flex items-center'>
                    Subscribe<ChevronRight className="w-4 h-4 ml-2" />
                    </span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        className="py-6 lg:py-8 px-4 lg:px-6"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="max-w-7xl mx-auto border-2 border-gray-300 rounded-full px-6 py-4 lg:px-8 lg:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-xs lg:text-sm">
            © 2026 Zoe Schools. All rights reserved, developed by JaarcTechsphere
          </p>

          {/* Links */}
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-gray-600 hover:text-[#02BB22] transition-colors duration-200 text-xs lg:text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-600 hover:text-[#02BB22] transition-colors duration-200 text-xs lg:text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer