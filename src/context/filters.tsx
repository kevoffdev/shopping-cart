import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

import { getProducts } from "../services/api";
import { OptionCategorie, Product } from "../types";
import { getMinMaxPrice } from "../helpers/getMinMaxPrice";

interface FiltersProps {
  price: number;
  minPrice: number;
  maxPrice: number;
  categorie: string;
}

interface FilterContextProps {
  products: Product[] | null;
  filters: FiltersProps;
  setFilters: Dispatch<SetStateAction<FiltersProps>>;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
}

const initialFilterContext: FilterContextProps = {
  products: null,
  filters: {
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    categorie: OptionCategorie.All,
  },
  setFilters: () => {},
  setProducts: () => {},
};

export const FiltersContext = createContext<FilterContextProps>(initialFilterContext);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<null | Product[]>(null);
  const [filters, setFilters] = useState<FiltersProps>(initialFilterContext.filters);

  useEffect(() => {
    getProducts().then((resp) => {
      setProducts(resp);
      const prices = getMinMaxPrice(resp);

      setFilters({
        price: prices.maxPrice / 2,
        minPrice: prices.minPrice,
        maxPrice: prices.maxPrice,
        categorie: OptionCategorie.All,
      });
    });
  }, []);

  useEffect(() => {
    if (products === null) return;
    const { maxPrice, minPrice } = getMinMaxPrice(
      products.filter(
        (product) =>
          product.category === filters.categorie || filters.categorie === OptionCategorie.All,
      ),
    );

    setFilters({ ...filters, maxPrice, minPrice, price: maxPrice });
  }, [filters.categorie]);

  return (
    <FiltersContext.Provider value={{ products, filters, setFilters, setProducts }}>
      {children}
    </FiltersContext.Provider>
  );
}
