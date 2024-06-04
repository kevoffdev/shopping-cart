import { useContext } from "react";

import { FiltersContext } from "../context/filters";
import { OptionCategorie } from "../types";
import { getCategories } from "../helpers/getCategories";

export function useFilter() {
  const { products, filters, setFilters } = useContext(FiltersContext);

  const categories = products ? getCategories(products) : [];

  const filterProducts = () => {
    if (!products) return [];
    const data =
      products === null
        ? []
        : products.filter((product) => {
            return (
              product.price <= filters.price &&
              (filters.categorie === product.category || filters.categorie === OptionCategorie.All)
            );
          });

    return data;
  };

  return { products, filters, setFilters, filterProducts, categories };
}
