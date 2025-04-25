import React from "react";
import { services, serviceCategories } from "./servicesData";

const Page = () => {
  return (
    <div className="min-h-screen py-12">
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
                    <td
                      colSpan={2}
                      className="px-6 py-3 text-sm font-bold text-charcoal uppercase border-b border-secondary/20"
                    >
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