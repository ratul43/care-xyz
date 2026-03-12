import ServiceDetails from '@/components/services/ServiceDetails';
import React from 'react';


export const metadata = {
    title: "Service Details",
    description: "Best service for everyone"
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