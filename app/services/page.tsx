import React from 'react';

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

const serviceCategories = [
  {
    name: 'Medical Services',
    services: [services[0], services[1], services[2], services[3], services[7], services[8]]
  },
  {
    name: 'Grooming & Hygiene',
    services: [services[4], services[5], services[6]]
  },
  {
    name: 'Boarding & Daycare',
    services: [services[9], services[10]]
  },
  {
    name: 'Training & Nutrition',
    services: [services[11], services[12]]
  },
  {
    name: 'End-of-Life Care',
    services: [services[13], services[14]]
  }
];

const Page = () => {
  return (
    <div className="min-h-scree py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table for large screens */}
          <table className="hidden sm:table min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceCategories.map((category) => (
                <React.Fragment key={category.name}>
                  <tr className="bg-secondary/10">
                    <td colSpan={2} className="px-6 py-3 text-sm font-bold text-charcoal uppercase border-b border-secondary/20">
                      {category.name}
                    </td>
                  </tr>
                  {category.services.map((service) => (
                    <tr key={service.title} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal">
                        {service.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal/90 max-w-prose">
                        {service.description}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Cards for small screens */}
          <div className="sm:hidden space-y-6 p-4">
            {serviceCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-base font-semibold text-secondary mb-2 uppercase">{category.name}</h2>
                <div className="space-y-4">
                  {category.services.map((service) => (
                    <div key={service.title} className="bg-gray-100 p-4 rounded-xl shadow-sm">
                      <h3 className="text-sm font-bold text-charcoal mb-1">{service.title}</h3>
                      <p className="text-sm text-charcoal/80">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-charcoal/80">
            🏥 24/7 Emergency Services | 📞 01 234 567
          </p>
          <p className="text-xs text-charcoal/60">
            Serving your pets with care since 2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
