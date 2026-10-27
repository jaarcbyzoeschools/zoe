import React from 'react'
import { HomeHero } from '@/components/public/Home/HomeHero'

import Programs from '@/components/public/Home/Programs'
import AboutInstitute from '@/components/public/Home/AboutInstitute'
import Testimonials from '@/components/public/Home/Testimonials'
import CampusGallery from '@/components/public/Home/CampusGallery'
import FAQ from "@/components/public/Home/FAQ"
import NewsEvents from '@/components/public/Home/NewsEvents'
import Facilities from '@/components/public/Home/Facilities'
import Journey from '@/components/public/Home/Journey'


export const Home: React.FC = () => {
  // You can customize student images by passing this prop to HomeHero
  

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HomeHero  />
       <Programs />
       <AboutInstitute />
       <Journey />
       <Facilities />
       <Testimonials />
       <CampusGallery />
       <FAQ />
       <NewsEvents />

      {/* You can add more sections here */}
      {/* 
        - Features/Why Choose Us
        - Stats/Numbers
        - Testimonials
        - Courses/Academics
        - News/Events
        - CTA Section
      */}
    </div>
  )
}

export default Home