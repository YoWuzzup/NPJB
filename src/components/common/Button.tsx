import { FC } from "react";
import { TButton } from "../componentTypes";

export const Button: FC<TButton> = ({ children, ...buttonProps }) => {
  return <button {...buttonProps}>{children}</button>;
};
