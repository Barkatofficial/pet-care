import { ClockIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import BookService from './BookService';

export default function ServiceDetail({ service, email }) {

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
        <div>
          <Image
            src={service.image}
            width={200}
            height={200}
            alt='provider-image'
            className='rounded-lg w-full h-[280px] object-cover'
          />
        </div>
        {/* Service Info */}
        <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
          <h2 className='font-bold text-2xl'>{service.name}</h2>
          <h2 className='flex gap-2 text-gray-500 text-md'>
            <ClockIcon />
            <span>{service.start_time} time open</span>
          </h2>
          <h2 className='text-md flex gap-2 text-gray-500'>
            <MapPin />
            <span>{service.address}</span>
          </h2>
          <h2 className='text-lg font-bold text-gray-700'>
            Price: ₹{service.price}
          </h2>

          <BookService
            service_email={email}
            bookings={service.booking}
          />
        </div>
      </div>

      {/* About Provider */}
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>About Me</h2>
        {renderAboutContent(service.about)}
      </div>

      {/* Payment Section */}
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>Payment</h2>
        <p className='text-lg text-gray-700'>
          Total Amount: ₹{service.price}
        </p>
        <Button className="mt-3 w-full bg-gray-500" disabled>
          Proceed to Pay ₹{service.price}
        </Button>
      </div>
    </>
  );
}
