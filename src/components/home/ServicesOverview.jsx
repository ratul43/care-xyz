import Link from "next/link";

export default function ServicesOverview() {

  const services = [
    {
      id: "baby-care",
      title: "Baby Care",
      description:
        "Professional babysitters who ensure your child’s safety, comfort, and happiness while you focus on your work.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      features: ["Trained Babysitters", "Safe Environment", "Flexible Booking"]
    },
    {
      id: "elderly-care",
      title: "Elderly Care",
      description:
        "Compassionate caregivers providing assistance, companionship, and medical support for elderly family members.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309",
      features: ["Compassionate Care", "Daily Assistance", "Trusted Professionals"]
    },
    {
      id: "sick-care",
      title: "Sick People Care",
      description:
        "Dedicated caregivers to assist sick family members with proper care, monitoring, and support at home.",
      image:
        "https://images.unsplash.com/photo-1580281657527-47d48d89b3c5",
      features: ["Health Monitoring", "Medication Support", "Home Assistance"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Care Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide reliable and compassionate care services designed to
            support your family members with safety, comfort, and trust.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="text-sm text-gray-500 mb-5 space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>

                {/* Button */}
                <Link
                  href={`/services/${service.id}`}
                  className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}