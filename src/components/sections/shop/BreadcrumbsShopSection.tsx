import { Breadcrumb } from "@/components/common/Breadcrumb";

import { breadcrumbIcon } from "../../../../public/static/breadcrumbIcon";

export const BreadcrumbsShopSection: React.FC = () => {
  return (
    <>
      <Breadcrumb
        crumbs={[
          {
            name: "home",
            href: "/",
          },
          {
            name: "all products",
            href: "/shop",
            svg: breadcrumbIcon,
          },
        ]}
      />
    </>
  );
};
