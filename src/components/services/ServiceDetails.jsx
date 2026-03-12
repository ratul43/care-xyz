import services from "@/data/services.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookButton from "../buttons/BookButton";
import Image from "next/image";
import { getSingleService } from "@/actions/server/service";


export async function generateMetadata({ params }) {
  const serviceId = params.id;


  const service = await getSingleService(serviceId)

  console.log(service);

  return {
    title: service.title,

    description: service.description,

    keywords: [
      service.title,
      "home services",
      "book service",
      "professional home services",
      "CareNest services",
    ],

    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://care-xyz-orcin.vercel.app/${serviceId}`,
      siteName: "CareNest",
      images: [
        {
          url: "https://i.ibb.co.com/CLLGZxr/service-details.png",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: ["https://i.ibb.co.com/CLLGZxr/service-details.png"],
    },

    alternates: {
      canonical: `https://care-xyz-orcin.vercel.app/${serviceId}`,
    },
  };
}






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

        <Image
          src={service.image}
          width={500}
      height={500}
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

         <BookButton id={service.id}></BookButton>

        </div>
      </div>
    </div>
  );
}