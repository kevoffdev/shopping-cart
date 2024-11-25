import { Filters } from "@/components/Filters";
import { Products } from "@/components/Products";
import { useFilter } from "@/hooks/useFilter";
import Layout from "@/layout/Layout";

export const Home = () => {
  const { products } = useFilter();

  return (
    <Layout>
      <Filters />
      {products ? <Products /> : <div>loading...</div>}
    </Layout>
  );
};
