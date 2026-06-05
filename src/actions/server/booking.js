"use server";

import { connectDB } from "@/lib/dbConnect";
import { sendBookingEmail } from "@/actions/server/email";
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

export const getBookingById = async (id, userEmail) => {
  if (!id || !userEmail || !ObjectId.isValid(id)) return null;

  try {
    const db = await connectDB();
    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(id),
      email: userEmail,
    });

    if (!booking) return null;

    return {
      ...booking,
      _id: booking._id.toString(),
    };
  } catch (error) {
    console.error("getBookingById error:", error);
    return null;
  }
};

export const updateUserBookingStatus = async (id, newStatus, userEmail) => {
  if (!id || !userEmail || !ObjectId.isValid(id)) {
    return { success: false };
  }

  try {
    const db = await connectDB();
    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(id),
      email: userEmail,
    });

    if (!booking) return { success: false };

    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id), email: userEmail },
      { $set: { status: newStatus } },
    );

    if (result.modifiedCount !== 1) {
      return { success: false };
    }

    if (newStatus === "Confirmed") {
      try {
        await sendBookingEmail({
          to: userEmail,
          orderId: id,
          bookingData: booking,
          totalCost: booking.totalCost,
          subject: "Your Booking is Confirmed - Carexyz",
        });
      } catch (emailError) {
        console.error("Confirmation email failed:", emailError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("updateUserBookingStatus error:", error);
    return { success: false };
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
