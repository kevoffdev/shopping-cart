import { Product } from "../types";

export function getCategories(products: Product[]) {
  return Array.from(new Set(products.map((product) => product.category)));
}
