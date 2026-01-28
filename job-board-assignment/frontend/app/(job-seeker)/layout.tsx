import type { Metadata } from "next";
import NavbarServer from "@/components/navbar/navbar.server";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Job Board for Job Seekers",
};

export default async function JobSeekerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <NavbarServer />
      {children}
      <Footer />
    </>
  );
}
