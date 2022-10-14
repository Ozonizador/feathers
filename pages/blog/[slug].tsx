import { GetStaticPropsContext, GetServerSidePropsResult } from "next";
import React from "react";
import UltimosArtigos from "../../components/dicas consumo/UltimosArtigos/UltimosArtigos";
import BlogPostSection from "../../components/dicas consumo/BlogPostSection/BlogPostSection";
import { Blog, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../../models/blog";

type PageParams = {
  slug: string;
};
interface BlogPostProps {
  blog: Blog;
}

const BlogPost = ({ blog }: BlogPostProps) => {
  return (
    <>
      <BlogPostSection blog={blog} />
      <UltimosArtigos slug={blog.slug} category={blog.category} />
    </>
  );
};

export const getServerSideProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<GetServerSidePropsResult<BlogPostProps>> => {
  const slug = params?.slug;

  /* Not Found */
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const { data: blog, error } = await supabaseClient
    .from<Blog>(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.SLUG, slug)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch the advertisement: ${slug}`, error.message);
  }

  if (blog) {
    return {
      props: { blog },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
export default BlogPost;
