import { OptionCategorie, Product } from "../types";
import { getCategories } from "../helpers/getCategories";
import { getMinMaxPrice } from "../helpers/getMinMaxPrice";

interface FiltersProps {
  products: Product[];
  onChangeCategorie: (value: string) => void;
  selectedCategorie: string;
  price: number;
  onChangePrice: (value: number) => void;
}

export const Filters = ({
  products,
  onChangeCategorie,
  selectedCategorie,
  price,
  onChangePrice,
}: FiltersProps) => {
  const { minPrice, maxPrice } = getMinMaxPrice(products);
  const categories = getCategories(products);

  return (
    <div className="flex justify-between mb-3">
      <div className="relative w-52">
        <label className="" htmlFor="labels-range-input">
          Precio: ${price}
        </label>
        <input
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          id="labels-range-input"
          max={maxPrice}
          min={minPrice}
          type="range"
          value={price}
          onChange={(e) => onChangePrice(Number(e.target.value))}
        />
        <div className="flex justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">
            Min (${minPrice})
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">
            Max (${maxPrice})
          </span>
        </div>
      </div>
      <div>
        <p>Categories: </p>
        <select
          className="border border-white"
          value={selectedCategorie}
          onChange={(e) => onChangeCategorie(e.target.value)}
        >
          <option value={OptionCategorie.All}>{OptionCategorie.All}</option>
          {categories.map((categorie) => {
            return (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
