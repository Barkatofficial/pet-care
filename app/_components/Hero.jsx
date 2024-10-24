"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const words = ["Vet Service", "Caging Service", "Grooming Service", "Sitting Service", "Event Service"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [fade, setFade] = useState(true);
  const wordChangeInterval = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWord((prevWord) => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setFade(true);
      }, 500);
    }, wordChangeInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-indigo-900 animate-gradientBg">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image Section */}
          <div className="rounded-lg sm:h-80 lg:order-last lg:h-full animate-float hover:scale-105 transition-all duration-500">
            <Image
              alt="Hero Image"
              src="/photo1.jpg"
              width={800}
              height={800}
              className="h-full w-full object-cover rounded-3xl transition-transform duration-500 ease-in-out shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              Take the Next Step: Find and Book Your{" "}
              <span
                className={`text-yellow-400 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'} transform transition-transform ease-in-out duration-500 ${fade ? 'translate-y-0' : 'translate-y-4'}`}>
                {currentWord}
              </span>
            </h2>

            <p className="mt-4 text-gray-200">
              The website is a one-stop hub for your pet's well-being. We have the best vet doctors for the betterment of your pet's health.
              And we have service providers for your ease of life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
