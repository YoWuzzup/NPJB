import { FC } from "react";

import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/common/Button";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { TReviewArray } from "@/lib/types";

export const Reviews: FC<{
  length: number;
  average: number;
  reviews: TReviewArray;
}> = ({ length, average, reviews }) => {
  return (
    <div className="w-full flex flex-col text-white">
      {/* all reviews statistics */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between w-full py-10 border-b border-b-white/60">
        {/* left side of statistics */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4">
          <h2 className="capitalize text-2xl font-semibold">reviews</h2>
          <Rating length={length} average={average} />
          <div className="first-letter:uppercase">
            based on {length} review{length === 1 || "s"}
          </div>
          {/* TODO: make handleClick to write a review */}
          <Button className="w-[200px] md:w-[260px] h-[50px] capitalize text-xl border hover:text-white/25 duration-300">
            leave a review
          </Button>
        </div>

        {/* right side of statistics */}
        <div className="w-full md:w-1/2 flex flex-col-reverse items-start justify-center gap-4">
          {[1, 2, 3, 4, 5].map((n, i) => {
            const amount = reviews.reduce(
              (acc, curr) => (curr.rating === n ? acc + 1 : acc),
              0
            );
            const lineWidth = length > 0 ? `${(amount / length) * 100}%` : "0%";

            return (
              <div
                key={`${n}_${i}`}
                className="w-full flex flex-row items-center justify-center flex-nowrap"
              >
                <div className="w-2/12 md:w-3/12 text-right">
                  {n} star{n === 1 || "s"}
                </div>

                <div className={`w-4/6 bg-white/20 h-2 mx-2 relative`}>
                  <div
                    className="h-full absolute inset-0 bg-white/100"
                    style={{ width: lineWidth }}
                  ></div>
                </div>

                <div className="w-1/12 text-left">{amount}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* list of reviews */}
      <div className="flex flex-col w-full justify-center items-center">
        {reviews.map((r, i) => {
          const date = typeof r.date === "string" ? new Date(r.date) : r.date;
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const fullDate = `${day} / ${month} / ${year}`;

          return (
            <div
              key={`${r}_${i}`}
              className="w-full border-b border-b-white/60 py-6 flex flex-col gap-5"
            >
              <div className="w-full flex flex-row items-start gap-7 capitalize">
                {r.author || "unknown author"}
                <span className="capitalize grow relative before:absolute before:content-[''] before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-white">
                  {fullDate}
                </span>
              </div>

              <Rating average={r.rating} />

              <div className="w-full">
                <h3 className="font-bold text-xl mb-4 first-letter:uppercase">
                  {r.header}
                </h3>
                <p className="first-letter:uppercase text-justify">
                  {r.message}
                </p>
              </div>

              {/* TODO: likes button */}
              <div className="flex flex-row items-center gap-5">
                Was this helpful?
                <span className="flex items-center cursor-pointer">
                  <ThumbUpOffAltIcon className="mr-3" />
                  Yes {r.liked ? `( ${r.liked} )` : ``}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
