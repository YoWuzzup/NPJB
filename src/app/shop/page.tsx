import { BreadcrumbsSection } from "@/components/sections/shop/BreadcrumbsSection";
import { FilterSection } from "@/components/sections/shop/FilterSection";

export default async function Shop() {
  // import clientPromise from "@/lib/mongodb";
  // const client = await clientPromise;
  // const db = client.db("npjb");
  // const users = await db.collection("users").find({}).toArray();

  return (
    <main className="flex flex-row flex-wrap justify-between pt-[164px] md:pt-[7.5rem] pb-20 px-4 md:px-14 bg-black">
      {/* breadcrumbs */}
      <div className="w-full py-5">
        <BreadcrumbsSection />
      </div>

      {/* filter side */}
      <div className="h-screen w-3/12">
        <FilterSection />
      </div>

      {/* products' side */}
      <div className="h-screen w-8/12">dsa</div>
    </main>
  );
}
