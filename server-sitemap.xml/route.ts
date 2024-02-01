// app/server-sitemap-index.xml/route.ts
import { getServerSideSitemap } from "next-sitemap";
import { supabaseAdmin } from "../lib/supabaseAdminClient";

export async function GET(request: Request) {
  // Method to source blog urls from supabase
  const {data, error} = await supabaseAdmin.from("blogs").select("slug, updated_at");

  console.log(error)

  const fields = data?.map((item) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/blog/${item.slug}`,
    lastmod: item.updated_at,
    priority: 0.7,
  }))

  if (fields) {
    return getServerSideSitemap(fields);
  }
}