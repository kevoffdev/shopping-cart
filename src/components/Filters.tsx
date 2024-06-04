import { OptionCategorie } from "../types";
import { useFilter } from "../hooks/useFilter";

export const Filters = () => {
  const { filters, categories, setFilters } = useFilter();

  const onChangeSelectedCategorie = (value: string | OptionCategorie) => {
    setFilters({ ...filters, categorie: value });
  };
  const onChangePrice = (value: number) => {
    setFilters({ ...filters, price: value });
  };

  return (
    <div className="flex justify-between mb-3">
      <div className="relative w-52">
        <label htmlFor="labels-range-input">Precio: ${filters.price}</label>
        <input
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          id="labels-range-input"
          max={filters.maxPrice}
          min={filters.minPrice}
          type="range"
          value={filters.price}
          onChange={(e) => onChangePrice(Number(e.target.value))}
        />
        <div className="flex justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">
            Min (${filters.minPrice})
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">
            Max (${filters.maxPrice})
          </span>
        </div>
      </div>
      <div>
        <p>Categories: </p>
        <select
          className="border border-white"
          value={filters.categorie}
          onChange={(e) => onChangeSelectedCategorie(e.target.value)}
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
