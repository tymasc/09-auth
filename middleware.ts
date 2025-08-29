import { NextResponse } from "next/server";
import { checkSession, refreshSession } from "./lib/api/serverApi";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = false;

  if (accessToken) {
    const session = await checkSession();
    isAuthenticated = session.status === 200 && session.data.isAuth;
  }

  if (!isAuthenticated && refreshToken) {
    const newTokens = await refreshSession(refreshToken);
    if (newTokens.status === 200 && newTokens.data.accessToken) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", newTokens.accessToken);
      response.cookies.set("refreshToken", newTokens.refreshToken);

      const sessionRes = await checkSession();
      if (sessionRes.status === 200 && sessionRes.data.isAuth) {
        return response;
      }
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
