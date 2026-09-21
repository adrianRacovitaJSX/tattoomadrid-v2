import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { auth } from "@/lib/panel/auth";

export const config = {
  matcher: [
    "/automations/:path*",
    "/api/automations/:path*",
    "/panel/:path*",
  ],
};

/** /automations: Basic Auth (panel técnico). No depende de NextAuth. */
function automationsBasicAuth(req: NextRequest) {
  const user = process.env.AUTOMATIONS_USERNAME;
  const pass = process.env.AUTOMATIONS_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Automations not configured", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Automations"' },
    });
  }

  const [u, p] = atob(header.slice(6)).split(":");
  if (u !== user || p !== pass) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Automations"' },
    });
  }

  return NextResponse.next();
}

/** /panel: sesión NextAuth (panel del cliente). */
const panelAuth = auth((req) => {
  // Solo cuenta como sesión un usuario real: si falta el secreto, Auth.js
  // devuelve un objeto de error que no debe abrir el panel.
  const isLoggedIn = Boolean(req.auth?.user);

  if (req.nextUrl.pathname === "/panel/login") {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/panel", req.url))
      : NextResponse.next();
  }

  return isLoggedIn
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/panel/login", req.url));
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/automations") || pathname.startsWith("/api/automations")) {
    return automationsBasicAuth(req);
  }
  if (!process.env.AUTH_SECRET) {
    return new NextResponse("Panel not configured", { status: 503 });
  }
  // auth() como middleware acepta (req, ctx); el tipo exportado es genérico.
  return (panelAuth as unknown as (r: NextRequest, e: NextFetchEvent) => ReturnType<typeof NextResponse.next>)(req, event);
}
