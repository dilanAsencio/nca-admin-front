"use client";

import { useUI } from "@/providers/ui-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcumbComponentProps {
  items?: BreadcrumbItem[];
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

export default function BreadcumbComponent({items}: BreadcumbComponentProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const { toggleModule } = useUI();

  // Construye los items del breadcrumb
  const breadcrumbs: BreadcrumbItem[] = items
  ? items
  : segments.map((seg, idx) => ({
    label: capitalize(seg),
    href: "/" + segments.slice(0, idx + 1).join("/"),
  }));
  console.log("Breadcrumbs:", breadcrumbs);
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm m-0 text-gray-700">
        {/* <li>
          <Link href="/" className="font-medium text-[0.75rem]" onClick={() => toggleModule("dashboard")} style={{ textDecoration: "none", color: "#515151" }}>
            Dashboard
          </Link>
        </li> */}
        {breadcrumbs.length === 0
          ? null
          : breadcrumbs.map((item, idx) => (
              <li key={item.href ?? idx} className="flex items-center">
                {item.href ? (
                  <Link href={item.href} className="font-medium text-[0.75rem] m-0" style={{ textDecoration: "none", color: "#515151" }}>
                    {capitalize(item.label)}
                  </Link>
                ) : (
                  <span className="text-gray-400 font-semibold m-0">
                    {capitalize(item.label)}
                  </span>
                )}
                { breadcrumbs.length - 1 !== idx && <span className="mx-1">/</span>}
              </li>
            ))}
      </ol>
    </nav>
  );
}
