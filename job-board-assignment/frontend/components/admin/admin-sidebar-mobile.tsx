"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { adminLinks } from "./admin-links";

export default function AdminSidebarMobile({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-4">
        <nav className="mt-6 flex flex-col gap-2">
          {adminLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
