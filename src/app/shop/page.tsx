import { BreadcrumbsSection } from "@/components/sections/shop/BreadcrumbsSection";
import { FilterSection } from "@/components/sections/shop/FilterSection";
import { ShopResultSection } from "@/components/sections/shop/ShopResultSection";

export default async function Shop() {
  // import clientPromise from "@/lib/mongodb";
  // const client = await clientPromise;
  // const db = client.db("npjb");
  // const users = await db.collection("users").find({}).toArray();

  return (
    <main className="min-h-screen flex flex-row flex-wrap justify-between gap-7 content-start items-start pt-[164px] md:pt-[7.5rem] pb-20 px-4 md:px-14 bg-black">
      {/* breadcrumbs */}
      <div className="w-full h-max pt-5">
        <BreadcrumbsSection />
      </div>

      {/* filter side */}
      <div className="">
        <FilterSection />
      </div>

      {/* products' side */}
      <div className="grow">
        <ShopResultSection />
      </div>
    </main>
  );
}
