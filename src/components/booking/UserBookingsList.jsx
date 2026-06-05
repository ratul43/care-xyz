"use client";

import {
  getSingleBookings,
  updateUserBookingStatus,
} from "@/actions/server/booking";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const STATUS_STYLE = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MANAGE_STATUS_OPTIONS = ["Confirmed", "Completed"];

export default function UserBookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/booking");
      return;
    }

    const loadBookings = async () => {
      try {
        const data = await getSingleBookings(session.user.email);
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [status, session?.user?.email, router]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);

    const result = await updateUserBookingStatus(
      id,
      newStatus,
      session.user.email,
    );

    setUpdatingId(null);

    if (result.success) {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
      );

      Swal.fire({
        icon: "success",
        title: `Booking ${newStatus}`,
        text:
          newStatus === "Confirmed"
            ? "Status updated and confirmation email sent."
            : "Booking status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("error", "Failed to update booking status.", "error");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="text-center py-20 text-lg">Loading bookings...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">My Bookings</h1>

      {bookings.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No bookings yet.{" "}
          <Link href="/services" className="text-blue-600 hover:underline">
            Browse services
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{booking.serviceName}</h2>
              <span
                className={`px-2 py-1 text-xs rounded ${STATUS_STYLE[booking.status]}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="text-sm space-y-1 text-gray-600">
              <p>
                <strong>Duration:</strong> {booking.duration} hours
              </p>
              <p>
                <strong>Total Cost:</strong> ${booking.totalCost}
              </p>
              <p>
                <strong>Area:</strong> {booking.location?.area},{" "}
                {booking.location?.city}
              </p>
            </div>

            {booking.status !== "Cancelled" &&
              booking.status !== "Completed" && (
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Update Status
                  </label>
                  <select
                    value=""
                    disabled={updatingId === booking._id}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) handleStatusChange(booking._id, value);
                    }}
                    className="w-full border rounded px-2 py-2 text-sm"
                  >
                    <option value="">Select status</option>
                    {MANAGE_STATUS_OPTIONS.filter(
                      (s) => s !== booking.status,
                    ).map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            <div className="mt-4">
              <Link
                href={`/booking/${booking._id}`}
                className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Show Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
