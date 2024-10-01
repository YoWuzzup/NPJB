"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Input } from "../common/Input";

import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { changeFilter } from "@/redux/slices/filters";

const menu = [
  { name: "shop", text: "shop", url: "#" },
  { name: "about", text: "about", url: "#" },
  { name: "contact", text: "contact", url: "#" },
];

export const Navbar: React.FC = () => {
  const searchValue = useAppSelector((st) => st.filters.search);
  const cartLength = useAppSelector((st) => st.cart.length);
  const dispatch = useAppDispatch();

  return (
    <nav
      className="w-full h-[7.5rem] fixed top-0 bg-black/85 text-white flex flex-row flex-nowrap
                items-center gap-5 px-14"
    >
      {/* company name */}
      <div className="grow place-content-center text-start uppercase text-white/65 font-bold text-4xl">
        <Link href={"/"}>
          Nothing Personal Just<span className="text-white/100">Business</span>
        </Link>
      </div>

      {/* menu links */}
      <ul className="flex flex-row flex-nowrap gap-2">
        {menu.map((l, i) => (
          <li
            key={`${l.name}_${i}`}
            className="text-white/65 hover:text-white/100 transition-all duration-300 uppercase"
          >
            <Link href={l.url} className="p-5">
              {l.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* search bar */}
      <div className="group/searchbar w-40 h-12 flex justify-center items-center relative">
        <Input
          labelProps={{ htmlFor: "search" }}
          inputProps={{
            type: "text",
            id: "search",
            name: "search",
            placeholder: "search...",
            className: `w-full h-full px-4 outline-none text-white bg-black/0 cursor-text border-b-2
                    duration-300
                    placeholder:uppercase group-hover/searchbar:bg-black/100 group-focus/searchbar:bg-black/100`,
          }}
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {searchValue && (
              <ClearIcon
                fontSize="small"
                className="text-white/65 duration-300 rounded-full cursor-pointer
                hover:text-white/100"
                onClick={() =>
                  dispatch(changeFilter({ filter: "search", value: "" }))
                }
              />
            )}
          </div>
        </Input>
      </div>

      {/* cart */}
      <div className="group/cart">
        <Link
          href={"#"}
          className="flex flex-nowrap flex-row gap-1 duration-300 text-white/65 group-hover/cart:text-white/100"
        >
          <ShoppingCartOutlinedIcon />
          {cartLength}
        </Link>
      </div>
    </nav>
  );
};
