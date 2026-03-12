"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// get all bookings
export const getBookings = async () => {

  const bookings = await dbConnect(collections.BOOKINGS)
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
  }));
};


// cancel booking
export const cancelBooking = async (id) => {

  const result = await dbConnect(collections.BOOKINGS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "Cancelled" } }
  );

  return result.modifiedCount === 1;
};

// update booking
export const updateBooking = async (id, newStatus) => {

  const result = await dbConnect(collections.BOOKINGS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: newStatus } }
  );

return {
    success: result.modifiedCount === 1,
  };

};