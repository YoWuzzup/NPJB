import { ObjectId } from "mongodb";
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
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

export type TButton = {
  children?: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type TDropdown = {
  name: string;
  items: ReactNode[];
  isOpen: boolean;
  toggleDropdown: () => void;
};

export type TInput = {
  children?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export type TRating = {
  data: number[];
};
