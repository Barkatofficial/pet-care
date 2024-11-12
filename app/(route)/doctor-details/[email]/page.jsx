import GlobalApi from '@/app/_utils/GlobalApi';
import DoctorDetail from '../_components/DoctorDetail';

export default async function Page({ params }) {
  const email = (await params).email
  let data
  const res = await GlobalApi.getDoctorByEmail(email)
  if (res.ok) {
    data = (await res.json()).data
  }

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          <DoctorDetail doctor={data} email={email} />
        </div>
      </div>
    </div>
  )
}
