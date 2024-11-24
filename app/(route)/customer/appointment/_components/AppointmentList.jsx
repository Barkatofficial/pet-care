import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment/moment';

export default function AppointmentList({ list }) {
  return (
    <div className='flex'>
      {list && list.length > 0 ? (
        list.map((item, index) => (
          <div key={index} className='flex gap-4 items-center border p-5 m-3 rounded-lg'>
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] items-center flex justify-between'>
                {item.doctor.name}
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <MapPin className='text-primary h-5 w-5' />
                {item.doctor.address}
              </h2>
              <h2 className='flex gap-2'>
                <Calendar className='text-primary h-5 w-5' />
                Appointment On: {moment(item.date, "DD-MM-YYYY").format('DD-MMM-YYYY')}
              </h2>
              <h2 className='flex gap-2'>
                <Clock className='text-primary h-5 w-5' />
                At Time: {item.time}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <div className='h-[30vh]'>
          <p className='mt-3'>No appointments available.</p>
        </div>
      )}
    </div>
  )
}
