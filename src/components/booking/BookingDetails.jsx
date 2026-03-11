"use client";

import services from "@/data/services.json";
import centerHouse from "@/data/centerHouse.json";
import { useForm, useWatch } from "react-hook-form";

export default function BookingDetails({ id }) {

  const service = services.find((s) => s.id === id);

  const {
    register,
    handleSubmit,
    control,
    watch
  } = useForm({
    defaultValues: {
      duration: 1
    }
  });

  const duration = watch("duration");

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const senderDistrict = useWatch({ control, name: "senderDistrict" });

  const price = service.price_per_hour;
  const totalCost = duration * price;

  // Unique regions
  const regions = [...new Set(centerHouse.map((c) => c.region))];

  // Get districts by region
  const districtsByRegion = (region) => {
    return centerHouse
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  // Get areas by district
  const getCoveredAreasByDistrict = (districtName) => {
    const location = centerHouse.find(
      (item) => item.district === districtName
    );

    return location ? location.covered_area : [];
  };

  const onSubmit = (data) => {

    const bookingData = {
      serviceId: service.id,
      serviceName: service.title,
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

    console.log("Booking Data:", bookingData);

    alert("Booking Confirmed! Status: Pending");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-10">
        Book {service.title}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-10"
      >

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* Duration */}
          <div>
            <label className="font-semibold">
              Select Duration (Hours)
            </label>

            <input
              type="number"
              min="1"
              {...register("duration")}
              className="w-full border rounded p-2 mt-2"
            />
          </div>

          {/* Division */}
          <fieldset className="fieldset">

            <legend className="font-semibold">
              Sender Division
            </legend>

            <select
              {...register("senderRegion")}
              className="w-full border rounded p-2 mt-2 bg-background"
            >

              <option
               value="">Pick a region</option>

              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}

            </select>
          </fieldset>

          {/* District */}
          <fieldset className="fieldset">

            <legend className="font-semibold">
              Sender District
            </legend>

            <select
              {...register("senderDistrict")}
              className="w-full border rounded p-2 mt-2 bg-background"
            >

              <option value="">Pick a district</option>

              {districtsByRegion(senderRegion).map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}

            </select>

          </fieldset>

          {/* City (Auto from district) */}
          <div>

            <label className="font-semibold">City</label>

            <input
              value={senderDistrict || ""}
              readOnly
              className="w-full border rounded p-2 mt-2"
            />

          </div>

          {/* Area */}
          <fieldset className="fieldset">

            <legend className="font-semibold">
              Sender Area
            </legend>

            <select
              {...register("senderArea")}
              className="w-full border rounded p-2 mt-2 bg-background"
            >

              <option value="">Pick an area</option>

              {getCoveredAreasByDistrict(senderDistrict).map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}

            </select>

          </fieldset>

          {/* Address */}
          <div>

            <label className="font-semibold">
              Full Address
            </label>

            <textarea
              {...register("address")}
              placeholder="House / Road / Details"
              className="w-full border rounded p-2 mt-2"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 outline-1 rounded-lg shadow">

          <h2 className="text-xl font-semibold mb-4">
            Booking Summary
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Service:</strong> {service.title}
            </p>

            <p>
              <strong>Price Per Hour:</strong> ${price}
            </p>

            <p>
              <strong>Duration:</strong> {duration} hours
            </p>

            <p className="text-lg font-bold text-blue-600">
              Total Cost: ${totalCost}
            </p>

          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>

        </div>

      </form>
    </div>
  );
}