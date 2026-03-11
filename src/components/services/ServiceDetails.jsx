import services from "@/data/services.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export  default async function ServiceDetails({ id }) {



  const service = services.find(
    (s) => s.id === id
  );

  if (!service) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <img
          src={service.image}
          alt={service.title}
          className="rounded-xl shadow-lg w-full h-[420px] object-cover"
        />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {service.title}
          </h1>

          <p className=" mb-6">
            {service.details}
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Service Price
            </h3>

            <p className="text-blue-600 text-xl font-bold">
              ${service.price_per_hour} / hour
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Available Duration
            </h3>

            <div className="flex flex-wrap gap-2">
              {service.available_duration.map((d, i) => (
                <span
                  key={i}
                  className="px-3 outline-1 py-1 rounded"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-2">
              Available Time
            </h3>

            <div className="flex gap-2 flex-wrap">
              {service.available_time.map((t, i) => (
                <span
                  key={i}
                  className="outline-2 px-3 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={`/booking/${service.id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Book This Service
          </Link>

        </div>
      </div>
    </div>
  );
}