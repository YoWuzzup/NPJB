"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { BreadcrumbsShopSection } from "@/components/sections/shop/BreadcrumbsShopSection";
import { FilterSection } from "@/components/sections/shop/FilterSection";
import { ShopResultSection } from "@/components/sections/shop/ShopResultSection";

export default function Shop() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <main className="min-h-screen flex flex-row flex-wrap justify-between gap-7 content-start items-start pt-[164px] md:pt-[7.5rem] pb-20 px-2 sm:px-8 md:px-14 bg-black">
      {/* breadcrumbs */}
      <div className="w-full h-max pt-5">
        <BreadcrumbsShopSection />
      </div>

      {/* filter side */}
      <div className="w-full md:w-2/6 lg:w-auto">
        <FilterSection />
      </div>

      {/* products' side */}
      <div className="grow">
        <ShopResultSection />
      </div>
    </main>
  );
}
