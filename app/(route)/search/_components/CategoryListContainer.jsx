import GlobalApi from "@/app/_utils/GlobalApi";
import CategoryList from "./CategoryList";

export default async function CategoryListContainer() {
  const response = await GlobalApi.getCategory();
  const data = response?.data?.data || [];

  return (
    <div className="w-2/12">
      <CategoryList categoryList={data} />
    </div>
  );
}
