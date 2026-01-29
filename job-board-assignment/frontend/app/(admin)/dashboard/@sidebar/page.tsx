"use client";

import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminSidebarMobile from "@/components/admin/admin-sidebar-mobile";
import { useEffect, useState } from "react";

export default function SidebarSlot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    document
      .getElementById("open-admin-sidebar")
      ?.addEventListener("click", handler);

    return () =>
      document
        .getElementById("open-admin-sidebar")
        ?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <AdminSidebar />
      <AdminSidebarMobile open={open} onOpenChange={setOpen} />
    </>
  );
}
