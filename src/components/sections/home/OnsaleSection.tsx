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
    <section className="w-full flex flex-col justify-center items-center bg-black text-white py-10 md:py-28">
      <h2 className="uppercase text-lg md:text-6xl font-bold mb-3.5">
        now on sale
      </h2>
      <div className="uppercase text-md md:text-2xl mb-7">up to 50% off</div>

      <ul className="w-full flex flex-col md:flex-row flex-nowrap gap-4 justify-center items-center px-5">
        {items.map((item, idx) => (
          <li className="w-full sm:w-1/2 md:w-1/3" key={`${item.name}_${idx}`}>
            <ProductOnSale
              name={item.name}
              price={item.price}
              discount={item.discount}
              image={item.images[0]}
              currency={item.currency}
              _id={item._id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
