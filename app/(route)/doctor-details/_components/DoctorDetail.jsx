import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import BookAppointment from './BookAppointment';

export default function DoctorDetail({ doctor }) {

  const renderAboutContent = (aboutContent) => {
    if (Array.isArray(aboutContent)) {
      return aboutContent.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className='text-gray-500 tracking-wide mt-2'>
              {block.children?.map((child, idx) => child.text).join(' ')}
            </p>
          );
        }
        return null;
      });
    }
    return <p className='text-gray-500 tracking-wide mt-2'>{aboutContent}</p>;
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
          <Image 
            src={doctor.attributes?.image?.data?.[0]?.attributes?.url}
            width={200}
            height={200}
            alt='doctor-image'
            className='rounded-lg w-full h-[280px] object-cover'
            unoptimized
          />
        {/* Doctor Info */}
        <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
          <h2 className='font-bold text-2xl'>{doctor.attributes?.Name}</h2>
          <h2 className='flex gap-2 text-gray-500 text-md'>
            <GraduationCap />
            <span>{doctor.attributes?.Experience_Year} years of experience</span>
          </h2>
          <h2 className='text-md flex gap-2 text-gray-500'>
            <MapPin />
            <span>{doctor.attributes.Address}</span>
          </h2>
          <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
            {doctor.attributes?.category?.data?.attributes?.Name}
          </h2>
          <h2 className='text-lg font-bold text-gray-700'>
            Consultation Fee: ₹{doctor.attributes?.price}
          </h2>
          
          <BookAppointment doctor_id={doctor.id} appointments={doctor.attributes.appointments.data} />
        </div>
      </div>

      {/* About Doctor */}
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>About Me</h2>
        {renderAboutContent(doctor.attributes?.About)}
      </div>

      {/* Payment Section */}
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>Payment</h2>
        <p className='text-lg text-gray-700'>
          Total Consultation Fee: ₹{doctor.attributes?.price}
        </p>
        <Button className="mt-3 w-full bg-gray-500" disabled>
          Proceed to Pay ₹{doctor.attributes?.price}
        </Button>
      </div>
    </>
  );
}
