import PageHero from "@/components/common/PageHero"
import CoreValues from "@/components/public/About/CoreValues"
import Growth from "@/components/public/About/Growth"
import Management from "@/components/public/About/Management"
import VisionMission from "@/components/public/About/VisionMission"
import { Info, } from 'lucide-react'


export const About: React.FC = () => {
  return (
    <div>
      <PageHero 
      badge="About Us"
      badgeIcon={<Info />}
      title="Meet Zoe"
      highlight="Schools"
      subtitle="Ogbomoso’s Fastest-Growing Educational Institution."
        />
      
      <Growth />
      <VisionMission />
      <CoreValues />
      <Management />
    
      {/* Add more sections */}
    </div>
  )
}