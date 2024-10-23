"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "@/hooks/redux";
import { addSingleProduct } from "@/redux/slices/singleProduct";

import ProductSlider from "@/components/sections/single product/ProductSlider";
import { MainInfo } from "@/components/sections/single product/MainInfo";
import { Reviews } from "@/components/sections/single product/Reviews";
import { MightLike } from "@/components/sections/single product/MightLike";
import { Breadcrumb } from "@/components/common/Breadcrumb";

import { breadcrumbIcon } from "../../../../public/static/breadcrumbIcon";

// TODO: replace with default global values
const lng = "en";

export default function SingleProduct({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: [params.id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/shop/${params.id}`);

        dispatch(addSingleProduct(response.data));

        return response.data;
      } catch (error) {
        dispatch(addSingleProduct(null));
      }
    },
  });

  // Handle loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product data</div>;

  return (
    <>
      <main className="flex flex-col pt-[164px] md:pt-[7.5rem] pb-2 px-2 sm:px-8 md:px-40 xl:px-80 bg-black">
        {/* breadcrumbs */}
        <div className="w-auto h-max pt-5 mb-10">
          <Breadcrumb
            crumbs={[
              {
                name: "home",
                href: "/",
              },
              {
                name: "shop",
                href: "/shop",
                svg: breadcrumbIcon,
              },
              {
                name: product?.name || "product's name",
                href: `/shop/${params.id}`,
                svg: breadcrumbIcon,
              },
            ]}
          />
        </div>

        {/* main information */}
        <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 mb-10">
          {/* pictures */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 text-white">
            <ProductSlider
              slides={product.imageUrls}
              description={product.description[lng]}
            />
          </div>

          {/* oderding information */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 text-white">
            <MainInfo />
          </div>
        </div>

        {/* reviews block */}
        <Reviews />
      </main>

      {/* might like section */}
      <MightLike />
    </>
  );
}
