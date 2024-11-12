import GlobalApi from '@/app/_utils/GlobalApi';
import DoctorList from '@/app/_components/DoctorList';
import ServiceList from '@/app/_components/ServiceList';

export default async function Page({ params }) {
  const { id, name } = await params
  const selectedCategory = decodeURI(name)
  let data

  const getDoctorList = async () => {
    const res = await GlobalApi.getDoctorList()
    if (res.ok) {
      data = (await res.json()).data
    }
  }

  const getServiceByCategory = async (category_id) => {
    const res = await GlobalApi.getServiceByCategory(category_id)
    if (res.ok) {
      data = (await res.json()).data
    }
  }
  selectedCategory === 'Vet Doctor' ? await getDoctorList() : await getServiceByCategory(id)

  return (
    <>
      {selectedCategory === 'Vet Doctor' ? (
        <DoctorList list={data} />
      ) : (
        <ServiceList list={data} />
      )}
    </>
  )
}
