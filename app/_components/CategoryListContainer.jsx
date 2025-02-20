import GlobalApi from "../_utils/GlobalApi";
import CategorySearch from "./CategorySearch";

export default async function CategoryListContainer() {
  let data = null;
  // const res = await GlobalApi.getCategory()
  // if (res.ok) {
  //   data = (await res.json()).data
  // }

  return <CategorySearch categoryList={data} />;
}
