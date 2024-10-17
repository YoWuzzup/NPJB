"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Input } from "@/components/common/Input";
import { Dropdown } from "@/components/common/Dropdown";
import { Button } from "@/components/common/Button";

import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export const FilterSection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQueryParamValue = searchParams.get("search") || "";
  const categoryQueryParamValue = searchParams.get("category") || "";
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterisOpen, setFilterIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleFilter = () => {
    setFilterIsOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    if (!value) {
      const params = new URLSearchParams(window.location.search);
      params.delete("category");

      router.replace(`${pathname}?${params.toString()}`);

      return;
    }

    router.replace(`${pathname}?${createQueryString("category", value)}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    router.replace(`${pathname}?${createQueryString(name, value)}`);

    if (!value) {
      const params = new URLSearchParams(window.location.search);
      params.delete(name);

      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <section className={`w-full relative`}>
      {/* close button on small devices */}
      {isClient && width < 768 ? (
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
                value: searchQueryParamValue,
                onChange: handleChange,
                className: `w-full h-full px-4 outline-none text-white bg-black/0 cursor-text border-b border-white/50
              duration-300
              placeholder:uppercase group-hover/searchbar:bg-black/100 group-focus/searchbar:bg-black/100`,
              }}
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {searchQueryParamValue && (
                  <ClearIcon
                    fontSize="small"
                    className="text-white/65 duration-300 rounded-full cursor-pointer
                   hover:text-white/100"
                    onClick={() => {
                      const params = new URLSearchParams(
                        window.location.search
                      );
                      params.delete("search");
                      router.replace(`${pathname}?${params.toString()}`);
                    }}
                  />
                )}
              </div>
            </Input>
          </div>
        </h3>

        <h3 className="capitalize text-white text-xl py-4">
          browse by
          <div className="w-full cursor-pointer">
            <Dropdown
              name={categoryQueryParamValue || "category"}
              items={[
                <div
                  className="capitalize"
                  key={1}
                  onClick={() => handleSelect("")}
                >
                  all categories
                </div>,
                <div
                  className="capitalize"
                  key={2}
                  onClick={() => handleSelect("Medical Supplies")}
                >
                  Medical Supplies
                </div>,
                <div
                  className="capitalize"
                  key={3}
                  onClick={() => handleSelect("backpacks")}
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
          className={`w-full border-white border-2 px-10 py-2 mb-10 
            text-white/100 text-xl capitalize duration-300 hover:text-white/75`}
          onClick={handleClearFilters}
          type="button"
        >
          clear filters
        </Button>
      </div>
    </section>
  );
};
