import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // 보호된 경로: /dashboard
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return Response.redirect(new URL("/", req.url));
  }

  return undefined;
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
