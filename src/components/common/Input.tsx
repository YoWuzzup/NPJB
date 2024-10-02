import { FC, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

type TInput = {
  children?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

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
