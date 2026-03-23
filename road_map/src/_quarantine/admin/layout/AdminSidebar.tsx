import { AdminNavItem } from "./AdminNavItem";

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="h-16 flex items-center px-6 font-bold text-lg">
        Admin CMS
      </div>

      <nav className="px-4 space-y-1">
        <AdminNavItem href="/admin" label="Dashboard" />
        <AdminNavItem href="/admin/content" label="Content" />
      </nav>
    </aside>
  );
}
