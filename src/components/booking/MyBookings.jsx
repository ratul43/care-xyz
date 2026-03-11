"use client";

import { useState } from "react";

// Mock booking data - replace with real API/fetch call
const mockBookings = [
  {
    id: "BK-001",
    serviceId: "cleaning-001",
    serviceName: "Home Cleaning",
    duration: 3,
    location: {
      division: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      area: "Gulshan",
      address: "House 12, Road 5, Gulshan-1",
    },
    totalCost: 90,
    status: "Confirmed",
    bookedAt: "2025-03-08T10:30:00Z",
  },
  {
    id: "BK-002",
    serviceId: "plumbing-001",
    serviceName: "Plumbing Repair",
    duration: 2,
    location: {
      division: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      area: "Dhanmondi",
      address: "Flat 3B, House 22, Road 9",
    },
    totalCost: 60,
    status: "Pending",
    bookedAt: "2025-03-10T09:00:00Z",
  },
  {
    id: "BK-003",
    serviceId: "electrical-001",
    serviceName: "Electrical Service",
    duration: 4,
    location: {
      division: "Chittagong",
      district: "Chittagong",
      city: "Chittagong",
      area: "Agrabad",
      address: "Plot 7, Agrabad C/A",
    },
    totalCost: 160,
    status: "Completed",
    bookedAt: "2025-03-01T14:00:00Z",
  },
  {
    id: "BK-004",
    serviceId: "painting-001",
    serviceName: "House Painting",
    duration: 6,
    location: {
      division: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      area: "Mirpur",
      address: "Block A, Section 10, Mirpur",
    },
    totalCost: 240,
    status: "Cancelled",
    bookedAt: "2025-03-05T11:00:00Z",
  },
];

const STATUS_STYLES = {
  Pending:   "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Confirmed: "bg-blue-100 text-blue-700 border border-blue-300",
  Completed: "bg-green-100 text-green-700 border border-green-300",
  Cancelled: "bg-red-100 text-red-700 border border-red-300",
};

const STATUS_FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

// ── Detail Modal ──────────────────────────────────────────────────────────────
function BookingDetailModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-1">{booking.serviceName}</h2>
        <p className="text-sm text-gray-400 mb-6">Booking ID: {booking.id}</p>

        <div className="space-y-3 text-sm text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Status</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[booking.status]}`}>
              {booking.status}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Duration</span>
            <span>{booking.duration} hour{booking.duration > 1 ? "s" : ""}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Total Cost</span>
            <span className="font-bold text-blue-600">${booking.totalCost}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Booked At</span>
            <span>{new Date(booking.bookedAt).toLocaleString()}</span>
          </div>

          <div className="pt-2">
            <p className="font-semibold mb-1">Location</p>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-gray-600">
              <p><span className="font-medium">Division:</span> {booking.location.division}</p>
              <p><span className="font-medium">District:</span> {booking.location.district}</p>
              <p><span className="font-medium">City:</span> {booking.location.city}</p>
              <p><span className="font-medium">Area:</span> {booking.location.area}</p>
              <p><span className="font-medium">Address:</span> {booking.location.address}</p>
            </div>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Close
        </button>

      </div>
    </div>
  );
}

// ── Cancel Confirm Modal ──────────────────────────────────────────────────────
function CancelModal({ booking, onConfirm, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">

        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">Cancel Booking?</h2>
        <p className="text-gray-500 text-sm mb-6">
          Are you sure you want to cancel <span className="font-semibold text-gray-800">{booking.serviceName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 font-semibold transition"
          >
            Keep Booking
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-semibold transition"
          >
            Yes, Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────
function BookingCard({ booking, onViewDetails, onCancel }) {
  const { serviceName, duration, location, totalCost, status } = booking;
  const canCancel = status === "Pending" || status === "Confirmed";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{serviceName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">ID: {booking.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[status]}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-5">

        <div className="flex items-center gap-2">
          <span className="text-gray-400">🕐</span>
          <span>{duration} hour{duration > 1 ? "s" : ""}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400">💰</span>
          <span className="font-semibold text-blue-600">${totalCost}</span>
        </div>

        <div className="flex items-start gap-2 col-span-2">
          <span className="text-gray-400 mt-0.5">📍</span>
          <span className="truncate">
            {location.area}, {location.city}, {location.division}
          </span>
        </div>

      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(booking)}
          className="flex-1 bg-blue-50 text-blue-600 border border-blue-200 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
        >
          View Details
        </button>

        {canCancel ? (
          <button
            onClick={() => onCancel(booking)}
            className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
          >
            Cancel Booking
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-50 text-gray-300 border border-gray-200 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
          >
            Cancel Booking
          </button>
        )}
      </div>

    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const filtered = activeFilter === "All"
    ? bookings
    : bookings.filter((b) => b.status === activeFilter);

  const handleCancelConfirm = () => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingToCancel.id ? { ...b, status: "Cancelled" } : b
      )
    );
    setBookingToCancel(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold ">My Bookings</h1>
        <p className=" mt-1">Track and manage all your service bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
              activeFilter === filter
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {filter}
            {filter !== "All" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({bookings.filter((b) => b.status === filter).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Booking Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-semibold">No bookings found</p>
          <p className="text-sm mt-1">You have no {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} bookings yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onViewDetails={setSelectedBooking}
              onCancel={setBookingToCancel}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

      <CancelModal
        booking={bookingToCancel}
        onConfirm={handleCancelConfirm}
        onClose={() => setBookingToCancel(null)}
      />

    </div>
  );
}
