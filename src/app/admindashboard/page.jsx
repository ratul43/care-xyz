"use client";

import { isAdmin } from "@/actions/server/auth";
import { getBookings, updateBooking } from "@/actions/server/booking";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (status === "loading") {
        return;
      }

      if (!session?.user?.email) {
        router.push("/login?callbackUrl=/");
        return;
      }

      const adminResult = await isAdmin(session.user.email);
      
      if (!adminResult) {
        router.push("/");
        return;
      }

      setAuthorized(true);
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    };

    checkAuthorization();
  }, [session, status, router]);

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center gap-5">
        <h2 className="text-5xl font-bold animate-pulse">Loading</h2>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">Admin Booking Management</h1>
        <p className="text-center text-gray-500">No bookings found</p>
      </div>
    );
  }

  // Main content
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Admin Booking Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-black text-left">Service</th>
              <th className="p-3 text-black text-left">User Location</th>
              <th className="p-3 text-black text-left">Duration</th>
              <th className="p-3 text-black text-left">Cost</th>
              <th className="p-3 text-black text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-3">{booking.serviceName}</td>
                <td className="p-3">
                  {booking.location?.area}, {booking.location?.city}
                </td>
                <td className="p-3">{booking.duration} hours</td>
                <td className="p-3">${booking.totalCost}</td>
                <td className="p-3">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
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