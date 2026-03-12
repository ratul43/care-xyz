"use client";

import { getBookings, updateBooking } from "@/actions/server/booking";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Assigned",
  "On The Way",
  "Completed",
  "Cancelled",
];

export default function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getBookings();
      setBookings(data);
    };

    loadBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {

    const result = await updateBooking(id, newStatus);

    if (result.success) {
        Swal.fire("success", "Status updated", "success")

      // update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );

    }

  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-10">
        Admin Booking Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border rounded-lg">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">User Location</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Cost</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking._id} className="border-t">

                <td className="p-3">
                  {booking.serviceName}
                </td>

                <td className="p-3">
                  {booking.location.area}, {booking.location.city}
                </td>

                <td className="p-3">
                  {booking.duration} hours
                </td>

                <td className="p-3">
                  ${booking.totalCost}
                </td>

                <td className="p-3">

                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(
                        booking._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1"
                  >

                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}