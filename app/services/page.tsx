import React from 'react'
import Card from '@/components/card/Card'
export const services = [
  {
    title: "General Check-ups & Vaccinations",
    description: "Routine health exams and vaccinations to keep your pets healthy and prevent diseases."
  },
  {
    title: "Emergency & Surgery",
    description: "Immediate medical attention and surgical procedures, including spaying, neutering, and injury treatment."
  },
  {
    title: "Dental Care & Diagnostics",
    description: "Professional teeth cleaning, extractions, and oral health check-ups to prevent infections and maintain dental hygiene."
  },
  {
    title: "Parasite Prevention & Microchipping",
    description: "Protection against fleas, ticks, and worms, plus microchipping for permanent pet identification."
  },
  {
    title: "Bathing & Grooming",
    description: "Professional pet washing, fur trimming, and nail clipping to keep your pet clean and healthy."
  },
  {
    title: "Skin & Coat Treatments",
    description: "Specialized care for allergies, excessive shedding, and skin infections to ensure a healthy coat."
  },
  {
    title: "Ear Cleaning & Nail Trimming",
    description: "Essential hygiene services to prevent ear infections and maintain proper nail health."
  },
  {
    title: "Physical Therapy & Recovery",
    description: "Rehabilitation exercises and treatments to help pets recover from injuries or surgeries."
  },
  {
    title: "Laser Therapy & Acupuncture",
    description: "Alternative pain relief and healing methods to improve mobility and reduce discomfort."
  },
  {
    title: "Overnight Stays",
    description: "Safe and comfortable boarding options for pets when owners are away."
  },
  {
    title: "Daycare Programs",
    description: "Supervised play and socialization programs to keep pets entertained and active."
  },
  {
    title: "Pet Training Sessions",
    description: "Basic obedience, behavioral training, and problem-solving sessions to improve pet behavior."
  },
  {
    title: "Nutritional Consultations",
    description: "Expert guidance on pet diets to ensure optimal health, weight management, and overall well-being."
  },
  {
    title: "Compassionate Euthanasia",
    description: "Humane end-of-life care for aging or terminally ill pets in a comforting environment."
  },
  {
    title: "Memorial Services",
    description: "Support and options for honoring and remembering beloved pets."
  }
];

const page = () => {
  
  return (
    <div className='flex flex-row w-full justify-center flex-wrap px-[5vw] mt-[8vw]'>
      {services.map((service)=>(
        <Card title={service.title} description={service.description} key={service.title}/>
      ))}
    </div>
  )
}

export default page