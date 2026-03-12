"use client";

import { cancelBooking, getBookings } from "@/actions/server/booking";
import { useEffect, useState } from "react";

const STATUS_STYLE = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // load bookings
  useEffect(() => {
    const loadBookings = async () => {
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    };

    loadBookings();
  }, []);

  // cancel booking
  const handleCancel = async (id) => {

    const confirm = window.confirm("Cancel this booking?");

    if (!confirm) return;

    const success = await cancelBooking(id);

    if (success) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "Cancelled" } : b
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-10">
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No bookings yet.
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">
                {booking.serviceName}
              </h2>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  STATUS_STYLE[booking.status]
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="text-sm space-y-1 text-gray-600">

              <p>
                <strong>Duration:</strong>{" "}
                {booking.duration} hours
              </p>

              <p>
                <strong>Total Cost:</strong>{" "}
                ${booking.totalCost}
              </p>

              <p>
                <strong>Area:</strong>{" "}
                {booking.location.area},{" "}
                {booking.location.city}
              </p>

              <p>
                <strong>Division:</strong>{" "}
                {booking.location.division}
              </p>

            </div>

            <div className="mt-4 flex gap-3">

              {booking.status !== "Cancelled" &&
                booking.status !== "Completed" && (

                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}