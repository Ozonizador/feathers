import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { supabaseAdmin } from "../../../lib/supabaseAdminClient";
import { Faq } from "../../../models/faq";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../../models/profile";
import { trpc } from "../../../utils/trpc";

const FaqSuperAdminPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<"TENANT" | "LANDLORD">("LANDLORD");
  const { data } = trpc.faqs.getFaqs.useQuery();

  const tenantFaqs = data && data.data && data.data.filter((faq) => faq.type === "TENANT");
  const landlordFaqs = data && data.data && data.data.filter((faq) => faq.type === "LANDLORD");
  return (
    <div className="max-width flex flex-col pt-5">
      <div className="flex gap-2">
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
        <div className="flex flex-col gap-2">
          {selectedFaq === "LANDLORD" && landlordFaqs?.map((faq) => <SuperAdminFaqItem key={faq.id} {...faq} />)}
          {selectedFaq === "TENANT" && tenantFaqs?.map((faq) => <SuperAdminFaqItem key={faq.id} {...faq} />)}
        </div>
      </div>
    </div>
  );
};

type SuperAdminFaqItemProps = Pick<Faq, "answer" | "question">;

const SuperAdminFaqItem = ({ answer, question }: SuperAdminFaqItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h6>{question}</h6>
      <p>{answer}</p>
    </div>
  );
};

export default FaqSuperAdminPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
