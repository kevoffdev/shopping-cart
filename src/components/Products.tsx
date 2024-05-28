import { useState } from "react";

import { OptionCategorie, Product } from "../types";
import { getMinMaxPrice } from "../helpers/getMinMaxPrice";

import { Filters } from "./Filters";
import { AddToCartIcon } from "./Icon";

export const Products = ({ products }: { products: Product[] }) => {
  const prices = getMinMaxPrice(products);
  const [price, setPrice] = useState(Math.floor(prices.maxPrice / 2));
  const [selectedCategorie, setSelectedCategorie] = useState<string | OptionCategorie>(
    OptionCategorie.All,
  );
  const onChangeSelectedCategorie = (value: string | OptionCategorie) => {
    setSelectedCategorie(value);
  };
  const onChangePrice = (value: number) => {
    setPrice(value);
  };

  const newProducts = products.filter((product) => {
    return (
      product.price <= price &&
      (selectedCategorie === product.category || selectedCategorie === OptionCategorie.All)
    );
  });

  return (
    <main className="my-4">
      <Filters
        price={price}
        products={products}
        selectedCategorie={selectedCategorie}
        onChangeCategorie={onChangeSelectedCategorie}
        onChangePrice={onChangePrice}
      />
      <section className="grid grid-cols-4 gap-4">
        {newProducts.map((product) => {
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
              </div>
              <div className="text-center">
                <button className="p-3 my-2 bg-gray-700 rounded-lg">{<AddToCartIcon />}</button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};
