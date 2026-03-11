"use client"
// components/Testimonials/TestimonialCard.jsx
import React from "react";
import Image from "next/image";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover border-4 border-blue-100"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {testimonial.name}
          </h3>
          <p className="text-sm text-blue-600">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="relative flex-1">
        <span className="absolute -top-2 -left-2 text-6xl text-blue-200 opacity-50">
          &ldquo;
        </span>
        <p className="text-gray-700 leading-relaxed relative z-10 pl-4">
          {testimonial.comment}
        </p>
        <span className="absolute -bottom-8 -right-2 text-6xl text-blue-200 opacity-50">
          &rdquo;
        </span>
      </div>

      <div className="mt-6 flex justify-start">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;