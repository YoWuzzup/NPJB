import Link from "next/link";

import { Rating } from "./Rating";

import { TProductInShop } from "../componentTypes";

export const ProductInShop: React.FC<TProductInShop> = ({
  name,
  price,
  discount,
  image,
  currency,
  _id,
  reviews,
  date,
}) => {
  const priceWithDiscount = price - price * (discount / 100) || price;
  const ratingNumberArray = reviews.map((r) => r.rating || 5);
  const givenDate = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInTime = now.getTime() - givenDate.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  return (
    <Link
      href={`/shop/${_id || ""}`}
      className="w-full scalse-100 hover:scale-110 duration-300"
    >
      <div className="w-full relative border border-white/25">
        {/* image */}
        <div
          className="w-full h-[306px] bg-blend-multiply bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        {/* new box */}
        {diffInDays < 15 && (
          <div className="absolute top-5 left-5 rounded-full p-3 text-black bg-white/85">
            new
          </div>
        )}

        {/* bottom info */}
        <div className="h-32 text-white">
          <div
            className={`w-full text-center flex flex-col justify-center gap-2 items-center`}
          >
            <div className="uppercase text-base">{name}</div>
            <div className="flex flex-row flex-nowrap gap-3">
              {discount ? (
                <>
                  <span className={`line-through`}>
                    {price} {currency}
                  </span>
                  {priceWithDiscount} {currency}
                </>
              ) : (
                <>
                  {price} {currency}
                </>
              )}
            </div>

            {/* rating */}
            <Rating data={ratingNumberArray} />
          </div>
        </div>
      </div>
    </Link>
  );
};
