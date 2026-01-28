import { cookies } from "next/headers";
import Navbar from "./navbar";

export default async function NavbarServer() {
  const ck = await cookies();
  const token = ck.get("access_token")?.value;

  return <Navbar isAuthenticated={!!token} />;
}
