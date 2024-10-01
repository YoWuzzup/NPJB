"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeFilter } from "@/redux/slices/filters";
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

type TInput = {
  children?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export const Input: FC<TInput> = ({ children, labelProps, inputProps }) => {
  const filterName = inputProps?.name || inputProps?.id || "";
  const value = useAppSelector((st) => st.filters[filterName]);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter({ filter: filterName, value: e.target.value }));
  };

  return (
    <>
      <label {...labelProps} className={labelProps?.className || "sr-only"}>
        {labelProps?.children ||
          inputProps?.placeholder ||
          inputProps?.name ||
          inputProps?.id ||
          null}
      </label>
      <input
        {...inputProps}
        className={inputProps?.className || ""}
        onChange={inputProps?.onChange || handleChange}
        value={value || ""}
      />
      {children}
    </>
  );
};
