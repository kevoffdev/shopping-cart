import { Product } from "../types";
import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";

import CardProduct from "./CardProduct";

export const Products = () => {
  const { filterProducts } = useFilter();
  const { cart } = useCart();

  const checkProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {filterProducts().map((product) => {
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
