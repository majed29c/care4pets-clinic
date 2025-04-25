import Image from "next/image";
import Photo3 from "../../public/photo3.jpg";
import Photo4 from "../../public/photo4.jpg";
import { FaCalendarAlt } from "react-icons/fa";
const AboutUs = () => {
 
  return (
      <div className="max-w-7xl mx-auto px-6 mt-[4vw] py-4 my-4">
        <div className="text-center">
          <h2 className="xs:text-3xl lg:text-4xl  font-bold mb-4 font-roboto text-secondary">Welcome to Care4Pets</h2>
          <p className=" text-xl text-charcoal mb-8">
            Your pet’s health and happiness are our top priorities. We treat every pet like family.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10vw]  mt-16 lg:mt-[8vw] py-4">
          <div className="flex flex-col justify-center space-y-4 xs:text-center lg:text-left">
            <h3 className="text-3xl font-semibold text-secondary font-roboto">Our Story</h3>
            <p className="text-lg text-charcoal">
              Care4Pets was founded by passionate veterinarians who have a deep love for animals. We wanted
              to create a space where pets feel safe and loved, while providing top-tier medical care for all.
              Our mission is to ensure that every pet has the opportunity to live a happy, healthy, and long life.
            </p>
            <p className="text-lg text-charcoal">
              From emergency care to routine checkups, we offer a comprehensive range of services tailored to
              the needs of your pet. Whether it's a wellness exam or surgery, your pet's well-being is our priority.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-xl shadow-lg relative">
              {/* Placeholder for Image */}
              <Image
                src={Photo3}
                alt="Our Clinic"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10vw] mt-16 ">
          <div className="flex justify-center items-center order-2 lg:order-1">
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-xl shadow-lg relative">
             
              <Image
                src={Photo4}
                alt="Pet Care"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2 xs:text-center lg:text-left">
            <h3 className="text-3xl font-semibold text-secondary">Why Choose Us?</h3>
            <ul className="text-lg text-charcoal space-y-2">
              <li>Experienced & Compassionate Veterinarians</li>
              <li>State-of-the-art Equipment</li>
              <li>Personalized Care for Every Pet</li>
              <li>Stress-Free and Pet-Friendly Environment</li>
              <li>Commitment to Your Pet’s Health & Happiness</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 lg:mt-[8vw] ">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-secondary mb-4 font-roboto">Giving Back to the Community</h3>
            <p className="text-lg text-charcoal mb-4">
              At Care4Pets, we are committed to supporting local shelters, rescue organizations, and adoption events.
              We believe in educating pet owners and working together to ensure that all pets receive the love and care they deserve.
            </p>
            <p className="text-lg text-charcoal">
              Our team participates in numerous **adoption drives** and collaborates with local animal rescue organizations
              to find loving homes for abandoned pets.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-secondary mb-4 font-roboto">Visit Us Today!</h3>
          <p className="text-lg text-charcoal mb-8">
            Your pet’s health and happiness are our top priorities! Whether it’s a wellness check, a consultation,
            or emergency care, our team is here to help. Book an appointment today and let us take care of your furry companion with the love and expertise they deserve.
          </p>
          
          <div className="mt-8 text-center flex w-full justify-center items-center">  
            <button className="mt-[4vw]  flex flex-row justify-center items-center bg-secondary hover:bg-hovered text-white px-6 py-3 rounded-lg xs:text-sm lg:text-[1.3vw]  hover:from-purple-600 hover:to-blue-600 font-roboto transition-transform duration-300 hover:scale-110">
            <FaCalendarAlt className="mr-2" />
          Book Appointment
        </button>
        </div>
        </div>
      </div>
  );
};

export default AboutUs;
