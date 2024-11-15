import GlobalApi from '@/app/_utils/GlobalApi';
import ServiceDetail from '../_components/ServiceDetail';

export default async function Page({ params }) {
  const email = (await params).email
  let data
  const res = await GlobalApi.getServiceByEmail(email)
  if (res.ok) {
    data = (await res.json()).data
  }

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          <ServiceDetail service={data} email={decodeURIComponent(email)} />
        </div>
      </div>
    </div>
  )
}
