"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type SliderProps = {
  slides: string[];
  description: string;
};

export default function ProductSlider({ slides, description }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const options = {
    style: {
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff",
    } as React.CSSProperties,
    spaceBetween: 10,
    thumbs: { swiper: thumbsSwiper },
    modules: [FreeMode, Thumbs],
    loop: false,
    navigation: false,
    className: "w-full border border-white/25 aspect-square",
  };

  const thumbOptions = {
    onSwiper: setThumbsSwiper,
    loop: false,
    slidesPerView: slides.length,
    freeMode: true,
    watchSlidesProgress: true,
    modules: [FreeMode, Thumbs],
    spaceBetween: 0,
    className: "w-full",
  };

  return (
    <>
      {/* Main product image slider */}
      <Swiper {...options}>
        {slides && slides.length > 0 ? (
          slides.map((s, i) => (
            <SwiperSlide key={i}>
              <img
                src={s}
                alt={`slide_${i}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="grid w-full aspect-square place-items-center rounded-lg bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-1/2 w-1/2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        )}
      </Swiper>

      {/* Thumbnail slider */}
      <Swiper {...thumbOptions}>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s}
              alt={`thumb_${i}`}
              className="w-full h-full object-cover cursor-pointer aspect-square"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="w-full text-justify mt-4">{description}</p>
    </>
  );
}
