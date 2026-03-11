"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import TestimonialCard from "@/elements/TestimonialCard";


const testimonials = [
  {
    id: 1,
    name: "Sara Ahmed",
    role: "Mother",
    comment:
      "Care.xyz provided an amazing babysitter for my daughter. She felt safe and happy while I was at work.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Reza Khan",
    role: "Son",
    comment:
      "The elderly care service was excellent. My father is more comfortable and well taken care of.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: 3,
    name: "Nabila Rahman",
    role: "Care Receiver",
    comment:
      "I was recovering from surgery and their sick care service made it stress-free and comfortable at home.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Family Caregiver",
    comment:
      "The professional and compassionate care provided to my mother exceeded all expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 5,
    name: "Fatima Hassan",
    role: "New Parent",
    comment:
      "Finding a trusted babysitter was never easier. The platform is intuitive and the caregivers are thoroughly vetted.",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories from families who trusted us with their loved ones
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full py-8"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;