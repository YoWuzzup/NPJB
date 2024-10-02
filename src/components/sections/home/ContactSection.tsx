"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeContactForm } from "@/redux/slices/contactForm";

import { validateEmail } from "@/lib/utils";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

export const ContactSection: React.FC = () => {
  const [fieldWithErrors, setFieldWithErrors] = useState<string[]>([]);
  const formData = useAppSelector((st) => st.contactForm);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (fieldWithErrors.includes(e.target.name)) {
      const filtered = fieldWithErrors.filter((er) => er !== e.target.name);

      setFieldWithErrors(() => filtered);
    }

    dispatch(changeContactForm({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check the necessary fields
    if (!formData.name) setFieldWithErrors((prev) => [...prev, "name"]);
    if (!formData.surname) setFieldWithErrors((prev) => [...prev, "surname"]);
    if (!formData.email) setFieldWithErrors((prev) => [...prev, "email"]);
    if (!formData.name || !formData.surname || !formData.email) return;

    if (!validateEmail(formData.email))
      return setFieldWithErrors((prev) => [...prev, "email"]);

    // TODO:send a request with data
  };

  return (
    <section className="w-full bg-black py-28 px-40 gap-32 flex flex-row flex-nowrap justify-center items-start text-white">
      {/* left side with form */}
      <form
        id="contact"
        className="flex flex-row flex-wrap basis-0 grow justify-stretch items-center gap-7"
        onSubmit={handleSubmit}
      >
        <div className="basis-0 grow flex flex-col">
          <Input
            labelProps={{
              className: `${
                fieldWithErrors.includes("name")
                  ? "text-rose-500"
                  : "text-white/100"
              } capitalize text-xl mb-2 duration-300`,
              children: "first name *",
              htmlFor: "name",
            }}
            inputProps={{
              onChange: handleChange,
              id: "name",
              name: "name",
              type: "text",
              className: `bg-black text-white py-2 px-3 outline-none border ${
                fieldWithErrors.includes("name")
                  ? "border-rose-500"
                  : "border-white/100"
              } hover:border-white/60 duration-300`,
              value: formData.name || "",
            }}
          />
        </div>
        <div className="basis-0 grow flex flex-col">
          <Input
            labelProps={{
              className: `${
                fieldWithErrors.includes("surname")
                  ? "text-rose-500"
                  : "text-white/100"
              } capitalize text-xl mb-2 duration-300`,
              children: "surname *",
              htmlFor: "surname",
            }}
            inputProps={{
              onChange: handleChange,
              id: "surname",
              name: "surname",
              type: "text",
              className: `bg-black text-white py-2 px-3 outline-none border ${
                fieldWithErrors.includes("surname")
                  ? "border-rose-500"
                  : "border-white/100"
              } hover:border-white/60 duration-300`,
              value: formData.surname || "",
            }}
          />
        </div>
        <div className="w-full flex flex-col">
          <Input
            labelProps={{
              className: `${
                fieldWithErrors.includes("email")
                  ? "text-rose-500"
                  : "text-white/100"
              } capitalize text-xl mb-2 duration-300`,
              children: "email *",
              htmlFor: "email",
            }}
            inputProps={{
              onChange: handleChange,
              id: "email",
              name: "email",
              type: "email",
              className: `bg-black text-white py-2 px-3 outline-none border ${
                fieldWithErrors.includes("email")
                  ? "border-rose-500"
                  : "border-white/100"
              } hover:border-white/60 duration-300`,
              value: formData.email || "",
            }}
          />
        </div>
        <div className="w-full flex flex-col">
          <Input
            labelProps={{
              className: "text-white capitalize text-xl mb-2",
              children: "subject",
              htmlFor: "subject",
            }}
            inputProps={{
              onChange: handleChange,
              id: "subject",
              name: "subject",
              type: "text",
              className:
                "bg-black text-white py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300",
              value: formData.subject || "",
            }}
          />
        </div>
        <div className="w-full flex flex-col">
          <label
            htmlFor="message"
            className="text-white capitalize text-xl mb-2"
          >
            message
          </label>
          <textarea
            rows={4}
            id="message"
            name="message"
            className="bg-black text-white py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300"
            onChange={handleChange}
            value={formData.message || ""}
          ></textarea>
        </div>

        {/* send button */}
        <div className="w-full flex flex-row flex-nowrap items-center justify-end">
          <Button
            buttonProps={{
              className: `w-1/2 bg-black text-2xl text-white/100 hover:text-white/60 py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300
              capitalize`,
              type: "submit",
              form: "contact",
            }}
          >
            send
          </Button>
        </div>
      </form>

      {/* right side with info */}
      <div className="basis-0 grow">
        <h2 className="w-4/6 text-xl md:text-6xl uppercase mb-5">contact</h2>
        <p className="w-full text-md md:text-xl mb-10">
          I'm a paragraph. Click here to add your own text and edit me. It's
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font. I'm a great place for you to
          tell a story and let your users know a little more about you.
        </p>

        <a href="#" type="email" className="block text-md md:text-xl mb-2">
          email
        </a>
        <a href="#" type="tel" className="block text-md md:text-xl">
          Tel: tel
        </a>
      </div>
    </section>
  );
};
