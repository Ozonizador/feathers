import { SupabaseClient } from "@supabase/supabase-js";
import { BlogsResponse, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../models/blog";
import { UserTypes } from "../models/profile";

export const getBlogs = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  category: UserTypes,
  limit: number
) => {
  const { data, error } = await supabaseClient
    .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.CATEGORY, category)
    .range(0, limit);
  return { data, error };
};

export const getBlogInfoBySlug = async (supabaseClient: SupabaseClient<any, "public", any>, blogId: string) => {
  const { data, error } = await supabaseClient.from(BLOG_TABLE_NAME).select().eq(BLOG_PROPERTIES.ID, blogId).single();
  return { data, error };
};

export const getSimilarBlogPosts = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  category: UserTypes,
  slug: string
) => {
  const { data, error } = await supabaseClient
    .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.CATEGORY, category)
    .neq(BLOG_PROPERTIES.SLUG, slug)
    .range(0, 3);
  return { data, error };
};
