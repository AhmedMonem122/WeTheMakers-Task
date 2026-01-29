"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { adminLinks } from "./admin-links";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:block sticky top-0 h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-18" : "w-64",
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-slate-900 text-[14px] md:text-lg font-bold tracking-tight">
            Admin Panel
          </span>
        )}

        <div className="flex justify-end p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((v) => !v)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
          </Button>
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {adminLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
