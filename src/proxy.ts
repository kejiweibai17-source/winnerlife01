import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Forwards the request pathname via a header so the root layout (Server
 * Component) can render the correct `<html lang>` on the very first
 * server-rendered response for both zh (/) and jp (/jp/*) routes — search
 * engines and AI crawlers should never see a mismatched lang attribute.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
