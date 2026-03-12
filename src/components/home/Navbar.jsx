"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthButtons from "../buttons/AuthButtons";
import NavLink from "../buttons/Navlink";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = (
    <nav className="flex space-x-4">
      <NavLink href="/">Home</NavLink>

      <NavLink href="/services" className="hover:text-blue-600">
        Services
      </NavLink>

      <NavLink href="/services/baby-care">Baby Care</NavLink>

      <NavLink href="/services/elderly-care">Elderly Care</NavLink>

      <NavLink href="/services/sick-care">Sick Care</NavLink>

      {session && <NavLink href="/my-bookings">My Bookings</NavLink>}
      
    </nav>
  );

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Care.xyz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
          {navLinks}
          <AuthButtons> </AuthButtons>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium">
          {navLinks}

          <AuthButtons></AuthButtons>

          {/* {!session ? (
            <>
              <Link
                href="/login"
                className="border px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <button
            //   onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )} */}
        </div>
      )}
    </nav>
  );
}
