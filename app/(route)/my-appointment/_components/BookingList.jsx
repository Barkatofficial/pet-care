import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import moment from 'moment/moment';
import CancelBooking from './CancelBooking';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookingList({ bookingList, expired, updateRecord }) {

  const onDeleteBooking = (item) => {
    GlobalApi.deleteBook(item.id).then((resp) => {
      if (resp) {
        toast.success('Booking deleted successfully!');
        updateRecord();  // Trigger the update immediately after deletion
      }
    }).catch((error) => {
      toast.error('Failed to delete booking. Please try again.');
      console.error(error);
    });
  };


  return (
    <div>
      {bookingList && bookingList.length > 0 ? (
        bookingList.map((item, index) => {

          const imageUrl = item?.attributes?.service?.data?.attributes?.image?.data?.[0]?.attributes?.formats?.large?.url ||
            item?.attributes?.service?.data?.attributes?.image?.data?.[0]?.attributes?.formats?.thumbnail?.url;


          return (
            <div className='flex gap-4 items-center border p-5 m-3 rounded-lg' key={index}>
              <Image
                src={imageUrl}  // Use fallback image if thumbnail is not available
                className='rounded-full h-[70px] w-[70px] object-cover'
                width={70}
                height={70}
                alt='service-image'
              />
              <div className='flex flex-col gap-2 w-full'>
                <h2 className='font-bold text-[18px] items-center flex justify-between'>
                  {item?.attributes?.service?.data?.attributes?.Provider_name || 'Provider name not available'}  {/* Safely access Provider_name */}
                  {!expired && (
                    <CancelBooking onContinueClick={() => onDeleteBooking(item)} />
                  )}
                </h2>
                <h2 className='flex gap-2 text-gray-500'>
                  <MapPin className='text-primary h-5 w-5' />
                  {item?.attributes?.service?.data?.attributes?.Address || 'Address not available'}  {/* Safely access Address */}
                </h2>
                <h2 className='flex gap-2'>
                  <Calendar className='text-primary h-5 w-5' />
                  Appointment On: {moment(item?.attributes?.Date).format('DD-MMM-YYYY') || 'Date not available'}
                </h2>
                <h2 className='flex gap-2'>
                  <Clock className='text-primary h-5 w-5' />
                  At Time: {item?.attributes?.Time || 'Time not available'}
                </h2>
              </div>
            </div>
          );
        })
      ) : (
        <p>No bookings available.</p>  // Handle the case when bookingList is empty
      )}
    </div>
  );
}

export default BookingList;
