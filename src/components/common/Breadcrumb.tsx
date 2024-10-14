import Link from "next/link";

import { TBreadcrumb } from "../componentTypes";

export const Breadcrumb: React.FC<TBreadcrumb> = ({ crumbs, ...props }) => {
  return (
    <nav className="flex w-full" aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center gap-3 space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;

          return (
            <li className="flex items-center" key={`${c.name}_${i}`}>
              {!current ? (
                <Link
                  href={c.href}
                  className="w-full flex items-center text-sm text-white/90 capitalize duration-300 font-bold hover:text-white/60"
                  aria-current={undefined}
                >
                  {c.svg && (
                    <span className="mr-1 h-4 w-4 flex-shrink-0 *:h-3 *:w-3 flex justify-center items-center">
                      {c.svg}
                    </span>
                  )}
                  {c.name}
                </Link>
              ) : (
                <div
                  className="w-auto h-auto flex items-center text-sm text-white/90 capitalize duration-300 font-medium"
                  aria-current="page"
                >
                  {c.svg && (
                    <span className="mr-1 h-4 w-4 flex-shrink-0 *:h-3 *:w-3 flex justify-center items-center">
                      {c.svg}
                    </span>
                  )}
                  {c.name}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
