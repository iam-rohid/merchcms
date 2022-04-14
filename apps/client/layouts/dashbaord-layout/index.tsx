import { useCallback } from "react";
import Container from "../../components/container";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";

const rootMenu = [
  {
    label: "Overview",
    href: "/dashboard",
  },
  {
    label: "Integrations",
    href: "/dashboard/integrations",
  },
  {
    label: "Activity",
    href: "/dashboard/activity",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const { asPath } = useRouter();

  const match = useCallback(
    (route: string, index: number) => {
      const paths = asPath.split("/");
      if (paths.length + 1 === index && route === "") return true;
      return paths[index] === route;
    },
    [asPath]
  );

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 -mt-2 h-12 w-full sticky top-0 left-0 right-0">
        <Container className="h-full flex items-center gap-6">
          <ul className="flex flex-row gap-4 h-full items-center">
            {rootMenu.map((item) => (
              <li className="h-full" key={item.href}>
                <Link href={item.href}>
                  <a
                    className={classNames(
                      "h-full flex items-center justify-center border-b",
                      {
                        "border-gray-900 text-gray-900": match(
                          item.href.split("/")[2],
                          2
                        ),
                      }
                    )}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
      {children}
    </>
  );
};

export default DashboardLayout;
