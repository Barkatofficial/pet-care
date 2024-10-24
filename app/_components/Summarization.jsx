// Summarization.jsx
import React from 'react';
import Image from 'next/image';

const Summarization = () => {
  return (
    <section className="bg-blue-900 text-white py-16 px-8 sm:px-12 md:px-24 lg:px-32 font-outfit">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <div className="relative w-full h-96">
          <Image 
            src="/concept1.png"
            alt="Digital Treatment Management"
            fill
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Fully Integrated Digital Treatment Sheets</h2>
          <p className="text-lg mb-6">
            The industry's first practice management software built with fully integrated digital treatment sheets, 
            so you can keep track of patient history and treat your patients from one place. We call this an EMR 
            (Electronic Medical Record) platform because it's practice management software and so much more.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keep track of patient history efficiently</li>
            <li>Integrated digital treatment and medical records</li>
            <li>Faster access to all patient data from one place</li>
            <li>Professional, organized, and user-friendly platform</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Summarization;
