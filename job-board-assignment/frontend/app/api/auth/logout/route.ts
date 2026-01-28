import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // remove token cookie
  res.cookies.set({
    name: "access_token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return res;
}
