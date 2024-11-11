"use client";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import axios from "axios";

import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

import { changeSubscribeEmail } from "@/redux/slices/subscribeEmail";

export const MailingSection: React.FC = () => {
  // const email = useAppSelector((st) => st.subscribeEmail);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);

    dispatch(changeSubscribeEmail(e.target.value));
  };

  const handleClick = async () => {
    // if (!validateEmail(email)) {
    //   setError(new Error("Enter an email address like example@mysite.com."));
    //   return;
    // }

    try {
      // await axios.post("/api/email", { email });
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error || "Failed to subscribe. Please try again.";
        setError(new Error(message));
      } else {
        setError(new Error("An unexpected error occurred. Please try again."));
      }
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center bg-[#141414] text-white py-10 md:py-28">
      <h2 className="uppercase text-xl md:text-4xl font-bold mb-3.5">
        join our mailing list
      </h2>
      <div className="uppercase text-md md:text-xl mb-7">
        and never miss an update
      </div>

      <div className="flex flex-col w-full sm:w-1/2 dm:w-1/3 px-2 sm:px-0">
        <Input
          labelProps={{
            className: `${
              error ? "text-rose-500" : "text-white/100"
            } capitalize text-xl mb-3 duration-300`,
            children: "Enter your email here *",
            htmlFor: "subscribeEmail",
          }}
          inputProps={{
            onChange: handleChange,
            id: "subscribeEmail",
            name: "subscribeEmail",
            type: "email",
            autoComplete: "email",
            className: `bg-transparent text-white mb-1 py-2 px-3 outline-none border ${
              error ? "border-rose-500" : "border-white/100"
            } hover:border-white/60 duration-300`,
            // value: email || "",
          }}
        >
          <div
            className={`w-full text-rose-500 text-sm duration-300 mb-5 ${
              error ? "h-8" : "h-0"
            }`}
          >
            {error?.message}
          </div>
        </Input>

        <Button
          className={`w-full bg-transparent text-2xl text-white/100 hover:text-white/60 py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300
              uppercase`}
          type="button"
          onClick={handleClick}
        >
          subscribe now
        </Button>
      </div>
    </section>
  );
};
