"use client";
import { FC, useRef } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useWindowSize } from "usehooks-ts";

const slides = [
  { src: "/static/Tactical Backpack.jpg", alt: "1" },
  { src: "/static/Tactical Backpack.jpg", alt: "2" },
  { src: "/static/Tactical Backpack.jpg", alt: "3" },
  { src: "/static/Tactical Backpack.jpg", alt: "4" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
  { src: "/static/Tactical Backpack.jpg", alt: "5" },
];

// TODO: fetch items
export const MightLike: FC = () => {
  const swiperRef = useRef<SwiperCore | null>();
  const { width } = useWindowSize();

  const swiperOptions = {
    slidesPerView: width < 600 ? 1 : width < 1000 ? 3 : 5,
    spaceBetween: 30,
    className: "w-[80%]",
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper;
    },
  };

  return (
    <div className="w-full flex flex-col text-white bg-black py-9">
      <h2 className="capitalize w-full text-center font-bold text-2xl mb-9">
        you might also like
      </h2>

      {/* swiper */}
      <div className="w-full relative">
        <Swiper {...swiperOptions}>
          {slides.map((s, i) => (
            <SwiperSlide key={`${s.alt}_${i}`}>
              <img src={`${s.src}`} alt={`${s.alt}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`absolute p-3 top-1/2 -translate-y-1/2 left-20 cursor-pointer text-white/60`}
          onClick={() => swiperRef?.current?.slidePrev()}
        >
          <NavigateBeforeIcon />
        </div>
        <div
          className={`absolute p-3 top-1/2 -translate-y-1/2 right-20 cursor-pointer text-white/60`}
          onClick={() => swiperRef?.current?.slideNext()}
        >
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
};
