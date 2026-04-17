import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const res = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/leads?select=id`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
        },
        cache: "no-store",
      }
    );
    const range = res.headers.get("content-range") || "";
    const total = Number(range.split("/")[1]) || 0;
    return NextResponse.json({ total });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "fetch_error" },
      { status: 500 }
    );
  }
}
