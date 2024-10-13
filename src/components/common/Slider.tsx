"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

type SliderProps = {
  slides: { src: string; alt: string }[];
  secondSlides?: { src: string; alt: string }[];
  swiperOptions?: SwiperOptions & {
    style?: React.CSSProperties;
    className?: string;
    onSwiper?: (s: any) => void;
  };
  secondSwiperOptions?: SwiperOptions & {
    style?: React.CSSProperties;
    className?: string;
  };
  children?: React.ReactNode;
};

export default function Slider({
  slides,
  secondSlides,
  swiperOptions,
  secondSwiperOptions,
  children,
}: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const defaultOptions = {
    style: {
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff",
    } as React.CSSProperties,
    loop: true,
    spaceBetween: 10,
    navigation: true,
    thumbs: { swiper: thumbsSwiper },
    modules: [FreeMode, Navigation, Thumbs],
    className: "mainSwiper",
  };

  const defaultSecondOptions = {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    modules: [FreeMode, Navigation, Thumbs],
    className: "secondSwiper",
  };

  const mergedOptions = { ...defaultOptions, ...swiperOptions };
  const mergedSecondOptions = {
    ...defaultSecondOptions,
    ...secondSwiperOptions,
  };

  return (
    <>
      {/* Main Swiper */}
      <Swiper {...mergedOptions}>
        {slides.map((s, i) => (
          <SwiperSlide key={`${s.alt}_${i}`}>
            <img src={`${s.src}`} alt={`${s.alt}`} />
          </SwiperSlide>
        ))}
        {children}
      </Swiper>

      {secondSlides && secondSlides.length > 0 && (
        //  Second Swiper (Thumbnails)
        <Swiper onSwiper={setThumbsSwiper} {...mergedSecondOptions}>
          {secondSlides.map((s, i) => (
            <SwiperSlide key={`${s.alt}_${i}`}>
              <img src={`${s.src}`} alt={`${s.alt}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
