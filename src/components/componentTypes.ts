import { ObjectId } from "mongodb";
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  PropsWithChildren,
} from "react";

export type TProductInShop = {
  name: string;
  price: number;
  discount: number;
  image: string;
  currency: string;
  _id: ObjectId | string;
  reviews: { rating: number }[];
  date: Date | string;
};

export type TProductOnSale = {
  name: string;
  price: number;
  discount: number;
  image: string;
  currency: string;
  _id: ObjectId | string;
};

export type TBreadcrumb = {
  crumbs: {
    name: string;
    href: string;
    svg?: ReactNode;
  }[];
} & HTMLAttributes<HTMLDivElement>;

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

export type TDropdown = {
  name: string;
  items: ReactNode[];
  isOpen: boolean;
  toggleDropdown: () => void;
};

export type TInput = {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
} & PropsWithChildren;

export type TRating = {
  data: number[];
};
