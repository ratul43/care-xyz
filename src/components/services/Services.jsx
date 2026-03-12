import Link from "next/link";
import services from "@/data/services.json";


export const metadata = {
  title: "Services",

  description:
    "Explore all home services available on Carexyz including baby care, cleaning, and home maintenance.",

  openGraph: {
    title: "Carexyz Services",
    description:
      "Browse all available home services and book professionals easily.",
    images: [
      {
        url: "https://i.ibb.co.com/XxsmCD91/servicespage.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};






export default function Services() {
  return (
    <section className="py-20 bg-blue-100">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-600 mt-2">
            Professional caregiving services designed to support your loved ones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {services.map((service) => (
            <div key={service.id} className="space-y-4">

              {/* Image */}
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Card */}
              <div className="bg-white p-8 text-center rounded-lg shadow-md hover:shadow-xl transition">

                <div className="text-blue-600 text-4xl mb-4">
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-5">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Details →
                </Link>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}