import GlobalApi from '@/app/_utils/GlobalApi';
import ServiceDetail from '../_components/ServiceDetail';

async function Details({ params }) {
  const response = await GlobalApi.getServiceById(params.recordId, new Date().toLocaleDateString("en-CA"))
  const service = response?.data?.data || null;

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          {service && <ServiceDetail service={service} />}
        </div>
      </div>
    </div>
  )
}

export default Details;