"use client";
import { FC, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Rating } from "@/components/common/Rating";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const MainInfo: FC = () => {
  const [quantity, setQuantity] = useState(1);
  const discount = 13;
  const price = 50;
  const currency = "zl";
  const priceWithDiscount = (price - price * (discount / 100) || price).toFixed(
    2
  );

  const handleAddQuantity = () => {
    if (quantity >= 999) return;

    setQuantity(quantity + 1);
  };

  const handleSubtractQuantity = () => {
    if (quantity <= 0) return;

    setQuantity(quantity - 1);
  };

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

      {/* quantity */}
      <div className="flex flex-col gap-3 items-start">
        <div className="capitalize">quantity</div>
        <div className="relative w-[80px] h-[40px]">
          <Input
            inputProps={{
              className: "text-black w-full h-full pl-2 pr-7 outline-none",
              type: "number",
              step: 1,
              min: 0,
              value: quantity,
              onChange: (e) => {
                setQuantity(Number(e.target.value));
              },
            }}
          >
            <Button
              buttonProps={{
                className:
                  "text-black absolute flex justify-center items-center w-[40px] h-[20px] right-0 bottom-0",
                onClick: handleSubtractQuantity,
              }}
            >
              <ArrowDropDownIcon />
            </Button>
            <Button
              buttonProps={{
                className:
                  "text-black absolute flex justify-center items-center w-[40px] h-[20px] right-0 top-0",
                onClick: handleAddQuantity,
              }}
            >
              <ArrowDropUpIcon />
            </Button>
          </Input>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-row flex-wrap w-full gap-4">
        <Button
          buttonProps={{
            className:
              "w-[260px] h-[50px] capitalize text-xl border grow hover:text-white/25 duration-300",
          }}
        >
          add to cart
        </Button>
        <Button buttonProps={{ className: "w-[50px] h-[50px] border" }}>
          <FavoriteBorderIcon />
        </Button>
        <Button
          buttonProps={{
            className:
              "w-full h-[50px] capitalize text-xl text-black border bg-white hover:bg-white/60 duration-300",
          }}
        >
          buy now
        </Button>
      </div>

      {/*  product & return dropdowns */}
      <div>
        <div>
          <h3>product info</h3>
          <p>
            I&apos;m a product detail. I&apos;m a great place to add more
            information about your product such as sizing, material, care and
            cleaning instructions. This is also a great space to write what
            makes this product special and how your customers can benefit from
            this item. Buyers like to know what they&apos;re getting before they
            purchase, so give them as much information as possible so they can
            buy with confidence and certainty.
          </p>
          <AddIcon />
        </div>
      </div>
    </div>
  );
};
