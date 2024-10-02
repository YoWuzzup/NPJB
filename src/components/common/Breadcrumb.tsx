import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

type TBreadcrumb = {
  crumbs: {
    name: string;
    href: string;
    svg?: ReactNode;
  }[];
} & HTMLAttributes<HTMLDivElement>;

export const Breadcrumb: React.FC<TBreadcrumb> = ({ crumbs, ...props }) => {
  return (
    <nav className="flex w-full" aria-label="Breadcrumb" {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;

          return !current ? (
            <li className="flex items-center" key={`${c.name}_${i}`}>
              <Link
                href={c.href}
                className={`flex items-center text-sm  text-white/90 capitalize 
                duration-300 font-bold hover:text-white/60`}
                aria-current={undefined}
              >
                {c.svg}
                {c.name}
              </Link>
            </li>
          ) : (
            <li className="flex items-center" key={`${c.name}_${i}`}>
              <div
                className={`flex items-center text-sm text-white/90 capitalize 
                duration-300 font-medium`}
                aria-current="page"
              >
                {c.svg}
                {c.name}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
