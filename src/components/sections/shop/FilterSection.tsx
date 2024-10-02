"use client";
import { ChangeEvent, useState } from "react";
import { changeFilter, clearFilter } from "@/redux/slices/filters";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import ClearIcon from "@mui/icons-material/Clear";
import { Input } from "@/components/common/Input";
import { Dropdown } from "@/components/common/Dropdown";
import { Button } from "@/components/common/Button";

export const FilterSection: React.FC = () => {
  const filters = useAppSelector((st) => st.filters);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    const syntheticEvent = { target: { name: "category", value } };
    handleChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
  };

  const handleClearFilters = () => {
    dispatch(clearFilter());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <section className="w-full flex flex-row md:flex-col gap-5">
      <h3 className="capitalize text-white text-xl py-4">
        search
        <div className="group/searchbar hidden w-full h-12 md:flex justify-center items-center relative">
          <Input
            labelProps={{ htmlFor: "search" }}
            inputProps={{
              type: "text",
              id: "search",
              name: "search",
              placeholder: "search...",
              value: filters.search,
              onChange: handleChange,
              className: `w-full h-full px-4 outline-none text-white bg-black/0 cursor-text border-b border-white/50
              duration-300
              placeholder:uppercase group-hover/searchbar:bg-black/100 group-focus/searchbar:bg-black/100`,
            }}
          >
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {filters.search && (
                <ClearIcon
                  fontSize="small"
                  className="text-white/65 duration-300 rounded-full cursor-pointer
                   hover:text-white/100"
                  onClick={() => dispatch(changeFilter({ search: "" }))}
                />
              )}
            </div>
          </Input>
        </div>
      </h3>

      <h3 className="capitalize text-white text-xl py-4">
        browse by
        <div className="w-full">
          <Dropdown
            name={filters.category || "Categories"}
            items={[
              <div
                className="capitalize"
                onClick={() => {
                  handleSelect("");
                }}
              >
                all categories
              </div>,
              <div
                className="capitalize"
                onClick={() => {
                  handleSelect("medkits");
                }}
              >
                medkits
              </div>,
              <div
                className="capitalize"
                onClick={() => {
                  handleSelect("backpacks");
                }}
              >
                backpacks
              </div>,
            ]}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
          />
        </div>
      </h3>

      <Button
        buttonProps={{
          className: `w-full border-white border-2 px-10 py-2 mb-10 
            text-white/100 text-xl capitalize duration-300 hover:text-white/75`,
          onClick: handleClearFilters,
          type: "button",
        }}
      >
        clear filters
      </Button>
    </section>
  );
};