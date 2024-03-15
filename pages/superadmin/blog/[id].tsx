import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useForm, FormProvider } from "react-hook-form";
import BlogFormContainer, { BlogAdminForm } from "../../../components/superadmin/BlogFormContainer";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../../models/blog";
import { SUPERADMIN_BLOGS_URL } from "../../../models/paths";
import { trpc } from "../../../utils/trpc";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Sidebar from "../../../components/notus/Sidebar/Sidebar";
import { supabaseAdmin } from "../../../lib/supabaseAdminClient";
import { toast } from "react-toastify";
import { supabase } from "../../../lib/supabaseClient";

type BlogIdPageProps = {
  blog: Blog;
};

const BlogIdPage = ({ blog }: BlogIdPageProps) => {
  const updateBlog = trpc.blogs.updateBlogPost.useMutation();

  const uploadImage = async (image: any) => {
    // Check if the file already exists in Supabase storage
    const fileExists = await checkFileExists(image.name);

    // If the file already exists, generate a new unique name
    const newFileName = fileExists ? generateUniqueFileName(image.name) : image.name;

    // Create a new File object with the modified name
    const renamedImage = new File([image], newFileName, { type: image.type });

    try {
      const { data, error } = await supabaseAdmin.storage.from("blogs").upload(`public/${newFileName}`, renamedImage);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      const fullUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${data.path}`;
      return fullUrl;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
    }
  };

  const checkFileExists = async (fileName: string) => {
    const { data, error } = await supabaseAdmin.storage.from("blogs").list(`public/`);

    if (error) {
      console.error("Error checking file existence:", error.message);
      return false;
    }

    const fileExists = data.some((file) => file.name === `${fileName}`);

    return fileExists;
  };

  const generateUniqueFileName = (fileName: any) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = fileName.split(".").pop();
    return `${randomString}_${timestamp}.${extension}`;
  };

  const methods = useForm<BlogAdminForm>({
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      category: blog.category || "LANDLORD",
    },
  });

  const updateFaqForm = async (data: any) => {
    const image = await uploadImage(data.image[0]);
    data.image = image;

    console.log(data);
    const { data: dataUpdate, error } = await updateBlog.mutateAsync({ blog: { ...data }, blogId: blog.id });

    console.log(dataUpdate);

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
