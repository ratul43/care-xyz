"use client";

import { useState } from "react";
import services from "@/data/services.json";

import centerHouse from "@/data/centerHouse.json";

import { useForm, useWatch } from "react-hook-form";

export default function BookingDetails({ id }) {
  const service = services.find((s) => s.id === id);

  const [duration, setDuration] = useState(1);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const price = service.price_per_hour;

  const totalCost = duration * price;

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  // console.log(centerHouse);

  const regionsDuplicate = centerHouse.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = centerHouse.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const thanaByDistrict = (district) => {
    const regionDistricts = centerHouse.filter((c) => c.district === district);
    const thanas = regionDistricts[0].covered_area
    return thanas;
  }

  console.log(thanaByDistrict("Dhaka"));

  const handleBooking = async () => {
    const bookingData = {
      serviceId: service.id,
      serviceName: service.title,
      duration,
      location: {
        division,
        district,
        city,
        area,
        address,
      },
      totalCost,
      status: "Pending",
    };

    console.log("Booking Data:", bookingData);

    alert("Booking Confirmed! Status: Pending");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Book {service.title}</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Duration */}
          <div>
            <label className="font-semibold">Select Duration (Hours)</label>

            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded p-2 mt-2"
            />
          </div>

          {/* sender region  */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">
              Sender Division
            </legend>
            <select
              {...register("senderRegion")}
              defaultValue="Pick a region"
              className="select w-full border rounded p-2 mt-2"
            >
              <option disabled={true}>Pick a region</option>

              {regions.map((r, i) => (
                <option className="text-background" key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>

          {/* sender districts */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">
              Sender Districts
            </legend>
            <select
              {...register("senderDistrict")}
              defaultValue="Pick a district"
              className="select w-full border rounded p-2 mt-2"
            >
              <option disabled={true}>Pick a district</option>
              {districtsByRegion(senderRegion).map((r, i) => (
                <option className="text-background" key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>

          {/* City */}
          <div>
            <label className="font-semibold">City</label>

            <input
              type="text"
              placeholder="Enter City"
              className="w-full border  rounded p-2 mt-2"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Area */}
          <div>
            <label className="font-semibold">Area</label>

            <input
              type="text"
              placeholder="Enter Area"
              className="w-full border rounded p-2 mt-2"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Full Address</label>

            <textarea
              className="w-full border rounded p-2 mt-2"
              placeholder="House / Road / Details"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 outline-1 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

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
            onClick={handleBooking}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
