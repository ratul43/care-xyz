import ServiceDetails from '@/components/services/ServiceDetails';
import React from 'react';
import  services  from '@/data/services.json';
import { getSingleService } from '@/actions/server/service';

export async function generateMetadata({ params }) {
  const {id} = await params

  const service = await getSingleService(id)

  if(!service){
    return {
      title: "Service Details",
    };
  }
 


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
      url: `https://care-xyz-orcin.vercel.app/services/${id}`,
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
      canonical: `https://care-xyz-orcin.vercel.app/services/${id}`,
    },
  };
 }


const ServiceDetailsPage = async ({params}) => {
    const {id} = await params
    return (
        <div>
            <ServiceDetails id={id}></ServiceDetails>
        </div>
    );
};

export default ServiceDetailsPage;