import { supabaseClient, User } from "@supabase/auth-helpers-nextjs";
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

export const getSimilarBlogPosts = async (category: UserTypes, slug: string) => {
  const { data, error } = await supabaseClient
    .from<Blog>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.CATEGORY, category)
    .neq(BLOG_PROPERTIES.SLUG, slug)
    .range(0, 3);
  return { data, error };
};
