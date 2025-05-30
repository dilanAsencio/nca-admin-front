"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

export default function BreadcumbComponent() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Construye los items del breadcrumb
  const breadcrumbs: BreadcrumbItem[] = segments.map((seg, idx) => ({
    label: capitalize(seg),
    href: "/" + segments.slice(0, idx + 1).join("/"),
  }));
  console.log("breadcrumbs", breadcrumbs);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm m-0 text-gray-500">
        <li>
          <Link href="/" className="no-underline text-gray-700 font-medium text-[0.75rem]">
            Dashboard
          </Link>
        </li>
        {breadcrumbs.length === 0
          ? // Si quieres mostrar "Dashboard" en la raíz, descomenta la siguiente línea:
            // <li><span className="mx-2">/</span><span className="text-gray-700 font-semibold">Dashboard</span></li>
            null
          : breadcrumbs.map((item, idx) => (
              <li key={item.href} className="flex items-center">
                <span className="mx-2">/</span>
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-gray-700 font-semibold">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="no-underline text-gray-700 font-medium text-[0.75rem]">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
      </ol>
    </nav>
  );
}
