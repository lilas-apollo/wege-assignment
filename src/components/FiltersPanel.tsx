/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import Select from "react-select";
import { PriceRangeSlider } from "./PriceRangeSlider";

const MIN_PRICE = 0;
const MAX_PRICE = 500;

export default function FiltersPanel({
  filters,
  setFilters,
  refresh,
  categories,
}: any) {
  const [localFilters, setLocalFilters] = useState({
    categories: filters.categories ?? [],
    priceFrom: filters.priceFrom ?? MIN_PRICE,
    priceTo: filters.priceTo ?? MAX_PRICE,
  });

  const update = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    refresh();
  };

  const clearFilters = () => {
    setLocalFilters({
      categories: [],
      priceFrom: MIN_PRICE,
      priceTo: MAX_PRICE,
    });
    setFilters({});
    refresh();
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow space-y-6">
      <h2 className="font-semibold text-gray-800 text-lg">Filters</h2>
      <div className="flex xl:flex-col md:flex-row flex-col gap-2">
        {/* CATEGORIES MULTI-SELECT  */}
        <div className="space-y-2 xl:w-full md:w-1/2 w-full">
          <label className="text-sm font-medium text-gray-700">
            Categories
          </label>

          <div className="space-y-1">
            <Select
              options={categories}
              placeholder="Select category"
              isMulti
              value={localFilters.categories.map((label: string) => {
                const option = categories.find((c: any) => c.label === label);
                return { value: option?.value ?? label, label };
              })}
              onChange={(selected) =>
                update(
                  "categories",
                  selected ? selected.map((x: any) => x.label) : []
                )
              }
              classNames={{
                control: () =>
                  "border rounded-md px-1 py-0.5 focus:ring-1 focus:ring-violet-300 outline-none shadow-none",
                placeholder: () => "text-gray-300",
                input: () => "text-gray-700",
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "lab(90.952% -.0000596046 0)",

                  ":hover": { borderColor: "#c4b4ff", borderWidth: "2px" },
                  boxShadow: "none",
                  borderRadius: "8px",
                }),
              }}
            />
          </div>
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="space-y-3 ">
        <label className="text-sm font-medium text-gray-700">Price Range</label>

        <PriceRangeSlider
          value={[localFilters.priceFrom, localFilters.priceTo]}
          min={0}
          max={500}
          step={5}
          onChange={([from, to]) => {
            update("priceFrom", from);
            update("priceTo", to);
          }}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-3">
        <button
          onClick={applyFilters}
          className="flex-1 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white cursor-pointer md:text-base text-sm"
        >
          Apply
        </button>

        <button
          onClick={clearFilters}
          className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer md:text-base text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
