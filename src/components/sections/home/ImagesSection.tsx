"use client";
import Link from "next/link";
import { useRef } from "react";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export const ImagesSection: React.FC = () => {
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const caterories = ["backpacks", "medkits", "backpacks"];

  const handleClick = () => {
    if (targetSectionRef.current) {
      targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full flex flex-col md:flex-row flex-wrap">
      {/* first image */}
      <div
        className="h-[700px] md:h-screen w-full relative bg-cover bg-center"
        style={{ backgroundImage: "url('/static/Tactical-Backpack.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
          <h1 className="uppercase text-white text-lg sm:text-6xl font-bold font-serif text-center">
            PLAN YOUR ADVENTURE
          </h1>

          <Link
            href={"/shop"}
            className="border-white border-2 px-10 py-2 mb-10 text-white text-lg sm:text-2xl uppercase duration-300 hover:text-black bg-white/0 hover:bg-white/100"
          >
            shop now
          </Link>

          <div className="text-white cursor-pointer" onClick={handleClick}>
            <KeyboardArrowDownOutlinedIcon style={{ fontSize: "60px" }} />
          </div>
        </div>
      </div>

      {/* second image */}
      <div
        ref={targetSectionRef}
        className="h-[400px] md:h-[700px] w-full md:w-1/2 relative bg-black bg-cover bg-center"
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
          <h1 className="uppercase text-white text-center text-lg md:text-6xl font-normal font-serif">
            NEW ARRIVALS
          </h1>

          <Link
            href={"/shop"}
            className="border-white border-2 px-10 py-2 mb-10 text-white text-lg sm:text-2xl uppercase duration-300 hover:text-black bg-white/0 hover:bg-white/100"
          >
            shop now
          </Link>
        </div>
      </div>

      {/* third image */}
      <div
        className="hidden md:block h-[700px] w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/static/Tactical-Backpack.jpg')" }}
      ></div>

      {/* fourth image */}
      <div className="group/fourth h-[385px] w-full md:w-1/3 relative overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center scale-100 group-hover/fourth:scale-110 duration-500"
          style={{ backgroundImage: "url('/static/Tactical-Backpack.jpg')" }}
        />
        <Link href={`/shop?category=${caterories[0]}`}>
          <div
            className="w-full h-full absolute top-0 left-0 bg-black/0 group-hover/fourth:bg-black/70 duration-500 
          place-content-center text-center uppercase text-white/0 group-hover/fourth:text-white/100 font-bold text-2xl"
          >
            {caterories[0]}
          </div>
        </Link>
      </div>

      {/* fifth image */}
      <div className="group/fifth h-[385px] w-full md:w-1/3 relative overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center scale-100 group-hover/fifth:scale-110 duration-500"
          style={{ backgroundImage: "url('/static/Tactical-Backpack.jpg')" }}
        />
        <Link href={`/shop?category=${caterories[1]}`}>
          <div
            className="w-full h-full absolute top-0 left-0 bg-black/0 group-hover/fifth:bg-black/70 duration-500 
          place-content-center text-center uppercase text-white/0 group-hover/fifth:text-white/100 font-bold text-2xl"
          >
            {caterories[1]}
          </div>
        </Link>
      </div>

      {/* sixth image */}
      <div className="group/sixth h-[385px] w-full md:w-1/3 relative overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center scale-100 group-hover/sixth:scale-110 duration-500"
          style={{ backgroundImage: "url('/static/Tactical-Backpack.jpg')" }}
        />
        <Link href={`/shop?category=${caterories[2]}`}>
          <div
            className="w-full h-full absolute top-0 left-0 bg-black/0 group-hover/sixth:bg-black/70 duration-500 
          place-content-center text-center uppercase text-white/0 group-hover/sixth:text-white/100 font-bold text-2xl"
          >
            {caterories[2]}
          </div>
        </Link>
      </div>
    </section>
  );
};
