"use client";

import services from "@/data/services.json";
import centerHouse from "@/data/centerHouse.json";
import { useForm, useWatch } from "react-hook-form";
import { bookingsUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { sendBookingEmail } from "@/actions/server/email";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function BookingDetails({ id }) {
  const router = useRouter();
  const { data: session } = useSession();

  const service = services.find((s) => s.id === id);
  if (!service) return <div>Service not found</div>;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: {
      duration: 1,
      senderRegion: "",
      senderDistrict: "",
      senderArea: "",
      address: "",
    },
    mode: "onChange", // better real-time validation feedback
  });

  const duration = watch("duration");
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");

  const price = service.price_per_hour;
  const totalCost = duration * price;

  // Unique regions
  const regions = [...new Set(centerHouse.map((c) => c.region))];

  // Get districts by selected region
  const districts = senderRegion
    ? centerHouse
        .filter((c) => c.region === senderRegion)
        .map((d) => d.district)
    : [];

  // Get areas by selected district
  const areas = senderDistrict
    ? centerHouse.find((item) => item.district === senderDistrict)?.covered_area || []
    : [];

  // Reset dependent fields when parent changes
  useEffect(() => {
    resetField("senderDistrict");
    resetField("senderArea");
  }, [senderRegion, resetField]);

  useEffect(() => {
    resetField("senderArea");
  }, [senderDistrict, resetField]);

  const onSubmit = async (data) => {
    const bookingData = {
      serviceId: service.id,
      serviceName: service.title,
      email: session?.user?.email,
      duration: data.duration,
      location: {
        division: data.senderRegion,
        district: data.senderDistrict,
        city: data.senderDistrict,
        area: data.senderArea,
        address: data.address,
      },
      totalCost,
      status: "Pending",
    };

    const result = await bookingsUser(bookingData);

    if (result?.insertedId) {
      await sendBookingEmail({
        to: session?.user?.email,
        orderId: result.insertedId.toString(),
        bookingData,
        totalCost,
      });

      Swal.fire("success","Booking Confirmed! Status: Pending", "success");
      router.push("/my-bookings");
    } else {
      Swal.fire("error","Something went wrong. Please check your information.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Book {service.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE - Form Fields */}
        <div className="space-y-6">
          {/* Duration */}
          <div>
            <label className="font-semibold block mb-1">Select Duration (Hours)</label>
            <input
              type="number"
              min="1"
              max="24"
              {...register("duration", {
                required: "Duration is required",
                min: { value: 1, message: "Minimum duration is 1 hour" },
                max: { value: 24, message: "Maximum duration is 24 hours" },
                valueAsNumber: true,
              })}
              className="w-full border rounded p-2"
            />
            {errors.duration && (
              <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>

          {/* Division / Region */}
          <div>
            <label className="font-semibold block mb-1">Division</label>
            <select
              {...register("senderRegion", {
                required: "Division is required",
              })}
              className="w-full border rounded p-2 bg-background"
            >
              <option value="">Select division</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.senderRegion && (
              <p className="text-red-600 text-sm mt-1">{errors.senderRegion.message}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="font-semibold block mb-1">District</label>
            <select
              {...register("senderDistrict", {
                required: "District is required",
              })}
              className="w-full border rounded p-2 bg-background"
              disabled={!senderRegion}
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.senderDistrict && (
              <p className="text-red-600 text-sm mt-1">{errors.senderDistrict.message}</p>
            )}
          </div>

          {/* City (readonly) */}
          <div>
            <label className="font-semibold block mb-1">City</label>
            <input
              value={senderDistrict || ""}
              readOnly
              className="w-full border rounded p-2"
            />
          </div>

          {/* Area */}
          <div>
            <label className="font-semibold block mb-1">Area</label>
            <select
              {...register("senderArea", {
                required: "Area is required",
              })}
              className="w-full border rounded p-2 bg-background"
              disabled={!senderDistrict}
            >
              <option value="">Select area</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            {errors.senderArea && (
              <p className="text-red-600 text-sm mt-1">{errors.senderArea.message}</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="font-semibold block mb-1">Full Address</label>
            <textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
              })}
              placeholder="House / Road / Details"
              className="w-full border rounded p-2 min-h-[90px]"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Summary */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-5">Booking Summary</h2>

          <div className="space-y-3">
            <p>
              <strong>Service:</strong> {service.title}
            </p>
            <p>
              <strong>Price Per Hour:</strong> ${price}
            </p>
            <p>
              <strong>Duration:</strong> {duration || 0} hours
            </p>
            <p className="text-lg font-bold text-blue-600 pt-3 border-t">
              Total Cost: ${totalCost}
            </p>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}