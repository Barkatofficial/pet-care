"use client";
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';

export default function DoctorList({ list }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100 animate-gradient overflow-hidden">
      <Navbar />
      <div className="mb-10 px-6 sm:px-10 md:px-12 lg:px-16">
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-6">
          Our Trusted Doctors
        </h1>
        <p className="text-lg text-gray-700 text-center mt-2 mb-8">
          Expert care at your fingertips. Choose and book with ease.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {list.length > 0 ? (
            list.map((doctor, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() =>
                  (window.location.href = `/doctor-details/${encodeURIComponent(
                    doctor.email
                  )}`)
                }
              >
                {/* Doctor Image */}
                <Image
                  src={doctor.image}
                  alt="Doctor Image"
                  width={500}
                  height={300}
                  className="h-56 w-full object-cover rounded-t-lg group-hover:brightness-90"
                  unoptimized
                />
                {/* Doctor Info */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-primary-500 transition-all truncate">
                    {doctor.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {doctor.address}
                  </p>
                  {/* Book Now Button */}
                  <Link
                    href={'/doctor-details/' + encodeURIComponent(doctor.email)}
                  >
                    <div className="mt-4 bg-primary-500 text-white py-2 px-4 rounded-full text-center hover:bg-primary-600 transition-all duration-300">
                      Book Now
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No doctors found. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
