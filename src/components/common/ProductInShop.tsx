import Link from "next/link";

import { TProductInShop } from "../componentTypes";
import { Rating } from "./Rating";

export const ProductInShop: React.FC<TProductInShop> = ({
  name,
  price,
  discount,
  image,
  currency,
  _id,
  reviews,
}) => {
  const priceWithDiscount = price - price * (discount / 100) || price;
  const ratingNumberArray = reviews.map((r) => r.rating || 5);

  return (
    <Link href={`shop/${_id || ""}`} className="w-full">
      <div className="w-full border border-white/25">
        {/* image */}
        <div
          className="w-full h-[306px] bg-blend-multiply bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

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
