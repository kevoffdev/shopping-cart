import { Product } from "../types";
import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";

import { Filters } from "./Filters";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";

export const Products = () => {
  const { filterProducts } = useFilter();
  const { cart, quantity, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className="my-4">
      <Filters />
      <section className="grid grid-cols-4 gap-4">
        {filterProducts().map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <article
              key={product.id}
              className="flex flex-col justify-between overflow-hidden bg-zinc-950 rounded-xl"
            >
              <img
                alt={product.title}
                className="block object-cover w-full bg-gray-700"
                src={product.thumbnail}
              />
              <div className="px-2 mt-2 text-center">
                <strong className="opacity-90">
                  {product.title} - ${product.price}
                </strong>
                <p>
                  Quantity:{" "}
                  {quantity[product.id] > 0 ? product.stock - quantity[product.id] : product.stock}
                </p>
              </div>
              <div className="text-center">
                <button
                  className={`p-3 my-2 bg-gray-700 rounded-xl ${isProductInCart ? "hover:text-red-400" : "hover:text-green-400"} transition`}
                  onClick={
                    isProductInCart ? () => removeFromCart(product.id) : () => addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};
