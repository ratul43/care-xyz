"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Trusted Care for Your Loved Ones",
      description:
        "Professional babysitters and caregivers ready to support your family with love and responsibility.",
      image: "https://images.unsplash.com/photo-1581579186913-45ac0e6efe93"
    },
    {
      id: 2,
      title: "Reliable Elderly Care Services",
      description:
        "Give your parents the comfort and respect they deserve with our trained caregivers.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309"
    },
    {
      id: 3,
      title: "Safe & Compassionate Home Care",
      description:
        "Book trusted care services easily and ensure safety and comfort for your family.",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-2xl">

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl mb-6">
                {slide.description}
              </p>

              <Link
                href="/service/baby-care"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              >
                Book a Care Service
              </Link>

            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full"
      >
        <FaArrowRight />
      </button>

    </div>
  );
}