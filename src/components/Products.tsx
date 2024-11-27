import { useLocation } from "react-router";

import { Product } from "../types";
import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";

import CardProduct from "./CardProduct";

import { useDebounce } from "@/hooks/useDebounce";

export const Products = () => {
  const { filterProducts } = useFilter();
  const { cart } = useCart();
  const checkProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };
  const search = new URLSearchParams(useLocation().search).get("query");

  const searchDebounce = useDebounce(search);

  const productsFiltered = search
    ? filterProducts().filter((product) =>
        product.title.toLowerCase().includes(searchDebounce?.toLowerCase() ?? ""),
      )
    : filterProducts();

  if (productsFiltered.length === 0) {
    return (
      <div className="flex flex-col items-center h-full mt-20">
        <h2 className="flex font-bold border-b-2">Products not found</h2>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {productsFiltered.map((product) => {
        const isProductInCart = checkProductInCart(product);

        return (
          <CardProduct
            key={product.id}
            activeButton={true}
            isProductInCart={isProductInCart}
            product={product}
          />
        );
      })}
    </section>
  );
};
