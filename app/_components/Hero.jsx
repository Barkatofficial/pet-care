"use client"
import React, { useEffect, useRef } from "react";

const Hero = () => {
  const trackRef = useRef(null);
  
  useEffect(() => {
    const track = trackRef.current;
    let animationFrameId;
    let scrollPosition = 0;
    const imageWidth = 176; // Adjusted for single image width + spacing
    const totalWidth = imageWidth * 18;
    
    const scroll = () => {
      scrollPosition = (scrollPosition + 0.5) % totalWidth;
      if (track) {
        track.style.transform = `translateX(-${scrollPosition}px)`;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col items-center text-center py-16 px-6">
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
          <button
            className="relative bg-green-400 text-black py-3 px-6 rounded-full font-medium inline-flex items-center justify-center group hover:bg-green-500 transition-colors duration-300"
            style={{ boxShadow: "0 4px 0 #00a000" }}
          >
            <span className="flex items-center">
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                Get Started for free
              </span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                →
              </span>
            </span>
          </button>
        </div>

        <div className="relative mt-16 overflow-hidden w-full">
          <div
            ref={trackRef}
            className="flex items-center gap-8 transition-transform duration-100"
            style={{ willChange: "transform" }}
          >
            {[...Array(18)].map((_, index) => (
              <div
                key={`img-${index}`}
                className="relative flex-shrink-0"
              >
                {index % 2 === 1 ? (
                  // Second indices (1, 3, 5, etc.) - show vertically stacked images
                  <div className="flex flex-col gap-4">
                    <img
                      src={`/images/dog-care-${index + 1}.jpg`}
                      alt={`Dog care ${index + 1}`}
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                    <img
                      src={`/images/dog-care-${((index + 1) % 18) + 1}.jpg`}
                      alt={`Dog care ${((index + 1) % 18) + 1}`}
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  // Other indices - show single image
                  <img
                    src={`/images/dog-care-${index + 1}.jpg`}
                    alt={`Dog care ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;