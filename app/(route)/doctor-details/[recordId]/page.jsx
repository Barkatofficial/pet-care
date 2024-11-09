import GlobalApi from '@/app/_utils/GlobalApi';
import DoctorDetail from '../_components/DoctorDetail';

export default async function Page({ params }) {
  const response = await GlobalApi.getDoctorById(params.recordId, new Date().toLocaleDateString("en-CA"))
  const doctor = response?.data?.data || null;

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
      </div>
    </div>
  )
}
