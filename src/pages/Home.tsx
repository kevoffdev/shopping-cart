import { Filters } from "@/components/Filters";
import { Products } from "@/components/Products";
import { useFilter } from "@/hooks/useFilter";
import Layout from "@/layout/Layout";

export const Home = () => {
  const { products } = useFilter();

  return (
    <Layout>
      <Filters />
      {products ? (
        <Products />
      ) : (
        <div className="flex flex-col items-center h-full mt-20">
          <h2 className="flex font-bold border-b-2">Loading...</h2>
        </div>
      )}
    </Layout>
  );
};
