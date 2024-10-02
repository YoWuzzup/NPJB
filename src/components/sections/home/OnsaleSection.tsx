import { ProductOnSale } from "@/components/common/ProductOnSale";

const items = [
  {
    _id: "1",
    name: "items name",
    description:
      "LocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizer",
    price: 200,
    discount: 10,
    currency: "zl",
    images: ["./removeLater/Medkit.avif"],
  },
  {
    _id: "2",
    name: "items name",
    description:
      "LocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizer",
    price: 200,
    discount: 10,
    currency: "zl",
    images: ["./removeLater/Medkit.avif"],
  },
  {
    _id: "3",
    name: "items name",
    description:
      "LocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizerLocaleRouteNormalizer",
    price: 200,
    discount: 10,
    currency: "zl",
    images: ["./removeLater/Medkit.avif"],
  },
];

export const OnsaleSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-black text-white py-28">
      <h2 className="uppercase text-6xl font-bold mb-3.5">now on sale</h2>
      <div className="uppercase text-2xl mb-7">up to 50% off</div>

      <div className="w-8/12 flex flex-row flex-nowrap gap-4 justify-center items-center">
        {items.map((item, idx) => (
          <ProductOnSale
            key={`${item.name}_${idx}`}
            name={item.name}
            price={item.price}
            discount={item.discount}
            image={item.images[0]}
            currency={item.currency}
            _id={item._id}
          />
        ))}
      </div>
    </section>
  );
};
