import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Faq } from "../../models/faq";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../models/profile";
import { trpc } from "../../utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/utils/Button";
import Link from "next/link";
import FaqFormContainer, { FaqAdminForm } from "../../components/superadmin/FaqFormContainer";
import { TfiPlus } from "react-icons/tfi";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Sidebar from "../../components/notus/Sidebar/Sidebar";

const FaqSuperAdminPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<"TENANT" | "LANDLORD">("LANDLORD");
  const { data, refetch } = trpc.faqs.getFaqs.useQuery();
  const { t } = useTranslation();

  const addFaq = trpc.faqs.addFaq.useMutation();
  const removeFaq = trpc.faqs.removeFaq.useMutation();

  const tenantFaqs = data && data.data && data.data.filter((faq) => faq.type === "TENANT");
  const landlordFaqs = data && data.data && data.data.filter((faq) => faq.type === "LANDLORD");

  const methods = useForm<FaqAdminForm>({
    defaultValues: { answer: "", question: "", type: "LANDLORD" },
  });

  const addFormSubmit = async (data: any) => {
    await addFaq.mutateAsync({ ...data });
    refetch();
    methods.reset();
  };

  const removerFaq = async (faqId: string) => {
    await removeFaq.mutateAsync({ faqId });
    refetch();
  };

  return (
    <>
      <Sidebar/>
      <div className="ml-64 flex flex-col px-10 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <div
            onClick={() => setSelectedFaq("TENANT")}
            className={classNames({ "text-primary-500": selectedFaq === "TENANT" })}
          >
            {t("common:student_one")}
          </div>
          <div
            onClick={() => setSelectedFaq("LANDLORD")}
            className={classNames({ "text-primary-500": selectedFaq === "LANDLORD" })}
          >
            {t("common:landlord_one")}
          </div>
        </div>
        <div className="flex flex-col">
          {selectedFaq === "LANDLORD" &&
            (landlordFaqs ? (
              landlordFaqs.map((faq) => <SuperAdminFaqItem removerFaq={removerFaq} key={faq.id} {...faq} />)
            ) : (
              <p>Não tem faqs.</p>
            ))}
          {selectedFaq === "TENANT" &&
            (tenantFaqs ? (
              tenantFaqs.map((faq) => <SuperAdminFaqItem removerFaq={removerFaq} key={faq.id} {...faq} />)
            ) : (
              <p>Não tem faqs.</p>
            ))}
        </div>
        <div className="mt-5 text-2xl">Adicionar Faq:</div>
        <FormProvider {...methods}>
          <FaqFormContainer onSubmit={addFormSubmit}>
            <div className="rounded-full border border-primary-500 p-2">
              <TfiPlus size={32} className="text-primary-500" />
            </div>
          </FaqFormContainer>
        </FormProvider>
      </div>
    </>
  );
};

/**
 * Super Admin Faq Items
 */

type SuperAdminFaqItemProps = Pick<Faq, "answer" | "question" | "id"> & {
  removerFaq: (id: string) => void;
};

const SuperAdminFaqItem = ({ answer, question, id, removerFaq }: SuperAdminFaqItemProps) => {
  return (
    <div className="flex w-full border-b border-t border-neutral-100">
      <div className="flex flex-col gap-1 py-5">
        <h6 className="text-xl font-black">{question}</h6>
        <p>
          {answer.substring(0, 150)}
          {answer.length > 150 ? "..." : ""}
        </p>
      </div>
      <div className="my-auto ml-auto flex h-10 gap-3">
        <div className="cursor-pointer rounded-xl border border-primary-500 p-2 px-4 text-primary-500">
          <Link href={`/superadmin/faq/${id}`}>Edit</Link>
        </div>

        <Button type={"button"} onClick={() => removerFaq(id)}>
          Remover
        </Button>
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
        destination: "/faqs",
        permanent: false,
        locale: locale,
      },
    };

  const user = session.user;
  const { data, error } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  if (error || !data || data.user_type !== "ADMIN")
    return {
      redirect: {
        destination: "/faqs",
        permanent: false,
        locale: locale,
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
