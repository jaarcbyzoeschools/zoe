import { CircleCheckBig } from "lucide-react";

interface FeatureItemProps {
  text: string;
}
export default function FeatureItem({ text }:FeatureItemProps){
  return (
    <div
      className="
flex
items-center
gap-3
text-sm
text-gray-600

"
    >
        
      <div
        className="
text-[#a00000]
"
      >
        <CircleCheckBig size={18} />
      </div>

      <span>{text}</span>
    </div>
  );
}
