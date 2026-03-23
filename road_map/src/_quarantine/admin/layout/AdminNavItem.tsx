"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export function AdminNavItem({ href, label }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-md text-sm font-medium
        ${
          active
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50"
        }`}
    >
      {label}
    </Link>
  );
}
