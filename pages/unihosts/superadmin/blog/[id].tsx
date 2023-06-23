import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useForm, FormProvider } from "react-hook-form";
import BlogFormContainer, { BlogAdminForm } from "../../../../components/superadmin/BlogFormContainer";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../../../models/blog";
import { SUPERADMIN_BLOGS_URL } from "../../../../models/paths";
import { trpc } from "../../../../utils/trpc";

type BlogIdPageProps = {
  blog: Blog;
};

const BlogIdPage = ({ blog }: BlogIdPageProps) => {
  const updateFaq = trpc.blogs.updateBlogPost.useMutation();

  const methods = useForm<BlogAdminForm>({
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      category: blog.category || "LANDLORD",
    },
  });

  const updateFaqForm = async (data: any) => {
    await updateFaq.mutateAsync({ blog: { ...data }, blogId: blog.id });
  };

  return (
    <div className="px-5">
      <FormProvider {...methods}>
        <BlogFormContainer onSubmit={updateFaqForm}>
          <div className="rounded-full border border-primary-500 p-2 text-primary-500">Guardar</div>
        </BlogFormContainer>
      </FormProvider>
    </div>
  );
};

export default BlogIdPage;

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

  if (!data) return { redirect: { destination: SUPERADMIN_BLOGS_URL, permanent: false } };

  return {
    props: {
      initialSession: session,
      user: session.user,
      blog: data,
    },
  };
};
