export default function FloatingCard({ icon, text1, text2, className }) {
  return (
    <div
      className={`
absolute
bg-white
border
border-red-900
rounded-xl
px-4
py-3
flex
items-center
gap-3
shadow-sm
text-xs
font-medium
max-w-[180px]
${className}
`}
    >
      <div
        className="
w-8
h-8
rounded-md
bg-[#a00000]
text-white
flex
items-center
justify-center
"
      >
        {icon}
      </div>
<div>
      <p>{text1}</p>
      <p className="text-gray-400 text-[10px]">{text2}</p>
      </div>

    </div>
  );
}
