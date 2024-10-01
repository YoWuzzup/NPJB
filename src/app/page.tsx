import { ImagesSection } from "@/components/sections/home/ImagesSection";

export default async function Home() {
  // import clientPromise from "@/lib/mongodb";
  // const client = await clientPromise;
  // const db = client.db("npjb");
  // const users = await db.collection("users").find({}).toArray();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <ImagesSection />
    </main>
  );
}
