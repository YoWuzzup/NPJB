"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { AboutUsSection } from "@/components/sections/home/AboutUsSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ImagesSection } from "@/components/sections/home/ImagesSection";
import { MailingSection } from "@/components/sections/home/MailingSection";
import { OnsaleSection } from "@/components/sections/home/OnsaleSection";

export default function Home() {
  const { isError, data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const queryParams = { discount: 10 };

      const response = await axios.get("/api/shop", { params: queryParams });

      return response.data;
    },
  });

  return (
    <main className="flex flex-col">
      <ImagesSection />
      {!isError && <OnsaleSection items={data} />}
      <AboutUsSection />
      <ContactSection />
      <MailingSection />
    </main>
  );
}
