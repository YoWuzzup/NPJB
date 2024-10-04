"use client";
import { ChangeEvent, useState } from "react";
import { changeFilter, clearFilter } from "@/redux/slices/filters";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useWindowSize } from "usehooks-ts";

import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Input } from "@/components/common/Input";
import { Dropdown } from "@/components/common/Dropdown";
import { Button } from "@/components/common/Button";

export const FilterSection: React.FC = () => {
  const filters = useAppSelector((st) => st.filters);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterisOpen, setFilterIsOpen] = useState<boolean>(true);

  const toggleFilter = () => {
    setFilterIsOpen((prev) => !prev);
  };

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
    <section className={`w-full relative`}>
      {/* sclose button on small devices */}
      {width < 768 ? (
        <div
          className={`absolute right-0 top-5 aspect-square w-10 text-white`}
          onClick={toggleFilter}
        >
          {filterisOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      ) : null}

      <div
        className={`w-full flex flex-col gap-5 duration-300 overflow-hidden md:h-auto ${
          filterisOpen ? "h-[350px]" : "h-[40px]"
        }`}
      >
        <h3 className="capitalize text-white text-xl py-4">
          search
          <div className="group/searchbar w-full h-12 flex justify-center items-center relative">
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
                  key={1}
                  onClick={() => {
                    handleSelect("");
                  }}
                >
                  all categories
                </div>,
                <div
                  className="capitalize"
                  key={2}
                  onClick={() => {
                    handleSelect("medkits");
                  }}
                >
                  medkits
                </div>,
                <div
                  className="capitalize"
                  key={3}
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
      </div>
    </section>
  );
};
