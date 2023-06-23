import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { FormProvider, useForm } from "react-hook-form";
import { TfiPlus } from "react-icons/tfi";
import FaqFormContainer, { FaqAdminForm } from "../../../../components/superadmin/FaqFormContainer";
import { Faq, Faqs, FAQS_TABLE_NAME } from "../../../../models/faq";
import { trpc } from "../../../../utils/trpc";

type FaqIdPageProps = {
  faq: Faq;
};

const FaqIdPage = ({ faq }: FaqIdPageProps) => {
  const updateFaq = trpc.faqs.editFaq.useMutation();

  const methods = useForm<FaqAdminForm>({
    defaultValues: { answer: faq?.answer || "", question: faq?.question || "", type: faq?.type || "LANDLORD" },
  });

  const updateFaqForm = async (data: any) => {
    await updateFaq.mutateAsync({ faq: { ...data }, faqId: faq.id });
  };
  return (
    <div className="px-5">
      <FormProvider {...methods}>
        <FaqFormContainer onSubmit={updateFaqForm}>
          <div className="rounded-full border border-primary-500 p-2 text-primary-500">Guardar</div>
        </FaqFormContainer>
      </FormProvider>
    </div>
  );
};

export default FaqIdPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const faqId = ctx.params?.id;
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

  const { data } = await supabase.from<"faqs", Faqs>(FAQS_TABLE_NAME).select().eq("id", faqId).single();
  if (!data) return { redirect: { destination: "/unihosts/superadmin/blogs", permanent: false } };

  return {
    props: {
      initialSession: session,
      user: session.user,
      faq: data ? data : [],
    },
  };
};
