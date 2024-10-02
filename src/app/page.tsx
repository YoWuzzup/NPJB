import { AboutUsSection } from "@/components/sections/home/AboutUsSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ImagesSection } from "@/components/sections/home/ImagesSection";
import { MailingSection } from "@/components/sections/home/MailingSection";
import { OnsaleSection } from "@/components/sections/home/OnsaleSection";

export default async function Home() {
  // import clientPromise from "@/lib/mongodb";
  // const client = await clientPromise;
  // const db = client.db("npjb");
  // const users = await db.collection("users").find({}).toArray();

  return (
    <main className="flex flex-col">
      <ImagesSection />
      <OnsaleSection />
      <AboutUsSection />
      <ContactSection />
      <MailingSection />
    </main>
  );
}
