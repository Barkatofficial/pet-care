"use client";
import React, { useEffect, useRef } from "react";

export default function Hero() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let scrollPosition = 0;
    const imageWidth = 176; // Width of one image container including margin (adjust if necessary)
    const totalWidth = imageWidth * 18; // Width of one set of 18 images

    const scrollStep = () => {
      scrollPosition += 1; // Adjust speed by changing this value
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0; // Reset position to ensure seamless looping
      }
      track.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col items-center text-center py-12 px-6">
        {/* Hero Section */}
        <div className="mt-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your <span className="text-green-900">Dog's Care</span>
            <br />
            <span className="text-gray-800">Delivered with</span>{" "}
            <span className="text-green-900">Love</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            From grooming to vet care, we've got your tail covered. Sit. Stay.
            Relax—we'll handle the rest.
          </p>
          <a
            href="/get-started"
            className="bg-green-500 text-white py-3 px-8 rounded-full font-medium hover:bg-green-600 transition duration-200"
          >
            Get Started for free
          </a>
        </div>

        {/* Continuous Scrolling Images */}
        <div className="relative mt-12 overflow-hidden w-full">
          <div
            ref={trackRef}
            className="image-track flex items-center whitespace-nowrap"
          >
            {[...Array(18)].map((_, index) => (
              <div
                key={`img-${index}`}
                className="w-40 h-40 mx-4 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
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
                className="w-40 h-40 mx-4 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
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

      {/* Styling */}
      <style jsx>{`
        .image-track {
          display: flex;
          animation: none; /* Handled by JavaScript */
        }
      `}</style>
    </div>
  );
}
