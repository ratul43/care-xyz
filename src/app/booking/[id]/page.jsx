import BookingDetails from '@/components/booking/BookingDetails';
import React from 'react';

const BookingDetailsPage = async ({params}) => {
    const {id} = await params
    // console.log(id);
    return (
        <div>
         <BookingDetails id={id}></BookingDetails>
        </div>
    );
};

export default BookingDetailsPage;