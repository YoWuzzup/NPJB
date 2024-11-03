"use client";
import { FC, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart, changeItemAddQuantity } from "@/redux/slices/cart";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Rating } from "@/components/common/Rating";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const MainInfo: FC<{
  name: string;
  length: number;
  average: number;
  discount: number;
  price: {
    USD: number;
    UAH: number;
    ZL: number;
  };
  returnPolicy: string;
  specifications: string[];
}> = ({
  name,
  length,
  average,
  discount,
  price,
  returnPolicy,
  specifications,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((st) => st.cart);
  const currency = useAppSelector((st) => st.globals.currency);
  const { id } = useParams();
  const [productInfoIsOpen, setProductInfoIsOpen] = useState<boolean>(false);
  const [returnPolicyIsOpen, setRerurnPolicyIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const productRef = useRef<HTMLParagraphElement>(null);
  const returnRef = useRef<HTMLParagraphElement>(null);
  // should convert coins to real money
  const priceConverted = (price[currency] || price.USD) / 100;
  const priceWithDiscount = (
    priceConverted -
    priceConverted * (discount / 100)
  ).toFixed(2);

  const handleAddToCart = () => {
    // check if item is already in the cart
    const isInCart = cart.find((i) => i.publicId === id);

    if (isInCart)
      return dispatch(changeItemAddQuantity({ publicId: id, quantity }));

    dispatch(addToCart({ publicId: id, quantity }));
  };

  const toggleProductInfo = () => {
    setProductInfoIsOpen((prev) => !prev);
  };

  const toggleReturnPolicy = () => {
    setRerurnPolicyIsOpen((prev) => !prev);
  };

  const handleAddQuantity = () => {
    if (quantity >= 999) return;

    setQuantity(quantity + 1);
  };

  const handleSubtractQuantity = () => {
    if (quantity <= 0) return;

    setQuantity(quantity - 1);
  };

  return (
    <div className="w-full text-white flex flex-col gap-4">
      <h2 className="uppercase text-xl md:text-3xl">
        {name || "Product's name"}
      </h2>
      <Rating length={length} average={average} />
      <div className="flex flex-row flex-nowrap gap-3 text-xl md:text-3xl">
        {discount ? (
          <>
            <span className={`line-through`}>
              {priceConverted.toFixed(2)} {currency}
            </span>
            {priceWithDiscount} {currency}
          </>
        ) : (
          <>
            {priceConverted.toFixed(2)} {currency}
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
              className="text-black absolute flex justify-center items-center w-[40px] h-[20px] right-0 bottom-0"
              onClick={handleSubtractQuantity}
            >
              <ArrowDropDownIcon />
            </Button>
            <Button
              className="text-black absolute flex justify-center items-center w-[40px] h-[20px] right-0 top-0"
              onClick={handleAddQuantity}
            >
              <ArrowDropUpIcon />
            </Button>
          </Input>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-row flex-wrap w-full gap-4 mb-5">
        <Button
          className="w-[260px] h-[50px] capitalize text-xl border grow hover:text-white/25 duration-300"
          onClick={handleAddToCart}
        >
          add to cart
        </Button>
        <Button className="w-full h-[50px] capitalize text-xl text-black border bg-white hover:bg-white/60 duration-300">
          <Link href={`/cart`}>buy now</Link>
        </Button>
      </div>

      {/*  product & return dropdowns */}
      <div className="flex flex-col items-center gap-5">
        {specifications && specifications.length > 0 ? (
          <div className="w-full flex flex-col gap-3 items-start border-b border-b-white/60 pb-4">
            <h3
              className="uppercase text-lg flex justify-between w-full cursor-pointer text-white hover:text-white/60 duration-300"
              onClick={toggleProductInfo}
            >
              product info
              {productInfoIsOpen ? <RemoveIcon /> : <AddIcon />}
            </h3>
            <p
              ref={productRef}
              style={{
                height: productInfoIsOpen
                  ? `${productRef.current?.scrollHeight}px`
                  : "0",
              }}
              className={`text-base text-justify duration-300 overflow-hidden capitalize *:my-1`}
            >
              {specifications?.map((s, i) => (
                <span key={`${s}_${i}`} className="block">
                  {s}
                </span>
              ))}
            </p>
          </div>
        ) : null}

        <div className="w-full flex flex-col gap-3 items-start border-b border-b-white/60 pb-4">
          <h3
            className="uppercase text-lg flex justify-between w-full cursor-pointer text-white hover:text-white/60 duration-300"
            onClick={toggleReturnPolicy}
          >
            RETURN AND REFUND POLICY
            {returnPolicyIsOpen ? (
              <RemoveIcon className={`text-inherit`} />
            ) : (
              <AddIcon className={`text-inherit`} />
            )}
          </h3>
          <p
            ref={returnRef}
            style={{
              height: returnPolicyIsOpen
                ? `${returnRef.current?.scrollHeight}px`
                : "0",
            }}
            className={`text-base text-justify duration-300 overflow-hidden`}
          >
            {returnPolicy || "Free shipping & free returns"}
          </p>
        </div>
      </div>
    </div>
  );
};
