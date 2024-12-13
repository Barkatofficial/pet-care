"use client"
import React, { useState } from "react";

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Ankit Sharma",
      location: "Mumbai",
      rating: "⭐⭐⭐⭐⭐",
      text: "The vet consultation was quick and professional. My dog recovered faster than expected thanks to their expert advice. Highly recommend!",
    },
    {
      id: 2,
      name: "Radhika Mehra",
      location: "Bangalore",
      rating: "⭐⭐⭐⭐⭐",
      text: "The vet consultation was quick and professional. My dog recovered faster than expected thanks to their expert advice. Highly recommend!",
    },
    {
      id: 3,
      name: "Priya Kapoor",
      location: "Delhi",
      rating: "⭐⭐⭐⭐⭐",
      text: "Amazing services and expert advice. My cat is much healthier now thanks to the timely consultation.",
    },
    {
      id: 4,
      name: "Amit Verma",
      location: "Kolkata",
      rating: "⭐⭐⭐⭐⭐",
      text: "Friendly staff and professional consultation. My pet's recovery journey was smooth and stress-free!",
    },
    {
      id: 5,
      name: "Neha Joshi",
      location: "Hyderabad",
      rating: "⭐⭐⭐⭐⭐",
      text: "Highly satisfied with the care and professionalism. My dog loved the experience!",
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-r from-purple-50 via-blue-50 to-gray-50">
      {/* Heading */}
      <h2
        className="text-4xl lg:text-5xl font-bold text-center text-emerald-900 mb-12"
        style={{ fontFamily: "Apple Garamond, serif" }}
      >
        Loved by Pets, <br />
        Trusted by Parents
      </h2>

      {/* Testimonial Cards with Animation */}
      <div
        className={`flex space-x-8 ${
          isPaused ? "" : "animate-marquee"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-shrink-0 w-80 p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300"
          >
            <p className="text-gray-800 italic mb-4">“{testimonial.text}”</p>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                {/* Replace with user's image */}
                <span className="text-xl font-bold text-emerald-600">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-sm text-emerald-600">{testimonial.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purple Decorative Background Dimple */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] bg-gradient-to-r from-purple-200 via-purple-300 to-transparent rounded-full opacity-30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default Testimonials;
