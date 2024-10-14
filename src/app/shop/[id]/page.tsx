import { Breadcrumb } from "@/components/common/Breadcrumb";

import { breadcrumbIcon } from "../../../../public/static/breadcrumbIcon";
import ProductSlider from "@/components/sections/single product/ProductSlider";
import { MainInfo } from "@/components/sections/single product/MainInfo";
import { Reviews } from "@/components/sections/single product/Reviews";
import { MightLike } from "@/components/sections/single product/MightLike";

export default async function SingleProduct() {
  return (
    <>
      <main className="flex flex-col pt-[164px] md:pt-[7.5rem] pb-2 px-2 sm:px-8 md:px-40 xl:px-80 bg-black">
        {/* breadcrumbs and next buttons*/}
        {/* TODO: next buttons */}
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
                // TODO: need the name of product
                name: "Name",
                href: "/shop/name",
                svg: breadcrumbIcon,
              },
            ]}
          />
        </div>

        {/* main information */}
        <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 mb-10">
          {/* pictures */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 text-white">
            <ProductSlider />
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
