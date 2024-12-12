"use client";
import React, { useEffect, useRef } from "react";

export default function Hero() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let scrollPosition = 0;
    const imageWidth = 176; // Width of one image container including margin
    const totalWidth = imageWidth * 18; // Width of one set of 18 images

    const scrollStep = () => {
      scrollPosition += 1; // Adjust speed by changing this value
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0; // Reset position for seamless looping
      }
      track.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col items-center text-center py-16 px-6">
        {/* Hero Section */}
        <div className="mt-20 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-gray-500">Your</span>{" "}
            <span className="text-black">Dog's Care</span>
            <br />
            <span className="text-gray-500">Delivered with</span>{" "}
            <span className="text-black">Love</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            From grooming to vet care, we've got your tail covered. Sit. Stay.
            Relax—we'll handle the rest.
          </p>
          <a
            href="/get-started"
            className="relative bg-green-400 text-black py-3 px-6 rounded-full font-medium inline-flex items-center justify-center group transition-all duration-300"
            style={{ boxShadow: "0 4px 0 #00a000" }}
          >
            <span className="absolute inset-0 rounded-full"></span>
            <span
              className="opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
              aria-hidden="true"
            >
              →
            </span>
            <span className="ml-2">Get Started for free</span>
          </a>
        </div>

        {/* Continuous Scrolling Images */}
        <div className="relative mt-16 overflow-hidden w-full">
          <div
            ref={trackRef}
            className="image-track flex items-center whitespace-nowrap"
          >
            {[...Array(18)].map((_, index) => (
              <div
                key={`img-${index}`}
                className="w-40 h-40 mx-4 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`/images/dog-care-${(index % 18) + 1}.jpg`}
                  alt={`Dog care ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {[...Array(18)].map((_, index) => (
              <div
                key={`img-duplicate-${index}`}
                className="w-40 h-40 mx-4 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`/images/dog-care-${(index % 18) + 1}.jpg`}
                  alt={`Dog care duplicate ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
