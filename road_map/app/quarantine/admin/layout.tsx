import { AdminLayout } from "@/src/_quarantine/admin/layout/AdminLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
