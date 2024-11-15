import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import moment from 'moment/moment';
import { Button } from "@/components/ui/button";
import CancelBooking from './CancelBooking';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookingList({ bookingList, expired, updateRecord }) {

  const onDeleteBooking = (item) => {
    GlobalApi.deleteBooking(item.id).then((resp) => {
      if (resp) {
        toast.success('Booking deleted successfully!');
        updateRecord();  // Trigger the update immediately after deletion
      }
    }).catch((error) => {
      toast.error('Failed to delete booking. Please try again.');
      console.error(error);
    });
  };

  // Destructure bookingList from props
  return (
    <div className='flex'>
      {bookingList && bookingList.length > 0 ? (
        bookingList.map((item, index) => (
          <div key={index} className='flex gap-4 items-center border p-5 m-3 rounded-lg'>
            <Image
              src={item?.attributes?.doctor?.data?.attributes?.image?.data?.[0]?.attributes?.formats?.thumbnail?.url || '/default-image.jpg'}
              className='rounded-full h-[70px] w-[70px] object-cover'
              width={70}
              height={70}
              alt='doctor-image'
            />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] items-center flex justify-between'>
                {item.attributes.doctor.data.attributes.Name}
                {!expired && (
                  <CancelBooking onContinueClick={() => onDeleteBooking(item)} />
                )}
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <MapPin className='text-primary h-5 w-5' />
                {item.attributes.doctor.data.attributes.Address}
              </h2>
              <h2 className='flex gap-2'>
                <Calendar className='text-primary h-5 w-5' />
                Appointment On: {moment(item.attributes.Date).format('DD-MMM-YYYY')}
              </h2>
              <h2 className='flex gap-2'>
                <Clock className='text-primary h-5 w-5' />
                At Time: {item.attributes.Time}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <div className='h-[30vh]'>
          <p className='mt-3'>No bookings available.</p>
        </div>
      )}
    </div>
  );
}

export default BookingList;
