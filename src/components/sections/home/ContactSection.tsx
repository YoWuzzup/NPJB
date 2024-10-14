"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeContactForm } from "@/redux/slices/contactForm";

import { validateEmail } from "@/lib/utils";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

const inputs = [
  {
    label: "first name *",
    input: {
      id: "name",
      name: "name",
      type: "text",
      autocomplete: "given-name",
    },
    containerClassName: "basis-0 grow flex flex-col",
  },
  {
    label: "surname *",
    input: {
      id: "surname",
      name: "surname",
      type: "text",
      autocomplete: "family-name",
    },
    containerClassName: "basis-0 grow flex flex-col",
  },
  {
    label: "email *",
    input: { id: "email", name: "email", type: "email", autocomplete: "email" },
    containerClassName: "w-full flex flex-col",
  },
];

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
    <section className="w-full bg-black py-28 px-6 lg:px-40 gap-32 flex flex-col md:flex-row flex-nowrap justify-center items-start text-white">
      {/* left side with form */}
      <form
        id="contact"
        className="flex flex-row flex-wrap basis-0 grow justify-stretch items-center gap-7"
        onSubmit={handleSubmit}
      >
        {inputs.map((i, indx) => (
          <div className={i.containerClassName} key={`${i.label}_${indx}`}>
            <Input
              labelProps={{
                className: `${
                  fieldWithErrors.includes(i.input.id)
                    ? "text-rose-500"
                    : "text-white/100"
                } capitalize text-xl mb-2 duration-300`,
                children: i.label,
                htmlFor: i.input.id,
              }}
              inputProps={{
                onChange: handleChange,
                id: i.input.id,
                name: i.input.name,
                type: i.input.type,
                autoComplete: i.input.autocomplete,
                className: `bg-black text-white py-2 px-3 outline-none border ${
                  fieldWithErrors.includes(i.input.id)
                    ? "border-rose-500"
                    : "border-white/100"
                } hover:border-white/60 duration-300`,
                value: formData[i.input.id] || "",
              }}
            />
          </div>
        ))}

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
          />
        </div>

        {/* send button */}
        <div className="w-full flex flex-row flex-nowrap items-center justify-end">
          <Button
            className={`w-1/2 bg-black text-2xl text-white/100 hover:text-white/60 py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300
              capitalize`}
            type="submit"
            form="contact"
          >
            send
          </Button>
        </div>
      </form>

      {/* right side with info */}
      <div className="basis-0 grow">
        <h2 className="w-4/6 text-xl md:text-6xl uppercase mb-5">contact</h2>
        <p className="w-full text-md md:text-xl mb-10">
          I&apos;m a paragraph. Click here to add your own text and edit me.
          It&apos;s easy. Just click “Edit Text” or double click me to add your
          own content and make changes to the font. I&apos;m a great place for
          you to tell a story and let your users know a little more about you.
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
