"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col items-center text-center py-12 px-6">
        {/* Hero Section */}
        <div className="mt-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your <span className="text-green-900">Dog's Care</span>
            <br />
            <span className="text-gray-800">Delivered with</span> <span className="text-green-900">Love</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            From grooming to vet care, we've got your tail covered. Sit. Stay. Relax—we'll handle the rest.
          </p>
          <a
            href="/get-started"
            className="bg-green-500 text-white py-3 px-8 rounded-full font-medium hover:bg-green-600 transition duration-200"
          >
            Get Started for free
          </a>
        </div>
      </div>
    </div>
  );
}