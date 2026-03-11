import ServiceDetails from '@/components/services/ServiceDetails';
import React from 'react';

const ServiceDetailsPage = async ({params}) => {
    const {id} = await params
    return (
        <div>
            <ServiceDetails id={id}></ServiceDetails>
        </div>
    );
};

export default ServiceDetailsPage;