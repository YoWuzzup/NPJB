import { AboutUsSection } from "@/components/sections/home/AboutUsSection";
import { ImagesSection } from "@/components/sections/home/ImagesSection";
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
    </main>
  );
}
