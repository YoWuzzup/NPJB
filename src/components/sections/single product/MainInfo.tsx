"use client";
import { Input } from "@/components/common/Input";
import { Rating } from "@/components/common/Rating";
import { FC, useState } from "react";

export const MainInfo: FC = () => {
  const [quantity, setQuantity] = useState(1);
  const discount = 13;
  const price = 50;
  const currency = "zl";
  const priceWithDiscount = (price - price * (discount / 100) || price).toFixed(
    2
  );

  return (
    <div className="w-1/2 text-white flex flex-col gap-4">
      <h2 className="uppercase text-3xl">CANVAS BACKPACK</h2>
      <Rating data={[5, 4, 5, 5]} />
      <div className="flex flex-row flex-nowrap gap-3 text-3xl">
        {discount ? (
          <>
            <span className={`line-through`}>
              {price.toFixed(2)} {currency}
            </span>
            {priceWithDiscount} {currency}
          </>
        ) : (
          <>
            {price.toFixed(2)} {currency}
          </>
        )}
      </div>

      <Input
        inputProps={{
          className: "text-black",
          type: "number",
          value: quantity,
          onChange: (e) => {
            setQuantity(Number(e.target.value));
          },
        }}
      />
    </div>
  );
};
