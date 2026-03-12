"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButton from "../buttons/SocialButton";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = useSearchParams();

  // console.log(params.get("callbackUrl") || "/");

  const callBack = params.get("callbackUrl") || "/"

  const router = useRouter();

  const onSubmit = async (data) => {
    // console.log("Login Data:", data);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      // redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    // console.log(result);

    if (!result.ok) {
      Swal.fire("error", "Unauthorized access", "error");
    } else {
      Swal.fire("success", "Welcome", "success");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white mt-20 shadow-lg rounded-lg">
      <h2 className="text-2xl text-black font-bold text-center mb-6">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="font-semibold text-black">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full border text-black placeholder-gray-400 rounded p-2 mt-1"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold text-black">Password</label>

          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full border text-black placeholder-gray-400 rounded p-2 mt-1"
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600">
          Dont have an account?
          <Link
            href={`/register?callbackUrl=${callBack}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialButton></SocialButton>
    </div>
  );
}
