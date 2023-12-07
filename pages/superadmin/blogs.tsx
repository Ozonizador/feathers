import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../models/profile";
import { trpc } from "../../utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { TfiPlus } from "react-icons/tfi";
import BlogFormContainer, { BlogAdminForm } from "../../components/superadmin/BlogFormContainer";
import { Blog } from "../../models/blog";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const FaqSuperAdminPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<"TENANT" | "LANDLORD">("LANDLORD");
  const { data, refetch } = trpc.blogs.getBlogs.useQuery();
  const { t } = useTranslation();

  const addBlog = trpc.blogs.addBlogPost.useMutation();

  const tenantBlogs = data && data.data && data.data.filter((faq) => faq.category === "TENANT");
  const landlordBlogs = data && data.data && data.data.filter((faq) => faq.category === "LANDLORD");

  const methods = useForm();

  const { reset } = useForm<BlogAdminForm>({
    defaultValues: { title: "", description: "", category: "LANDLORD" },
  });

  const addFormSubmit = async (data: any) => {
    await addBlog.mutateAsync(
      { ...data },
      {
        onSuccess: () => {
          toast.info("Sucesso");
        },
      }
    );
    refetch();
    reset();
  };

  return (
    <div className="max-width flex flex-col px-10 pt-5">
      <div className="mb-3 flex items-center gap-2">
        <div
          onClick={() => setSelectedFaq("TENANT")}
          className={classNames({ "text-primary-500": selectedFaq === "TENANT" })}
        >
          Estudante
        </div>
        <div
          onClick={() => setSelectedFaq("LANDLORD")}
          className={classNames({ "text-primary-500": selectedFaq === "LANDLORD" })}
        >
          Senhorio
        </div>
      </div>
      <div className="flex flex-col">
        {selectedFaq === "LANDLORD" &&
          (landlordBlogs ? (
            landlordBlogs.map((blog) => <SuperAdminBlogItem key={blog.id} {...blog} />)
          ) : (
            <p>Não tem faqs.</p>
          ))}
        {selectedFaq === "TENANT" &&
          (tenantBlogs ? (
            tenantBlogs.map((blog) => <SuperAdminBlogItem key={blog.id} {...blog} />)
          ) : (
            <p>Não tem faqs.</p>
          ))}
      </div>
      <div className="my-5 text-primary-500">Adicionar Blog Post</div>
      <FormProvider {...methods}>
        <BlogFormContainer onSubmit={addFormSubmit}>
          <div className="rounded-full border border-primary-500 p-2">
            <TfiPlus size={32} className="text-primary-500" />
          </div>
        </BlogFormContainer>
      </FormProvider>
    </div>
  );
};

/**
 * Super Admin Faq Items
 */

type SuperAdminBlogItemProps = Pick<Blog, "title" | "description" | "id">;

const SuperAdminBlogItem = ({ title, description, id }: SuperAdminBlogItemProps) => {
  return (
    <div className="flex w-full border-b border-t border-neutral-100">
      <div className="flex flex-col gap-1 py-5">
        <div className="mb-5 flex gap-3">
          <h6 className="text-xl font-black">{title}</h6>
          <div className="my-auto ml-auto flex h-10 cursor-pointer gap-3 rounded-xl border border-primary-500 p-2 px-4 text-primary-500">
            <Link href={`/superadmin/blog/${id}`}>Edit</Link>
          </div>
        </div>
        <p className="line-clamp-5">{description}</p>
      </div>
    </div>
  );
};

export default FaqSuperAdminPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
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
        locale: locale
      },
    };

  const user = session.user;
  const { data, error } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("*")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  if (error || !data || data.user_type !== "ADMIN")
    return {
      redirect: {
        destination: "/blog",
        permanent: false,
        locale: locale
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
