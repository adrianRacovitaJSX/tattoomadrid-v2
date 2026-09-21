import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/** Comparación en tiempo constante (edge-safe, sin node:crypto) */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 días — sesión persistente
  },
  pages: {
    signIn: "/panel/login",
  },
  providers: [
    Credentials({
      name: "Panel",
      credentials: {
        username: { label: "Usuario" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = process.env.PANEL_USERNAME;
        const pass = process.env.PANEL_PASSWORD;
        if (!user || !pass) return null;
        const u = String(credentials?.username ?? "");
        const p = String(credentials?.password ?? "");
        if (safeEqual(u, user) && safeEqual(p, pass)) {
          return { id: "estudio", name: "Saints & Sinners" };
        }
        return null;
      },
    }),
  ],
});
