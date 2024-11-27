import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { OptionCategorie } from "../types";
import { useFilter } from "../hooks/useFilter";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Slider } from "@/ui/slider";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export const Filters = () => {
  const [search, setSearch] = useState(
    new URLSearchParams(useLocation().search).get("query") ?? "",
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = (value: string) => {
    setSearch(value);
    value ? navigate(`${pathname}?query=${value}`) : navigate(pathname);
  };

  return (
    <div className="flex flex-col justify-between gap-4 mb-4 sm:flex-row">
      <SliderPrice />
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search products"
          type="search"
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </div>
      <SelectCategories />
    </div>
  );
};

const SliderPrice = () => {
  const { filters, setFilters } = useFilter();

  const onChangePrice = (value: number) => {
    setFilters({ ...filters, price: value });
  };

  return (
    <div className="relative">
      <div>
        <span className="font-semibold">Price: ${filters.price}</span>
        <Slider
          className="py-2"
          max={filters.maxPrice}
          min={filters.minPrice}
          step={1}
          value={[filters.price]}
          onValueChange={(e) => onChangePrice(e[0])}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Min (${filters.minPrice})</span>
        <span className="text-sm text-muted-foreground">Max (${filters.maxPrice})</span>
      </div>
    </div>
  );
};

const SelectCategories = () => {
  const { filters, categories, setFilters } = useFilter();
  const onChangeSelectedCategorie = (value: string | OptionCategorie) => {
    setFilters({ ...filters, categorie: value });
  };

  return (
    <Select onValueChange={(e) => onChangeSelectedCategorie(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Products" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={OptionCategorie.All}>{OptionCategorie.All}</SelectItem>
        {categories.map((categorie) => {
          return (
            <SelectItem key={categorie} value={categorie}>
              {categorie}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
