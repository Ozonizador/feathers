import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../../../models/blog";

type BlogIdPageProps = {
  blogPost: Blog;
};

const FaqIdPage = ({ blogPost }: BlogIdPageProps) => {
  return <></>;
};

export default FaqIdPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const blogId = ctx.params?.id;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const { data } = await supabase.from<"blogs", BlogsResponse>(BLOG_TABLE_NAME).select().eq("id", blogId).single();

  if (!data) return { redirect: { destination: "/unihosts/superadmin/blogs", permanent: false } };

  return {
    props: {
      initialSession: session,
      user: session.user,
      blogPost: data,
    },
  };
};
