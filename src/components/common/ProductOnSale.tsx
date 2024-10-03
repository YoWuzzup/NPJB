import Link from "next/link";

import { Button } from "./Button";
import { TProductOnSale } from "../componentTypes";

export const ProductOnSale: React.FC<TProductOnSale> = ({
  name,
  price,
  discount,
  image,
  currency,
  _id,
}) => {
  const priceWithDiscount = price - price * (discount / 100) || price;

  return (
    <Link href={`shop/${_id || ""}`}>
      <div className="group/productonsale border border-white/25">
        {/* image */}
        <div
          className="w-full h-[306px] bg-blend-multiply bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        {/* bottom info */}
        <div className="relative h-32">
          <Button
            buttonProps={{
              className: `group-hover/productonsale:opacity-100 opacity-0 w-[210px] border-white border-2 px-10 py-2 mb-10 
            text-white/100 text-xl capitalize duration-300 hover:text-white/75 absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 z-0 group-hover/productonsale:z-10`,
            }}
          >
            view details
          </Button>

          <div
            className={`group-hover/productonsale:opacity-0 opacity-100 w-full text-center flex flex-col justify-center 
            items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/productonsale:z-0 z-10`}
          >
            <div
              className="uppercase relative text-3xl pb-4 mb-4 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:absolute after:content-[''] 
          after:h-[2px] after:w-5 after:bg-white"
            >
              {name}
            </div>
            <div className="flex flex-row flex-nowrap gap-6">
              <span className={`${discount ? "line-through" : ""}`}>
                {price} {currency}
              </span>
              {priceWithDiscount} {currency}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
