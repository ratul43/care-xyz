"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButton from "../buttons/SocialButton";
import { Suspense, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}

function LoginFormContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);

  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: params.get("callbackUrl") || "/",
    });

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

        <div className="relative">
          <label className="font-semibold text-black">Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full border text-black placeholder-gray-400 rounded p-2 mt-1"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-9 cursor-pointer text-black"
          >
            {show ? <FaEye /> : <IoEyeOff />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center font-semibold text-sm text-gray-600">
          Don't have an account?
          <Link
            href={`/register?callbackUrl=${callBack}`}
            className="text-blue-600 ml-1 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialButton />
    </div>
  );
}
