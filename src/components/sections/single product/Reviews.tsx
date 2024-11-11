import { FC, useRef, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/common/Button";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { WriteReview } from "./WriteReview";
import { updateReviews } from "@/redux/slices/singleProduct";
import { TReview } from "@/lib/types";

export const Reviews: FC<{
  length: number;
  average: number;
}> = ({ length, average }) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((st) => st?.singleProduct?.reviews || []);
  const [newReviewIsOpen, setNewReviewIsOpen] = useState(false);
  const newReviewRef = useRef<HTMLDivElement>(null);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.name;
    const currentLikes =
      reviews?.find((r: TReview) => r.publicId === id)?.liked || 0;

    try {
      const response = await axios.patch(`/api/reviews/${id}`, {
        liked: currentLikes + 1,
      });

      dispatch(updateReviews(response.data));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <div className="w-full flex flex-col text-white">
      {/* all reviews statistics */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between w-full py-8 my-3 border-b border-b-white/60">
        {/* left side of statistics */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4">
          <h2 className="capitalize text-2xl font-semibold">reviews</h2>
          <Rating length={length} average={average} />
          <div className="first-letter:uppercase">
            based on {length} review{length === 1 || "s"}
          </div>
          <Button
            onClick={() => setNewReviewIsOpen(!newReviewIsOpen)}
            className="w-[200px] md:w-[260px] h-[50px] capitalize text-xl border hover:text-white/25 duration-300"
          >
            leave a review
          </Button>
        </div>

        {/* right side of statistics */}
        <div className="w-full md:w-1/2 flex flex-col-reverse items-start justify-center gap-4">
          {[1, 2, 3, 4, 5].map((n, i) => {
            const amount = reviews.reduce(
              (acc, curr) => (curr?.rating === n ? acc + 1 : acc),
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

      {/* new review form */}
      <div
        ref={newReviewRef}
        className={`flex flex-col w-full h-full justify-center items-center duration-500 overflow-hidden *:my-1`}
        style={{
          height: newReviewIsOpen
            ? `${newReviewRef?.current?.scrollHeight}px`
            : "0",
        }}
      >
        <WriteReview />
      </div>

      {/* list of reviews */}
      <div className="flex flex-col w-full justify-center items-center">
        {reviews.map((r: TReview) => {
          const date = new Date(r.date);
          const fullDate = `${date.getDate()} / ${
            date.getMonth() + 1
          } / ${date.getFullYear()}`;

          return (
            <div
              key={r.publicId}
              className="w-full border-b border-b-white/60 py-6 flex flex-col gap-5"
            >
              <div className="flex items-start gap-7 capitalize">
                {r.author || "unknown author"}
                <span className="capitalize relative before:w-[5px] before:h-[5px] before:bg-white">
                  {fullDate}
                </span>
              </div>

              <Rating average={r.rating} />
              <h3 className="font-bold text-xl mb-4">{r.header}</h3>
              <p className="text-justify">{r.message}</p>

              <Button
                onClick={handleLike}
                name={r.publicId}
                className="flex items-center gap-5"
              >
                Was this helpful?
                <span className="flex items-center">
                  <ThumbUpOffAltIcon className="mr-3" />
                  Yes {r.liked ? `( ${r.liked} )` : ""}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
