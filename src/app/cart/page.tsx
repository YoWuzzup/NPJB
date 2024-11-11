"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import axios from "axios";

import { Button } from "@/components/common/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  changeItemAddQuantity,
  changeItemMinusQuantity,
  removeFromCart,
} from "@/redux/slices/cart";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((st) => st.cart);
  const currency = useAppSelector((st) => st.globals.currency);
  const [address, setAddress] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const deliveryFee: number = 0;
  const taxRate: number = 0;

  const { isError, isLoading, data } = useQuery({
    queryKey: ["cart", cart],
    queryFn: async () => {
      const response = await axios.post("/api/cart", { products: cart });
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const newSubtotal = data.reduce((acc: any, prod: any) => {
        const quantity =
          cart.find((item) => item.publicId === prod.publicId)?.quantity || 0;
        const price = prod.price[currency] / 100;
        const discountPrice = price - price * (prod.discount / 100);
        const totalPriceForItem =
          (prod.discount ? discountPrice : price) * quantity;
        return acc + totalPriceForItem;
      }, 0);

      setSubtotal(newSubtotal);

      const calculatedTotal = newSubtotal + deliveryFee + newSubtotal * taxRate;
      setTotal(calculatedTotal);
    }
  }, [data, cart, currency, deliveryFee, taxRate]);

  const handleChangeAddress = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleRemove = (obj: { publicId: string }) => {
    dispatch(removeFromCart(obj));
  };

  const handleSubtraction = (id: string) => {
    const item = cart.find((i) => i.publicId === id);
    if (item && item.quantity <= 1) {
      handleRemove(item);
    } else {
      dispatch(changeItemMinusQuantity({ publicId: id, quantity: 1 }));
    }
  };
  const handleAddition = (id: string) => {
    dispatch(changeItemAddQuantity({ publicId: id, quantity: 1 }));
  };

  if (isLoading)
    return (
      <main className="w-full h-screen grid place-items-center pt-[164px] md:pt-[7.5rem] pb-2 bg-black">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </main>
    );

  if (isError) {
    return (
      <main className="w-full h-screen grid place-items-center pt-[164px] md:pt-[7.5rem] pb-2 bg-black">
        <div role="status">
          <span className="sr-only">Something went wrong</span>
          <div className="text-white">
            Something went wrong, try again later...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen flex justify-stretch pt-40 md:pt-28 bg-black text-white">
      <div className="w-full md:w-8/12 mx-auto flex flex-col md:flex-row flex-nowrap py-11 gap-14">
        {/* Cart items list */}
        <div className="grow">
          <h3 className="w-full border-b border-b-white/60 first-letter:capitalize px-5 md:px-0 py-5 mb-4 text-xl">
            my cart
          </h3>
          <ul className="w-full flex flex-col">
            {data && data.length > 0 ? (
              data?.map((prod: any, i: number) => {
                const quantity =
                  cart.find((item) => item.publicId === prod.publicId)
                    ?.quantity || 0;
                const formatedPrice = prod?.price[currency] / 100;
                const priceWithDiscount = (
                  formatedPrice -
                  formatedPrice * (prod.discount / 100)
                ).toFixed(2);

                return (
                  <li
                    className="flex flex-col md:flex-row flex-nowrap gap-5 items-center md:items-start justify-between border-b border-b-white-60 mb-6 pb-6"
                    key={`${prod.name}_${i}`}
                  >
                    <div className="w-[100px] h-[100px] aspect-square border border-white/60">
                      <img
                        src={`${prod?.thumbnail || ""}`}
                        alt={`${prod?.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-3 px-2 md:px-0">
                      <div className="text-base">{prod.name}</div>
                      <div className="text-sm">
                        {prod.discount ? (
                          <>
                            <span className="line-through text-white/60 mr-4">
                              {formatedPrice} {currency}
                            </span>
                            {priceWithDiscount} {currency}
                          </>
                        ) : (
                          <>
                            {formatedPrice} {currency}
                          </>
                        )}
                      </div>
                      {prod.specifications && (
                        <div className="text-sm flex flex-col gap-2 gap-y-1 *:first-letter:uppercase">
                          {prod?.specifications?.map((s: string, i: number) => (
                            <span key={`${s}_${i}`}>{s}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      className="group/quantity h-fit flex flex-nowrap flex-row border border-white/60 hover:border-white/100 duration-150 
                    *:aspect-square *:w-7 *:grid *:place-items-center cursor-pointer"
                    >
                      <span onClick={() => handleSubtraction(prod?.publicId)}>
                        -
                      </span>
                      <span>{quantity}</span>
                      <span onClick={() => handleAddition(prod?.publicId)}>
                        +
                      </span>
                    </div>

                    <div className="h-fit">
                      {(parseFloat(priceWithDiscount) * quantity).toFixed(2)}
                    </div>

                    <div
                      className="h-fit cursor-pointer"
                      onClick={() => handleRemove({ publicId: prod.publicId })}
                    >
                      <DeleteForeverIcon />
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="px-5 md:px-0">No items in the cart</div>
            )}
          </ul>
        </div>

        {/* Order summary */}
        <div>
          <h3 className="w-full border-b border-b-white/60 px-5 md:px-0 first-letter:capitalize py-5 mb-4 text-xl">
            order summary
          </h3>

          <div className="w-full border-b border-b-white/60 first-letter:capitalize px-5 md:px-0 py-7 mb-4 text-xl flex gap-y-3 flex-col justify-stretch">
            <div className="w-full flex flex-nowrap justify-between text-base">
              Subtotal{" "}
              <span>
                {subtotal.toFixed(2)} {currency}
              </span>
            </div>
            <div className="w-full flex flex-nowrap justify-between text-base">
              Delivery{" "}
              <span>
                {deliveryFee
                  ? `${deliveryFee?.toFixed(2)} ${currency}`
                  : "FREE"}
              </span>
            </div>
            <div className="w-full flex flex-nowrap justify-between text-base">
              Tax{" "}
              <span>
                {taxRate
                  ? `${(subtotal * taxRate).toFixed(2)} ${currency}`
                  : "No Tax"}
              </span>
            </div>
            <textarea
              className="w-full outline-none focus:outline-none rounded-md bg-white/20 p-3 resize-none"
              value={address}
              placeholder="Enter your address..."
              onChange={handleChangeAddress}
              required
              rows={5}
            ></textarea>
          </div>

          <div className="flex flex-col justify-stretch gap-y-5 px-5 md:px-0">
            <div className="text-xl flex flex-row flex-nowrap justify-between">
              Total{" "}
              <span>
                {total.toFixed(2)} {currency}
              </span>
            </div>
            <Button
              className="text-2xl first-letter:capitalize bg-white/80 text-black py-2 duration-300
                hover:bg-white/100 outline-none focus:outline-none"
            >
              checkout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
