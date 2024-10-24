import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function DoctorList({ list }) {
  return (
    <div className='mb-5 px-4 sm:px-6 md:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
        {list.map((doctor, index) => (
          <div className='border-[1px] rounded-lg p-3
            cursor-pointer hover:border-primary
            hover:shadow-sm transition-all ease-in-out'
            key={index}>
            <Image
              src={doctor.attributes?.image?.data[0].attributes?.url}
              alt='doctor image'
              width={500}
              height={200}
              className='h-[200px] w-full object-cover rounded-lg'
              unoptimized
            />
            <div className='mt-3 items-baseline flex flex-col gap-1'>
              <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                {doctor.attributes?.category?.data?.attributes?.Name}
              </h2>
              <h2 className='font-bold text-lg'>{doctor.attributes?.Name}</h2>
              <h2 className='text-primary text-sm'>{doctor.attributes?.Experience_Year} years</h2>
              <h2 className='text-gray-500 text-sm'>{doctor.attributes?.Address}</h2>

              <Link href={'/details/' + doctor?.id} className='w-full'>
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
        ))}
      </div>
    </div>
  )
}

export default DoctorList
