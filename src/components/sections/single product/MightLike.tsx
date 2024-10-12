import Slider from "@/components/common/Slider";
import { FC } from "react";
import { Navigation } from "swiper/modules";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// TODO: fetch items
export const MightLike: FC = () => {
  const items = [1, 2, 3, 4, 5];

  return (
    <div className="w-full flex flex-col text-white bg-black py-9">
      <h2 className="capitalize w-full text-center font-bold text-2xl mb-9">
        you might also like
      </h2>

      <Slider
        slides={[
          { src: "/static/Tactical Backpack.jpg", alt: "1" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
          { src: "/static/Tactical Backpack.jpg", alt: "2" },
        ]}
        swiperOptions={{
          slidesPerView: 5,
          spaceBetween: 30,
          className: "w-8/12",
          wrapperClass: "w-full",
          navigation: {
            nextEl: ".my-custom-next",
            prevEl: ".my-custom-prev",
          },
        }}
      >
        <div className="my-custom-next">Next</div>
        <div className="my-custom-prev">Previous</div>
      </Slider>
    </div>
  );
};
