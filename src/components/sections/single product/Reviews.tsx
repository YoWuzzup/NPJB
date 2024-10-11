import { FC } from "react";

import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/common/Button";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

// TODO: fetch reviews statistics
export const Reviews: FC = () => {
  const reviews = [5, 4, 5, 5];

  return (
    <div className="w-full flex flex-col text-white">
      {/* all reviews statistics */}
      <div className="flex flex-row justify-between w-full py-10 border-b border-b-white/60">
        {/* left side of statistics */}
        <div className="flex flex-col items-start gap-4 w-1/2">
          <h2 className="capitalize text-2xl font-semibold">reviews</h2>
          <Rating data={reviews} />
          <div className="first-letter:uppercase">
            based on {reviews.length} reviews
          </div>
          {/* TODO: make handleClick to write a review */}
          <Button
            buttonProps={{
              className:
                "w-[260px] h-[50px] capitalize text-xl border grow hover:text-white/25 duration-300",
            }}
          >
            leave a review
          </Button>
        </div>

        {/* right side of statistics */}
        <div className="w-1/2 flex flex-col-reverse items-start justify-center gap-4">
          {[1, 2, 3, 4, 5].map((n, i) => {
            const lineWidth = `${n * 10}%`;

            return (
              <div
                key={`${n}_${i}`}
                className="w-full flex flex-row items-center flex-nowrap"
              >
                <div className="w-1/6 text-right">
                  {n} star{n !== 1 && "s"}
                </div>

                <div className={`w-4/6 bg-white/20 h-2 mx-2 relative`}>
                  <div
                    className="h-full absolute inset-0 bg-white/100"
                    style={{ width: lineWidth }}
                  ></div>
                </div>

                <div className="w-1/6 text-left">{4}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* list of reviews */}
      <div className="flex flex-col w-full justify-center items-center">
        {reviews.map((r, i) => (
          <div
            key={`${r}_${i}`}
            className="w-full border-b border-b-white/60 py-6 flex flex-col gap-5"
          >
            <div className="w-full flex flex-row items-start gap-7 capitalize">
              Ava Horvard
              <span className="capitalize grow relative before:absolute before:content-[''] before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-white">
                Apr 25, 2022
              </span>
            </div>

            <Rating data={reviews} />

            <div className="w-full">
              <h3 className="font-bold text-xl mb-4 first-letter:uppercase">
                header
              </h3>
              <p className="first-letter:uppercase">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                pariatur harum perspiciatis quod dolore, officiis dolor vero
                quae nesciunt, voluptate natus veniam, assumenda minima! Minima
                ipsum deserunt quasi doloribus eaque.
              </p>
            </div>

            <div className="flex flex-row items-center gap-5">
              Was this helpful?
              <span className="flex items-center cursor-pointer">
                <ThumbUpOffAltIcon className="mr-3" />
                Yes (1)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
