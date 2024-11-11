"use client";
import { FC, useRef } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "usehooks-ts";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";
import { TProductArray } from "@/lib/types";

export const MightLike: FC<{ similarProducts: TProductArray }> = ({
  similarProducts,
}) => {
  const swiperRef = useRef<SwiperCore | null>();
  const { width } = useWindowSize();

  const swiperOptions = {
    slidesPerView:
      width < 600
        ? 1
        : similarProducts?.length < 3
        ? similarProducts?.length
        : width < 1000
        ? 3
        : 5,
    navigation: similarProducts?.length >= 5,
    spaceBetween: 30,
    className: "w-full",
    onSwiper: (swiper: SwiperCore | null | undefined) => {
      swiperRef.current = swiper;
    },
  };

  if (!similarProducts || similarProducts.length < 1) return;

  return (
    <div className="w-full flex flex-col text-white bg-black py-12">
      <h2 className="capitalize w-full text-center font-bold text-2xl mb-9">
        you might also like
      </h2>

      {/* swiper */}
      <div className="w-full flex flex-row flex-nowrap justify-center items-center">
        <div
          className={`p-3 hidden sm:flex justify-center items-center w-1/12 cursor-pointer text-white/60`}
          onClick={() => swiperRef?.current?.slidePrev()}
        >
          <NavigateBeforeIcon />
        </div>

        <Swiper {...swiperOptions}>
          {similarProducts?.map((s, i) => (
            <SwiperSlide key={`${s?.name}_${i}`}>
              <Link
                href={`/shop/${s?.publicId}`}
                className="w-40 flex flex-col justify-center items-center"
              >
                <img
                  src={`${s?.thumbnail}`}
                  alt={`${s.name}`}
                  className="aspect-square object-cover"
                />
                <h3 className="mt-3">{s?.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`p-3 hidden sm:flex justify-center items-center w-1/12 cursor-pointer text-white/60`}
          onClick={() => swiperRef?.current?.slideNext()}
        >
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
};
