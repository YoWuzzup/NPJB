"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addSingleProduct } from "@/redux/slices/singleProduct";

import ProductSlider from "@/components/sections/single product/ProductSlider";
import { MainInfo } from "@/components/sections/single product/MainInfo";
import { Reviews } from "@/components/sections/single product/Reviews";
import { MightLike } from "@/components/sections/single product/MightLike";
import { Breadcrumb } from "@/components/common/Breadcrumb";

import { breadcrumbIcon } from "../../../../public/static/breadcrumbIcon";

export default function SingleProduct({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((st) => st.globals.language);

  const product = useQuery({
    queryKey: [params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/shop/${params.id}`);

      dispatch(addSingleProduct(response.data));

      return response.data;
    },
  });

  const similarProducts = useQuery({
    queryKey: [
      product?.data?.category,
      product?.data?.subCategory,
      product?.data?.tags,
    ],
    queryFn: async () => {
      const response = await axios.get(`/api/shop/${params.id}/similar`);

      return response.data;
    },
  });

  if (product.isLoading)
    return (
      <main className="w-full h-screen grid place-items-center pt-[164px] md:pt-[7.5rem] pb-2 bg-black">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </main>
    );

  if (product.error) {
    return (
      <main className="w-full h-screen grid place-items-center pt-[164px] md:pt-[7.5rem] pb-2 bg-black">
        <div role="status">
          <span className="sr-only">Something went wrong</span>
          <div className="text-white">
            Something went wrong, try again later...
          </div>
        </div>
      </main>
    );
  }

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
                name: product?.data?.name || "product's name",
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
              slides={product?.data?.imageUrls || []}
              description={product?.data?.description[currentLanguage] || ""}
            />
          </div>

          {/* oderding information */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 text-white">
            <MainInfo
              name={product?.data?.name}
              length={product?.data?.ratingLength}
              average={product?.data?.averageRating || 5}
              discount={product?.data?.discount || 0}
              price={product?.data?.price}
              returnPolicy={product?.data?.returnPolicy}
              specifications={product?.data?.specifications || []}
            />
          </div>
        </div>

        {/* reviews block */}
        <Reviews
          length={product?.data?.ratingLength}
          average={product?.data?.averageRating || 5}
        />
      </main>

      {/* might like section */}
      <MightLike similarProducts={similarProducts.data} />
    </>
  );
}
