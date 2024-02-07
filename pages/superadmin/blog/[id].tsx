import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useForm, FormProvider } from "react-hook-form";
import BlogFormContainer, { BlogAdminForm } from "../../../components/superadmin/BlogFormContainer";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../../models/blog";
import { SUPERADMIN_BLOGS_URL } from "../../../models/paths";
import { trpc } from "../../../utils/trpc";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast } from "react-toastify";
import { er } from "@fullcalendar/core/internal-common";
import Sidebar from "../../../components/notus/Sidebar/Sidebar";

type BlogIdPageProps = {
  blog: Blog;
};

const BlogIdPage = ({ blog }: BlogIdPageProps) => {
  const updateBlog = trpc.blogs.updateBlogPost.useMutation();

  const methods = useForm<BlogAdminForm>({
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      category: blog.category || "LANDLORD",
    },
  });

  const updateFaqForm = async (data: any) => {
    const { data: dataUpdate, error } = await updateBlog.mutateAsync({ blog: { ...data }, blogId: blog.id });

    if (error) {
      toast.error("Erro ao dar Update " + error.code);
      console.log(error);
    }

    if (!error) {
      toast.success("Blog post guardado!");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 px-5">
        <FormProvider {...methods}>
          <BlogFormContainer onSubmit={updateFaqForm}>
            <div className="rounded-full border border-primary-500 p-2 text-primary-500">Guardar</div>
          </BlogFormContainer>
        </FormProvider>
      </div>
    </>
  );
};

export default BlogIdPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  const blogId = ctx.params?.id;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !blogId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
        locale: locale,
      },
    };

  const { data } = await supabase.from<"blogs", BlogsResponse>(BLOG_TABLE_NAME).select().eq("id", blogId).single();

  if (!data) return { redirect: { destination: SUPERADMIN_BLOGS_URL, permanent: false } };

  return {
    props: {
      initialSession: session,
      user: session.user,
      blog: data,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
