import { FC } from "react";

import { TRating } from "../componentTypes";

export const Rating: FC<TRating> = ({ length, average = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const isFullStar = average >= index + 1;
    const isPartialStar = average > index && average < index + 1;
    const fillPercentage = isPartialStar ? (average - index) * 100 : 0;

    return (
      <div
        key={`star_rating_${index}`}
        className="relative inline-block w-4 h-4 me-1"
      >
        {/* Grey star */}
        <svg
          className="absolute inset-0 w-full h-full text-gray-300 dark:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>

        {/* Gold star */}
        <svg
          className="absolute inset-0 w-full h-full text-yellow-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          style={{
            clipPath: isFullStar
              ? "none"
              : `inset(0 ${100 - fillPercentage}% 0 0)`,
          }}
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
    );
  });

  return (
    <div className="flex items-center">
      {stars}
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {average.toFixed(2)}
      </p>
      {length ? (
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          {`( ${length} )`}
        </p>
      ) : null}
    </div>
  );
};
