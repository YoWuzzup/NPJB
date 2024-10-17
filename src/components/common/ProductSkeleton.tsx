import { FC } from "react";

export const ProductSkeleton: FC = () => {
  return (
    <div className="w-full h-full pb-3 md:pb-7 border border-white/25 flex justify-between flex-col animate-pulse">
      <div className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-inherit w-inherit text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <div
        className={`w-full h-full flex flex-col justify-center gap-2 items-start`}
      >
        <div className="w-4/6 h-5 rounded-full mx-4 bg-gray-500"></div>
        <div className="w-5/6 h-2 rounded-full mx-4 bg-gray-500"></div>
        <div className="w-5/6 h-2 rounded-full mx-4 bg-gray-500"></div>
        <div className="w-5/6 h-2 rounded-full mx-4 bg-gray-500"></div>
        <div className="w-5/6 h-2 rounded-full mx-4 bg-gray-500"></div>
      </div>
    </div>
  );
};
