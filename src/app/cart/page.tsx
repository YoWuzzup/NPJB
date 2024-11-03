"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppSelector } from "@/hooks/redux";

export default function Cart() {
  const cart = useAppSelector((st) => st.cart);
  const currency = useAppSelector((st) => st.globals.currency);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["cart", cart],
    queryFn: async () => {
      const response = await axios.post("/api/cart", { products: cart });
      return response.data;
    },
  });

  console.log(data);

  return (
    <main className="w-full min-h-screen flex justify-stretch pt-40 md:pt-28 bg-black text-white">
      <div className="w-full md:w-7/12 mx-auto flex flex-nowrap flex-row py-11 gap-14">
        {/* cart items list */}
        <div className="grow">
          <h3 className="w-full border-b border-b-white/60 first-letter:capitalize py-5 mb-4 text-xl">
            my cart
          </h3>
          <ul className="w-full flex flex-col">
            {data?.map((prod: any, i: number) => (
              <li
                className="flex flex-row flex-nowrap justify-between border-b border-b-white-60 mb-6 pb-6"
                key={`${prod.name}_${i}`}
              >
                <img
                  src={`${prod?.thumbnail || ""}`}
                  alt={`${prod?.name}`}
                  className="w-24 aspect-square border border-white/60 object-cover"
                />

                <div>
                  <div>{prod?.name}</div>
                  <div>{prod?.price[currency]}</div>
                  <div>{prod?.specifications}</div>
                </div>

                <div
                  className="group/quantity h-fit flex flex-nowrap flex-row border border-white/60 hover:border-white/100 duration-150 
                    *:aspect-square *:w-7 *:grid *:place-items-center cursor-pointer"
                >
                  <span>-</span>
                  <span>2</span>
                  <span>+</span>
                </div>

                <div className="h-fit">{prod?.price[currency]}</div>

                <div className="h-fit cursor-pointer">
                  <DeleteForeverIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* order summary */}
        <div>
          <h3 className="w-full border-b border-b-white/60 first-letter:capitalize py-5 mb-4 text-xl">
            order summary
          </h3>
        </div>
      </div>
    </main>
  );
}
