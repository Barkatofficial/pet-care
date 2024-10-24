"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
    <section className="relative">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-600 to-indigo-900 animate-gradientBg"></div>
      
      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-80 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full animate-float hover:scale-105 transition-all duration-500">
            <Image
              alt="Hero Image"
              src="/photo1.jpg"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-500 ease-in-out shadow-lg"
            />
          </div>

          <div className="lg:py-24 relative z-10">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              Take the Next Step: Find and Book Your{" "}
              <span 
                className={`text-yellow-400 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'} transform transition-transform ease-in-out duration-500 ${fade ? 'translate-y-0' : 'translate-y-4'}`}>
                {currentWord}
              </span>
            </h2>

            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
              eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius
              quidem quam repellat.
            </p>

            <Button className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300">
              Explore Now
            </Button>
          </div>
        </div>
      </div>     
    </section>
  );
}
