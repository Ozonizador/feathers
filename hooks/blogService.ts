import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BlogsResponse, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../models/blog";
import { UserTypes } from "../models/profile";

const useBlogService = () => {
  const supabaseClient = useSupabaseClient();

  const getBlogs = async (category: UserTypes, limit: number) => {
    const { data, error } = await supabaseClient
      .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
      .select()
      .eq(BLOG_PROPERTIES.CATEGORY, category)
      .range(0, limit);
    return { data, error };
  };

  const getBlogInfoBySlug = async (blogId: string) => {
    const { data, error } = await supabaseClient.from(BLOG_TABLE_NAME).select().eq(BLOG_PROPERTIES.ID, blogId).single();
    return { data, error };
  };

  const getSimilarBlogPosts = async (category: UserTypes, slug: string) => {
    const { data, error } = await supabaseClient
      .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
      .select()
      .eq(BLOG_PROPERTIES.CATEGORY, category)
      .neq(BLOG_PROPERTIES.SLUG, slug)
      .range(0, 3);
    return { data, error };
  };

  const addToMailingList = async (email: string) => {
    const { data, error } = await supabaseClient.from("mailing_list").insert({ email });

    return { data, error };
  };

  return { getBlogs, getBlogInfoBySlug, getSimilarBlogPosts, addToMailingList };
};

export default useBlogService;
