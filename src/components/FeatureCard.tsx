import {
  Calculator,
  Laptop,
  Atom,
  Palette,
  Music,
  Bus,
  Users,
  HeartHandshake,
  Car,
} from "lucide-react";


const icons = {
  calculator: Calculator,
  laptop: Laptop,
  atom: Atom,
  palette: Palette,
  music: Music,
  bus: Bus,
  users: Users,
  heart: HeartHandshake,
  car: Car,
};



interface FeatureCardProps {
  icon: keyof typeof icons;
  title: string;
}



export default function FeatureCard({
  icon,
  title
}: FeatureCardProps) {


  const Icon = icons[icon];


  return (
    <div
      className="
      flex
      items-center
      gap-4
      border
      border-gray-200
      rounded-3xl
      px-4
      py-3
      bg-white
      hover:shadow-sm
      transition
      "
    >


      <div
        className="
        w-10
        h-10
        rounded-xl
        bg-[#f3f7f7]
        flex
        items-center
        justify-center
        text-gray-700
        "
      >

        <Icon size={20}/>

      </div>



      <p
        className="
        text-sm
        font-medium
        text-[#171717]
        "
      >

        {title}

      </p>


    </div>
  );
}