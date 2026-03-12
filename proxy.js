import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/admindashboard", "/my-bookings", "/booking"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admindashboard/:path*",
    "/my-bookings/:path*",
    "/booking/:path*",
    "/services/:path*",
  ],
};
