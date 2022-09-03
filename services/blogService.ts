import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog, BlogCategory, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../models/blog";

export const getBlogs = async (category: BlogCategory) => {
  const { data, error } = await supabaseClient
    .from<Blog>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.CATEGORY, category);
  return { data, error };
};
