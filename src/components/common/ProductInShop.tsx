import Link from "next/link";

import { Rating } from "./Rating";

import { TProduct } from "@/lib/types";
import { useAppSelector } from "@/hooks/redux";

const ProductPriceDisplay: React.FC<{
  price: number | string;
  currency: string;
}> = ({ price, currency }) => {
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

  // Calculate discounted price if applicable
  const formatedPrice = price[cur] / 100;
  const priceWithDiscount = (
    formatedPrice -
    formatedPrice * (discount / 100)
  ).toFixed(2);

  // Check if the product is new (within 15 days of creation)
  const givenDate = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - givenDate.getTime()) / (1000 * 3600 * 24);

  return (
    <Link
      href={`/shop/${publicId || ""}`}
      className="w-full scale-100 hover:scale-110 duration-300"
    >
      <div className="w-full h-full relative border border-white/25 flex justify-between flex-col">
        {/* Product Image */}
        <div
          className="w-full h-[306px] bg-blend-multiply bg-center bg-cover"
          style={{ backgroundImage: `url(${thumbnail || ""})` }}
        ></div>

        {/* "New" badge if product is less than 15 days old */}
        {diffInDays < 15 && (
          <div className="absolute top-5 left-5 rounded-full p-3 text-black bg-white/85">
            new
          </div>
        )}

        {/* Bottom section: product info */}
        <div className="text-white p-3 pb-5">
          <div className="w-full text-center flex flex-col justify-center gap-2 items-center">
            <div className="uppercase text-sm">{name}</div>

            {/* Price display with discount if applicable */}
            <div className="flex flex-row gap-3">
              {discount ? (
                <>
                  <span className="line-through">
                    <ProductPriceDisplay price={formatedPrice} currency={cur} />
                  </span>
                  <ProductPriceDisplay
                    price={priceWithDiscount}
                    currency={cur}
                  />
                </>
              ) : (
                <ProductPriceDisplay price={formatedPrice} currency={cur} />
              )}
            </div>

            {/* Rating component */}
            <Rating length={ratingLength} average={averageRating || 5} />
          </div>
        </div>
      </div>
    </Link>
  );
};
