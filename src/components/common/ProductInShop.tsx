import Link from "next/link";

import { Rating } from "./Rating";

import { TProduct } from "@/lib/types";
import { useAppSelector } from "@/hooks/redux";

const ProductPriceDisplay: React.FC<{ price: number; currency: string }> = ({
  price,
  currency,
}) => {
  return (
    <>
      {price} {currency}
    </>
  );
};

export const ProductInShop: React.FC<TProduct> = ({
  name,
  price,
  discount,
  publicId,
  thumbnail,
  createdAt,
  ratingLength,
  averageRating,
}) => {
  const cur = useAppSelector((st) => st.globals.currency);
  const priceWithDiscount =
    price[cur] - price[cur] * (discount / 100) || price.USD;
  const givenDate = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - givenDate.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  return (
    <Link
      href={`/shop/${publicId || ""}`}
      className="w-full scalse-100 hover:scale-110 duration-300"
    >
      <div className="w-full h-full relative border border-white/25 flex justify-between flex-col">
        {/* image */}
        <div
          className="w-full h-[306px] bg-blend-multiply bg-center bg-cover"
          style={{ backgroundImage: `url(${thumbnail || ""})` }}
        ></div>

        {/* new box */}
        {diffInDays < 15 && (
          <div className="absolute top-5 left-5 rounded-full p-3 text-black bg-white/85">
            new
          </div>
        )}

        {/* bottom info */}
        <div className="text-white p-3 pb-5">
          <div
            className={`w-full text-center flex flex-col justify-center gap-2 items-center`}
          >
            <div className="uppercase text-sm">{name}</div>
            <div className="flex flex-row flex-nowrap gap-3">
              {discount ? (
                <>
                  <span className={`line-through`}>
                    <ProductPriceDisplay price={price[cur]} currency={cur} />
                  </span>
                  <ProductPriceDisplay
                    price={priceWithDiscount}
                    currency={cur}
                  />
                </>
              ) : (
                <ProductPriceDisplay price={price[cur]} currency={cur} />
              )}
            </div>

            {/* rating */}
            <Rating length={ratingLength} average={averageRating || 5} />
          </div>
        </div>
      </div>
    </Link>
  );
};
