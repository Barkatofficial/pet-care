import Image from 'next/image'
import Link from 'next/link'

export default function DoctorList({ list }) {
  return (
    <div className='mb-5 px-4 sm:px-6 md:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
        {list.length > 0
          ? (
            list.map((doctor, index) => (
              <div className='border-[1px] rounded-lg p-3
            cursor-pointer hover:border-primary
            hover:shadow-sm transition-all ease-in-out'
                key={index}>
                <Image
                  src={doctor.image}
                  alt='doctor image'
                  width={500}
                  height={200}
                  className='h-[200px] w-full object-cover rounded-lg'
                  unoptimized
                />
                <div className='mt-3 items-baseline flex flex-col gap-1'>
                  <h2 className='font-bold text-lg'>{doctor.name}</h2>
                  <h2 className='text-gray-500 text-sm'>{doctor.address}</h2>

                  <Link href={'/doctor-details/' + encodeURIComponent(doctor.email)} className='w-full'>
                    <h2 className='p-2 px-3 border-[1px]
                  border-primary text-primary rounded-full w-full text-center
                  text-[12px] mt-2
                  cursor-pointer
                  hover:bg-primary hover:text-white'>
                      Book Now
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No records found.</p>
          )}
      </div>
    </div>
  )
}
