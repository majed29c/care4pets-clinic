import "tailwindcss/tailwind.css";
import Image from "next/image";
import petspic from "../public/photo2.jpg";
import OpeningHours from "@/components/openhours/OpenHours";
export default function Home() {
  return (
    <>
    <div className="flex flex-col lg:flex-row w-full justify-center items-center mt-[8vw] px-[5vw]">
      <div className="flex  justify-center items-center basis-1/2 py-6 mb-2" >
      <h1 className="font-bold text-center sm:text-[4vw]  xs:text-[20px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-roboto"> Welcome to Care4Pets Clinic </h1>
      </div>
      <div className="flex basis-1/2 justify-center items-center">
       <Image src={petspic} alt="pets image" className="rounded-xl"/>
      </div>
    </div>
    <div className="flex flex-col w-full justify-center items-center mt-[3vw] px-[5vw] pb-[8vw] space-y-4">
    <p className="mt-[6vw] xs:text-[15px] lg:text-[1.8vw] text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-roboto">
  Your pet’s health and happiness are our top priorities.
</p>

     
        <p className="mt-[2vw]  xs:text-[15px] text-center lg:text-[1.8vw] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-roboto">   Book an appointment today and give your furry friends the care they deserve!
        </p>
       
        </div>  
        <OpeningHours />
    </>
  );
}
