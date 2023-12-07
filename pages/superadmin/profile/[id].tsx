import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { FormProvider, useForm } from "react-hook-form";
import FaqFormContainer, { FaqAdminForm } from "../../../components/superadmin/FaqFormContainer";
import { Faq, Faqs, FAQS_TABLE_NAME } from "../../../models/faq";
import { SUPERADMIN_FAQS_URL, SUPERADMIN_PROFILES_URL } from "../../../models/paths";
import { trpc } from "../../../utils/trpc";
import { PROFILE_TABLE_NAME, Profile, ProfilesResponse } from "../../../models/profile";
import { profile } from "console";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type FaqIdPageProps = {
  faq: Faq;
};

const FaqIdPage = ({ faq }: FaqIdPageProps) => {
  const updateFaq = trpc.faqs.editFaq.useMutation();

  return (
    <div className="px-5">
      
    </div>
  );
};

export default FaqIdPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const profileId = ctx.params?.id;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !profileId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
        locale: locale
      },
    };

  const { data } = await supabase.from<"profiles", Profile>(PROFILE_TABLE_NAME).select().eq("id", profileId).single();
  if (!data) return { redirect: { destination: SUPERADMIN_PROFILES_URL, permanent: false } };

  return {
    props: {
      initialSession: session,
      user: session.user,
      faq: data ? data : [],
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
