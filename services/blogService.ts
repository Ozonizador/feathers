import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../models/blog";
import { UserTypes } from "../models/profile";

export const getBlogs = async (category: UserTypes, limit: number) => {
  const { data, error } = await supabaseClient
    .from<Blog>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.CATEGORY, category)
    .range(0, limit);
  return { data, error };
};

export const getBlogInfoBySlug = async (blogId: string) => {
  const { data, error } = await supabaseClient
    .from<Blog>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.ID, blogId)
    .single();
  return { data, error };
};
