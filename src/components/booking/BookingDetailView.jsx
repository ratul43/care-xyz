"use client";

import { getBookingById } from "@/actions/server/booking";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STATUS_STYLE = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingDetailView({ id }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/booking/${id}`);
      return;
    }

    const loadBooking = async () => {
      try {
        const data = await getBookingById(id, session.user.email);
        setBooking(data);
      } catch (error) {
        console.error("Failed to load booking:", error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [status, session?.user?.email, id, router]);

  if (status === "loading" || loading) {
    return (
      <div className="text-center py-20 text-lg">Loading booking details...</div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
        <p className="text-gray-500 mb-6">
          This booking does not exist or you do not have access to it.
        </p>
        <Link
          href="/booking"
          className="text-blue-600 hover:underline font-medium"
        >
          Back to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/booking"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to My Bookings
      </Link>

      <div className="mt-6 border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{booking.serviceName}</h1>
            <p className="text-gray-500 mt-1">Booking ID: {booking._id}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded ${STATUS_STYLE[booking.status]}`}
          >
            {booking.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-3">
            <h2 className="font-semibold text-lg text-black">Service Info</h2>
            <p>
              <strong>Service ID:</strong> {booking.serviceId}
            </p>
            <p>
              <strong>Duration:</strong> {booking.duration} hours
            </p>
            <p>
              <strong>Total Cost:</strong> ${booking.totalCost}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-lg text-black">Location</h2>
            <p>
              <strong>Address:</strong> {booking.location?.address}
            </p>
            <p>
              <strong>Area:</strong> {booking.location?.area}
            </p>
            <p>
              <strong>City:</strong> {booking.location?.city}
            </p>
            <p>
              <strong>District:</strong> {booking.location?.district}
            </p>
            <p>
              <strong>Division:</strong> {booking.location?.division}
            </p>
          </div>
        </div>

        {booking.createdAt && (
          <p className="mt-6 text-sm text-gray-500">
            Booked on: {new Date(booking.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
