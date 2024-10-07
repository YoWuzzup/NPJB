import React from "react";

import Slider from "@/components/common/Slider";

export default function ProductSlider() {
  return (
    <>
      <Slider
        slides={[
          { src: "/static/Tactical Backpack.jpg", alt: "1" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
        ]}
        swiperOptions={{
          loop: false,
          navigation: false,
          className: "w-full border border-white/25",
        }}
        secondSlides={[
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
        ]}
        secondSwiperOptions={{ spaceBetween: 0, className: "w-full" }}
      />

      <p className="w-full text-justify">
        I&apos;m a product description. This is a great place to "sell" your
        product and grab buyers&apos; attention. Describe your product clearly
        and concisely. Use unique keywords. Write your own description instead
        of using manufacturers&apos; copy.
      </p>
    </>
  );
}
