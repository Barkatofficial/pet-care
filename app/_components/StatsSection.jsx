'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Summarization from './Summarization';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const statsData = [
    { label: '#1 Rated', value:1, suffix: 'Software in India', image: 'software.png' },
    { label: '95K', value: 95000, suffix: 'Services', image: 'public-service.png' },
    { label: '28', value: 28, suffix: 'States', image: 'location.png' },
    { label: '400+', value: 400, suffix: 'Happy Pet Parents', image: 'people.png' },
    { label: '24*7', value: 24, suffix: 'Hours A Day', image: 'fetch.png' }
  ];

  const animateValue = (start, end, duration) => {
    const [value, setValue] = useState(start);
    useEffect(() => {
      if (isVisible) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setValue(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, [isVisible]);
    return value;
  };

  return (
    <>
      {/* Stats Section */}
      <section
        ref={sectionRef}
        className="bg-white text-center py-16 px-8 sm:px-12 md:px-24 lg:px-32"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-700">
          Trusted by veterinary hospitals of all sizes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <Image
                src={`/${stat.image}`}
                alt={stat.label}
                width={50}
                height={50}
                className="mb-4"
              />
              <p className="text-2xl font-semibold text-gray-800">
                {animateValue(0, stat.value, 2000)}
              </p>
              <p className="text-sm text-gray-500">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summarization Section */}
      {/* <Summarization /> */}
    </>
  );
};

export default StatsSection;
