import { ChangeEvent, FC, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export const WriteReview: FC = () => {
  const { id } = useParams();

  const [newReview, setNewReview] = useState({
    author: "",
    header: "",
    message: "",
    rating: 5,
    product_id: id,
  });
  const [errors, setErrors] = useState<{
    author: Error | null;
    message: Error | null;
    header: Error | null;
  }>({
    author: null,
    message: null,
    header: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setErrors((prev) => {
      return { ...prev, [name]: null };
    });

    setNewReview((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleRatingClick = (index: number) => {
    setNewReview((prev) => ({
      ...prev,
      rating: index + 1,
    }));
  };

  const handleSend = async () => {
    const newErrors = {
      author: newReview.author ? null : new Error("Author is required"),
      message: newReview.message ? null : new Error("Message is required"),
      header: newReview.header ? null : new Error("Message is required"),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((er) => er !== null)) {
      return;
    }

    await axios.post(`/api/reviews`, newReview);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* name */}
      <div>
        <h3
          className={`capitalize text-xl py-2 ${
            errors.author ? "text-red-600" : "text-white"
          }`}
        >
          Name
        </h3>
        <div className="group/author w-full h-12 flex justify-center items-center relative">
          <Input
            labelProps={{ htmlFor: "author" }}
            inputProps={{
              type: "text",
              id: "author",
              name: "author",
              placeholder: "Name",
              value: newReview?.author,
              onChange: handleChange,
              className: `w-full h-full px-4 outline-none bg-black/0 cursor-text
          duration-300 placeholder:uppercase group-hover/author:bg-black/100 group-focus/author:bg-black/100
          ${
            errors.author
              ? "text-red-600 border-b border-[#dc3545] placeholder:text-red-600"
              : "text-white border-b border-white/50 placeholder:text-white/50"
          }`,
            }}
          />
        </div>
      </div>

      {/* rating */}
      <div>
        <h3 className="capitalize text-white text-xl py-2">Rating</h3>
        <div className="group/rating w-full gap-3 flex justify-start items-center relative">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={`rating_${index}`}
              className={`w-10 font-bold aspect-square rounded-full grid place-items-center cursor-pointer ${
                newReview.rating > index
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handleRatingClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* header */}
      <div>
        <h3
          className={`capitalize text-xl py-2 ${
            errors.header ? "text-red-600" : "text-white"
          }`}
        >
          Header
        </h3>
        <div className="group/header w-full h-12 flex justify-center items-center relative">
          <Input
            labelProps={{ htmlFor: "header" }}
            inputProps={{
              type: "text",
              id: "header",
              name: "header",
              placeholder: "header",
              value: newReview?.header,
              onChange: handleChange,
              className: `w-full h-full px-4 outline-none bg-black/0 cursor-text duration-300 
                placeholder:uppercase group-hover/author:bg-black/100 group-focus/author:bg-black/100
                    ${
                      errors.header
                        ? "text-red-600 border-b border-[#dc3545] placeholder:text-red-600"
                        : "text-white border-b border-white/50 placeholder:text-white/50"
                    }`,
            }}
          />
        </div>
      </div>

      {/* message */}
      <div>
        {/* Message Header */}
        <h3
          className={`capitalize text-xl py-2 ${
            errors.message ? "text-red-600" : "text-white"
          }`}
        >
          Message
        </h3>

        {/* Textarea container */}
        <div className="group/message w-full flex justify-center items-center relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="your message"
            value={newReview?.message}
            onChange={handleChange}
            className={`w-full h-full px-4 outline-none bg-black/0 cursor-text duration-300 
                placeholder:uppercase group-hover/author:bg-black/100 group-focus/author:bg-black/100
                    ${
                      errors.message
                        ? "text-red-600 border-b border-[#dc3545] placeholder:text-red-600"
                        : "text-white border-b border-white/50 placeholder:text-white/50"
                    }`}
          />
        </div>
      </div>

      {/* send button */}
      <div>
        <Button
          className={`w-full md:w-2/6 bg-transparent text-lg md:text-2xl text-white/100 hover:text-white/60 py-2 px-3 outline-none border border-white/100 hover:border-white/60 duration-300
              uppercase`}
          type="button"
          onClick={handleSend}
        >
          send your review
        </Button>
      </div>
    </div>
  );
};
