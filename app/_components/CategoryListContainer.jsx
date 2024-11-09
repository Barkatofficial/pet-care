import GlobalApi from "../_utils/GlobalApi";
import CategorySearch from "./CategorySearch";

export default async function CategoryListContainer() {
  const response = await GlobalApi.getCategory();
  const data = response.data.data

  return (
    <CategorySearch categoryList={data} />
  );
}
