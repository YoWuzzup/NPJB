import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type TButton = {
  children?: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export const Button: FC<TButton> = ({ children, buttonProps }) => {
  return <button {...buttonProps}>{children}</button>;
};
