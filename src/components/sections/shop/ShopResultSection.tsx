import { useAppSelector } from "@/hooks/redux";

import { ProductInShop } from "@/components/common/ProductInShop";

export const ShopResultSection: React.FC = () => {
  const products = useAppSelector((st) => st.products);

  return (
    <section className="w-full flex flex-row flex-wrap md:flex-col justify-center gap-5">
      <h3 className="capitalize w-5/6 sm:w-full text-white text-xl md:text-6xl font-bold py-4">
        all products
      </h3>

      {/* list of all fetched products */}
      <div className="w-5/6 sm:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {products.map((p, indx) => {
          return <ProductInShop {...p} key={`${p.name}_${indx}`} />;
        })}
      </div>
    </section>
  );
};
