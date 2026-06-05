"use server";

import { connectDB } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// get all bookings
export const getBookings = async () => {
  const db = await connectDB()
  const bookings = await db.collection("bookings")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
  }));
};

// get bookings of individual user

export const getSingleBookings = async (userEmail) => {
  if (!userEmail) return [];

  try {
    const db = await connectDB();
    const bookings = await db
      .collection("bookings")
      .find({ email: userEmail })
      .sort({ _id: -1 })
      .toArray();

    return bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
    }));
  } catch (error) {
    console.error("getSingleBookings error:", error);
    return [];
  }
};

// cancel booking
export const cancelBooking = async (id) => {
  const db = await connectDB()
  const result = await db.collection("bookings").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "Cancelled" } },
  );

  return result.modifiedCount === 1;
};

// update booking
export const updateBooking = async (id, newStatus) => {
  const db = await connectDB()
  const result = await db.collection("bookings").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: newStatus } },
  );

  return {
    success: result.modifiedCount === 1,
  };
};
