import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/automations/:path*", "/api/automations/:path*"],
};

export function middleware(req: NextRequest) {
  const user = process.env.AUTOMATIONS_USERNAME;
  const pass = process.env.AUTOMATIONS_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Automations not configured", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Automations"' },
    });
  }

  const [u, p] = atob(auth.slice(6)).split(":");
  if (u !== user || p !== pass) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Automations"' },
    });
  }

  return NextResponse.next();
}
