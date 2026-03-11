"use client";

import { postUser } from "@/actions/server/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

export default function RegisterForm() {

    const [show, setShow] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    
        const result = await postUser(data);

        if(result){
            alert("Registration Successful");
        }

    
  };

  return (
    <div className="max-w-md mt-20 mx-auto p-8 bg-white shadow  rounded-lg">

      <h2 className="text-2xl text-black font-bold mb-6 text-center">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

       

        {/* Name */}
        <div>
          <label className="font-semibold text-black">Full Name</label>

          <input
            type="text"
            {...register("name", {
              required: "Name is required"
            })}
            className="w-full border rounded p-2 mt-1 text-black placeholder-gray-500"
            placeholder="Enter your name"
          />

          {errors.name && (
            <p className="text-red-500 text-sm ">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-black">Email</label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required"
            })}
            className="w-full border text-black rounded p-2 mt-1 placeholder-gray-500"
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="font-semibold text-black">Contact Number</label>

          <input
            type="tel"
            {...register("contact", {
              required: "Contact number is required"
            })}
            className="w-full border text-black rounded p-2 mt-1 placeholder-gray-500"
            placeholder="Enter phone number"
          />

          {errors.contact && (
            <p className="text-red-500 text-sm">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="font-semibold text-black">Password</label>

          <input
            type={show ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                message:
                  "Password must contain at least 1 uppercase and 1 lowercase letter"
              }
            })}
            className="w-full border text-black rounded p-2 mt-1 placeholder-gray-500"
            placeholder="Enter password"
          />
          <span
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-9 cursor-pointer text-black"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

           {/* NID */}
        <div>
          <label className="font-semibold text-black">NID No</label>

          <input
            type="text"
            {...register("nid", {
              required: "NID is required"
            })}
            className="w-full border text-black rounded p-2 mt-1 placeholder-gray-500"
            placeholder="Enter NID number"
          />

          {errors.nid && (
            <p className="text-red-500 text-sm">
              {errors.nid.message}
            </p>
          )}
        </div>



        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

      </form>
    </div>
  );
}