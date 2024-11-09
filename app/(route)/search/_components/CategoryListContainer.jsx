import GlobalApi from "@/app/_utils/GlobalApi";
import CategoryList from "./CategoryList";

export default async function CategoryListContainer() {
  let data
  const res = await GlobalApi.getCategory()
  if (res.ok) {
    data = (await res.json()).data
  }

  return (
    <div className="md:w-2/12">
      <CategoryList categoryList={data} />
    </div>
  )
}
