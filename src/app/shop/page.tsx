"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { addProducts } from "@/redux/slices/products";
import { useAppDispatch } from "@/hooks/redux";

import { BreadcrumbsShopSection } from "@/components/sections/shop/BreadcrumbsShopSection";
import { FilterSection } from "@/components/sections/shop/FilterSection";
import { ShopResultSection } from "@/components/sections/shop/ShopResultSection";

export default function Shop() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const searchParams = params.get("search");
  const categoryParams = params.get("category");

  const { isError, isLoading } = useQuery({
    queryKey: [searchParams, categoryParams],
    queryFn: async () => {
      const queryParams = {
        search: searchParams,
        category: categoryParams,
      };

      const response = await axios.get("/api/shop", { params: queryParams });

      dispatch(addProducts(response.data));

      return response.data;
    },
  });

  return (
    <main className="min-h-screen flex flex-row flex-wrap justify-between gap-7 content-start items-start pt-[164px] md:pt-[7.5rem] pb-20 px-2 sm:px-8 md:px-14 bg-black">
      {/* breadcrumbs */}
      <div className="w-full h-max pt-5">
        <BreadcrumbsShopSection />
      </div>

      {/* filter side */}
      <div className="w-full md:w-3/12 flex-none">
        <FilterSection />
      </div>

      {/* products' side */}
      <div className="flex-1">
        <ShopResultSection isError={isError} isLoading={isLoading} />
      </div>
    </main>
  );
}
