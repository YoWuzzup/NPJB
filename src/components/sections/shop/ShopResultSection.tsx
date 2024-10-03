import { ProductInShop } from "@/components/common/ProductInShop";

// TODO: fetch items
const items = [
  {
    name: "backpack",
    price: 140,
    discount: 50,
    image: "/removeLater/backpack.webp",
    currency: "zl",
    _id: "1",
    reviews: [{ rating: 4 }, { rating: 5 }, { rating: 5 }],
    date: "2024-10-1",
  },
  {
    name: "backpack",
    price: 140,
    discount: 10,
    image: "/removeLater/backpack.webp",
    currency: "zl",
    _id: "2",
    reviews: [{ rating: 4 }],
    date: "2023-04-16",
  },
  {
    name: "backpack",
    price: 140,
    discount: 0,
    image: "/removeLater/backpack.webp",
    currency: "zl",
    _id: "3",
    reviews: [{ rating: 4 }],
    date: "2023-04-16",
  },
  {
    name: "backpack",
    price: 140,
    discount: 0,
    image: "/removeLater/backpack.webp",
    currency: "zl",
    _id: "4",
    reviews: [{ rating: 4 }],
    date: "2023-04-16",
  },
  {
    name: "backpack",
    price: 140,
    discount: 0,
    image: "/removeLater/backpack.webp",
    currency: "zl",
    _id: "5",
    reviews: [{ rating: 4 }],
    date: "2023-04-16",
  },
];

export const ShopResultSection: React.FC = () => {
  return (
    <section className="w-full flex flex-row md:flex-col gap-5">
      <h3 className="capitalize text-white text-xl md:text-6xl font-bold py-4">
        all products
      </h3>

      {/* list of all fetched products */}
      <div className="w-full grid grid-cols-3 gap-7">
        {items.map((p, indx) => {
          // TODO: rewrite key
          return <ProductInShop {...p} key={indx} />;
        })}
      </div>
    </section>
  );
};
