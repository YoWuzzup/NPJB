import { FC } from "react";
import { TInput } from "../componentTypes";

export const Input: FC<TInput> = ({ children, labelProps, inputProps }) => {
  return (
    <>
      <label {...labelProps} className={labelProps?.className || "sr-only"}>
        {labelProps?.children ||
          inputProps?.placeholder ||
          inputProps?.name ||
          inputProps?.id ||
          null}
      </label>
      <input {...inputProps} />
      {children}
    </>
  );
};
