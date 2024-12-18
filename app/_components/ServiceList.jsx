"use client"
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';
export default function ServiceList({ list }) {
  return (
    <div className='min-h-screen bg-gradient-to-r from-white to-green-100'>
      <Navbar />
      <div className='container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'>
        <h1 className='text-4xl font-bold text-gray-800 text-center mt-6'>
          Our Services
        </h1>
        {/* <p className='text-lg text-gray-600 text-center mt-2 mb-8'>
          Discover a range of expert services tailored for your needs.
        </p> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {list.length > 0 ? (
            list.map((service, index) => (
              <div
                key={index}
                className='bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group'
                onClick={() => window.location.href = `/service-details/${encodeURIComponent(service.email)}`}
              >
                <Image
                  src={service.image}
                  alt='service image'
                  width={500}
                  height={300}
                  className='h-56 w-full object-cover rounded-t-lg group-hover:brightness-90'
                  unoptimized
                />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold text-gray-800 group-hover:text-primary-500 transition-all truncate'>
                    {service.name}
                  </h2>
                  <p className='text-sm text-gray-500 mt-1 truncate'>
                    {service.address}
                  </p>
                  <Link href={'/service-details/' + encodeURIComponent(service.email)}>
                    <div
                      className='mt-4 bg-primary-500 text-white py-2 px-4 rounded-full text-center hover:bg-primary-600 transition-all duration-300'
                    >
                      Book Now
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              No services found. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
