import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog, BLOG_TABLE_NAME } from "../models/blog";

export const getBlogs = async () => {
  const { data, error } = await supabaseClient.from<Blog>(BLOG_TABLE_NAME).select();
  return { data, error };
};
