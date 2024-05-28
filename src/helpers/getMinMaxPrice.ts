import { Product } from "../types";

export function getMinMaxPrice(products: Product[]) {
  let minPrice = products[0].price;
  let maxPrice = products[0].price;

  for (const iterator of products) {
    minPrice = Math.min(minPrice, iterator.price);
    maxPrice = Math.max(maxPrice, iterator.price);
  }

  return { minPrice, maxPrice };
}
