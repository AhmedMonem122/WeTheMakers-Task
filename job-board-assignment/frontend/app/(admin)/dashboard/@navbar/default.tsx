"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            id="open-admin-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
        </div>
      </div>
    </header>
  );
}
