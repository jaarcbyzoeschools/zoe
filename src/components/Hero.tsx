import { Check, BookOpen, GraduationCap, Laptop, Users } from "lucide-react";
import FloatingCard from "./FloatingCard";
import FeatureItem from "./FeatureItem";

import zoeLogo from "/zoeLogo.png"
import student from "/student.png"
import heroCircles from "/heroCircles.png";

const features = [
  "Day & Boarding Facilities",
  "Nursery, Primary & College",
  "ICT & Hybrid Learning",
  "WAEC CBT Preparation",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="
        max-w-6xl 
        mx-auto 
        px-6 
        lg:px-12 
        pt-10 
        lg:pt-16
      "
      >
        <div
          className="
          grid 
          grid-cols-1 
          lg:grid-cols-2 
          gap-12
          items-center
        "
        >
          {/* LEFT CONTENT */}

<div className="relative w-full">


  {/* Background decorative image */}

  <img
    src={heroCircles}
    alt=""
    className="
      absolute
      -left-24
      top-20
      w-[420px]
      pointer-events-none
      select-none
      opacity-70
    "
  />



  {/* Content */}

  <div
    className="
      relative
      z-10
      flex
      w-full
      justify-center
      lg:justify-start
    "
  >


    <div
      className="
        flex
        flex-col
        items-center
        lg:items-start
        text-center
        lg:text-left
      "
    >


      <img
        src={zoeLogo}
        className="w-32 mb-8"
      />


      <h1
        className="
        text-5xl
        lg:text-6xl
        font-bold
        leading-[1.05]
        tracking-tight
        "
      >

        <span className="text-[#17213d]">
          ADMISSION
        </span>

        <br />

        <span className="text-[#9c0808]">
          2026/2027
        </span>

        <span className="text-[#17213d]">
          {" "}IS
        </span>

        <br />

        <span className="text-[#17213d]">
          OPEN!
        </span>


      </h1>



      <p
        className="
        mt-6
        max-w-sm
        text-sm
        text-gray-600
        "
      >

        Secure Your Child's Future at Zoe Schools.
        <br/>
        We don't just teach, we TRAIN.

      </p>



      <button
        className="
        mt-8
        bg-[#00563f]
        text-white
        rounded-md
        px-10
        py-4
        "
      >

        APPLY FOR ADMISSION

      </button>


    </div>


  </div>


</div>


          {/* RIGHT SIDE */}

          <div
            className="
            relative
            flex
            justify-center
          "
          >

            <img
    src={heroCircles}
    alt=""
    className="
      absolute
      -right-30
      -bottom-35
      w-[420px]
      pointer-events-none
      select-none
      opacity-70
    "
  />
            {/* green circle */}

            <div
              className="
              absolute
              w-[370px]
              h-[370px]
              rounded-full
              bg-[#00563f]
              "
            />

            {/* image wrapper */}

            <div
              className="
              relative
              z-10
              pl-5
              "
            >
              <img
                src={student}
                className="
                w-[270px]
                lg:w-[290px]
                object-cover
                "
              />
            </div>

            <FloatingCard
              icon={<BookOpen size={18} />}
              text1="Fully Equipped"
              text2="Classroom"
              className="
              left-0
              top-[45%]
              z-50
              "
            />

            # If you haven't added a remote yet:
git remote add company git@github.com-company:company/jaarcbyzoeschools/zoe.git




            <FloatingCard
              icon={<Laptop size={18} />}
              text1="ICT & Hybrid"
              text2="Learning Environment"
              className="
              right-0
              top-5
              z-50
              "
            />

            <FloatingCard
              icon={<Users size={18} />}
              text1="Experienced"
              text2="Teachers & Staff"

              className="
              right-0
              bottom-12
              z-50

              "
            />
          </div>
        </div>

        {/* FEATURES */}

        <div
          className="
          mt-16
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          pb-8
          "
        >
          {features.map((item) => (
            <FeatureItem key={item} text={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
