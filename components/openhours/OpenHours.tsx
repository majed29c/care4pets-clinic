import { FaClock, FaCalendarAlt, FaRegSadTear } from "react-icons/fa";

const OpeningHours = () => {
  return (
    <section className="w-full  py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="xs:text-2xl lg:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaClock className="text-blue-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Opening Hours
            </span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            We're here to care for your pets every day of the week
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Weekdays */}
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((day) => (
              <div key={day} className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700">{day}</h3>
                  <p className="text-gray-500 mt-1">
                    <span className="text-blue-600">08:00 AM</span> -{' '}
                    <span className="text-purple-600">06:00 PM</span>
                  </p>
                </div>
              </div>
            ))}

            {/* Friday */}
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">Friday</h3>
                <p className="text-gray-500 mt-1">
                  <span className="text-blue-600">08:00 AM</span> -{' '}
                  <span className="text-purple-600">06:00 PM</span>
                </p>
              </div>
            </div>

            {/* Saturday */}
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">Saturday</h3>
                <p className="text-gray-500 mt-1">
                  <span className="text-blue-600">09:00 AM</span> -{' '}
                  <span className="text-purple-600">03:00 PM</span>
                </p>
              </div>
            </div>

            {/* Sunday */}
            <div className="p-4 bg-red-50 rounded-xl shadow-sm border border-red-100 relative overflow-hidden hover:shadow-md transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
              <div className="text-center relative">
                <h3 className="text-lg font-semibold text-red-600">Sunday</h3>
                <div className="flex flex-row justify-center items-center gap-2">
                <p  className="text-red-400 mt-1">Closed</p>
                <FaRegSadTear className="text-red-400 mt-1" />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center flex w-full justify-center items-center">  
            <button className="mt-[4vw]  flex flex-row justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg xs:text-sm lg:text-[1.3vw]  hover:from-purple-600 hover:to-blue-600 font-roboto transition-transform duration-300 hover:scale-110">
            <FaCalendarAlt className="mr-2" />
          Book Appointment
        </button>
          
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;