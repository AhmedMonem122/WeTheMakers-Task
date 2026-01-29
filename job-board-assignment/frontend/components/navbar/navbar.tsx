"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  // ,X
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type NavbarProps = {
  isAuthenticated: boolean;
};

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-slate-900 text-lg">
              JobBoard
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated && (
              <>
                <Link
                  href="/jobs"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Jobs
                </Link>
                <Link
                  href="/my-applications"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Applications
                </Link>
              </>
            )}

            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-indigo-600 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600"
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="rounded-md border p-2">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-bold text-lg">Menu</span>
                  <SheetClose asChild>
                    {/* <button>
                      <X className="h-5 w-5" />
                    </button> */}
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-4">
                  {isAuthenticated && (
                    <>
                      <Link
                        href="/jobs"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-3 hover:bg-slate-100"
                      >
                        Jobs
                      </Link>
                      <Link
                        href="/my-applications"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-3 hover:bg-slate-100"
                      >
                        Applications
                      </Link>
                    </>
                  )}

                  {!isAuthenticated ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="rounded-lg border px-4 py-3 text-center"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-white"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="rounded-lg px-4 py-3 text-left text-red-600"
                    >
                      Logout
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
