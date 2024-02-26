import { GetServerSidePropsContext } from "next";
import React from "react";
import UltimosArtigos from "../../components/dicas consumo/UltimosArtigos/UltimosArtigos";
import BlogPostSection from "../../components/dicas consumo/BlogPostSection/BlogPostSection";
import { Blog, BLOG_PROPERTIES, BLOG_TABLE_NAME } from "../../models/blog";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Helmet } from "react-helmet";

interface BlogPostProps {
  blog: Blog;
}

const BlogPost = ({ blog }: BlogPostProps) => {
  return (
    <>
      <Helmet>
        <meta property="og:title" key="og:title" content={blog.title} />
        <meta property="og:description" key="og:description" content={blog.description} />
        <meta property="og:image" key="og:image" content={blog.image} />
        <meta property="og:type" content="website" />
      </Helmet>
      <BlogPostSection blog={blog} />
      <UltimosArtigos slug={blog.slug} category={blog.category} />
    </>
  );
};

export default BlogPost;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.params?.slug;
  const locale = ctx.locale;

  /* Not Found */
  if (!slug) {
    return {
      notFound: true,
    };
  }

  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: blog, error } = await supabase
    .from(BLOG_TABLE_NAME)
    .select()
    .eq(BLOG_PROPERTIES.SLUG, slug)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch the advertisement: ${slug}`, error.message);
  }

  if (blog) {
    return {
      props: { blog, user: session?.user, ...(await serverSideTranslations(locale ?? "pt")) },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
